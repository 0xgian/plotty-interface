import { getAPI } from "lib/getAPI";
import { useAuthStore } from "state/auth";
import { useMutation, useQueryClient } from "wagmi";

export const useUpdateLabel = () => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

  const { mutateAsync: report } = useMutation(
    async ({
      uid,
      nametag,
      queryKey,
    }: {
      uid: number;
      nametag: string;
      queryKey?: any[];
    }) => {
      if (token) {
        const res = await fetch(getAPI(`/api/user/nametag/public`), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            for_uid: uid,
            nametag,
          }),
        });

        if (res.status == 200 || res.status == 201) {
          return { queryKey, ...res.json() };
        }

        throw new Error("Can't update profile.");
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        data?.queryKey && queryClient.invalidateQueries(data.queryKey);
      },
    }
  );

  return { report };
};
