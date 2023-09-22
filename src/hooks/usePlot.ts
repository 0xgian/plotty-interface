import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useMutation, useQueryClient } from "wagmi";
import { dataURIToBlob } from "lib/selectFiles";

export const usePlot = () => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

  const { mutateAsync: plot } = useMutation(
    async ({
      content,
      plotId,
      images,
    }: {
      content: string;
      plotId?: string;
      images?: string[];
    }) => {
      if (token) {
        let formData = new FormData();
        formData.append("content", content);
        images?.forEach((image, i) => {
          const blob = dataURIToBlob(image);
          const ext = blob.type.split("/")[1];
          formData.append("media", blob, `${i}.${ext}`);
        });

        const res = await fetch(
          plotId ? getAPI(`/api/post/${plotId}/reply`) : getAPI(`/api/post`),
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (res.status == 201) {
          const json = await res.json();
          return json?.data?.pid;
        }

        throw new Error("Can't plot.");
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: () => {},
    }
  );

  const invalidatePlot = (plotId: string) => {
    queryClient.invalidateQueries(["plot", plotId, true]);
  };

  return { plot, invalidatePlot };
};
