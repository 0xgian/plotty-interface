import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useMutation, useQueryClient } from "wagmi";
import _ from "lodash";

export const useFeedback = () => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

  const { mutate: feedback } = useMutation(
    async ({
      plotId,
      feedback,
      pageIndex,
      queryKey,
    }: {
      plotId: string;
      feedback: "USEFUL" | "NOT_USEFUL" | "DELETE";
      pageIndex?: number;
      queryKey: any[];
    }) => {
      if (token) {
        const res =
          feedback === "DELETE"
            ? await fetch(getAPI(`/api/post/feedback/${plotId}`), {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            : await fetch(getAPI(`/api/post/feedback`), {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  plot_id: plotId,
                  feedback,
                }),
              });
        return typeof pageIndex === "number"
          ? { queryKey, pageIndex, ...res.json() }
          : { queryKey, ...res.json() };
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        if (typeof data?.pageIndex !== undefined) {
          queryClient.refetchQueries(data.queryKey, {
            refetchPage: (_, index) => index === data.pageIndex,
          });
        } else {
          queryClient.invalidateQueries(data.queryKey);
        }
      },
    }
  );

  const { mutate: replot } = useMutation(
    async ({
      plotId,
      isReplot,
      pageIndex,
      queryKey,
    }: {
      plotId: string;
      isReplot: boolean;
      pageIndex?: number;
      queryKey: any[];
    }) => {
      if (token) {
        const res = isReplot
          ? await fetch(getAPI(`/api/post/${plotId}/re-post`), {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await fetch(getAPI(`/api/post/${plotId}`), {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        return typeof pageIndex === "number"
          ? { queryKey, pageIndex, ...res.json() }
          : { queryKey, ...res.json() };
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        if (typeof data?.pageIndex !== undefined) {
          queryClient.refetchQueries(data.queryKey, {
            refetchPage: (_, index) => index === data.pageIndex,
          });
        } else {
          queryClient.invalidateQueries(data.queryKey);
        }
      },
    }
  );

  return { feedback, replot };
};
