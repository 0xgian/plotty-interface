import { getAPI } from "lib/getAPI";
import _ from "lodash";
import { useAuthStore } from "state/auth";
import { usePrivateLabels } from "state/privateLabels";
import { useMutation, useQueryClient } from "wagmi";

export const useUpdateLabel = () => {
  const { session, account } = useAuthStore();
  const { updateLabelByUid } = usePrivateLabels();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

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
        const res = !_.isEmpty(nametag)
          ? await fetch(getAPI(`/api/user/nametag/public`), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                for_uid: uid,
                nametag,
              }),
            })
          : await fetch(getAPI(`/api/user/nametag/public/${uid}`), {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        if (res.status == 200 || res.status == 201) {
          return { queryKey, ...res.json() };
        }

        throw new Error("Can't update labels.");
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        data?.queryKey && queryClient.invalidateQueries(data.queryKey);
      },
    }
  );

  const { mutateAsync: addPrivate } = useMutation(
    async ({ uid, nametag }: { uid: number; nametag: string }) => {
      if (token) {
        const res = !_.isEmpty(nametag)
          ? await fetch(getAPI(`/api/user/nametag/private`), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                for_uid: uid,
                nametag,
              }),
            })
          : await fetch(getAPI(`/api/user/nametag/private/${uid}`), {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

        if (res.status == 200 || res.status == 201) {
          return { uid, nametag, ...res.json() };
        }

        throw new Error("Can't update private labels.");
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        data?.uid && updateLabelByUid(data.uid, data?.nametag ?? "");
      },
    }
  );

  return { report, addPrivate };
};
