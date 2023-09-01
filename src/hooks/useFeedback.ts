import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useMutation, useQueryClient } from "wagmi";
import _ from "lodash";

export const useFeedback = (queryKey: any[]) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

  const { mutate: feedback } = useMutation(
    async ({
      plotId,
      feedback,
      pageIndex,
    }: {
      plotId: string;
      feedback: "USEFUL" | "NOT_USEFUL" | "DELETE";
      pageIndex?: number;
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
          ? { pageIndex, ...res.json() }
          : res.json();
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        if (typeof data?.pageIndex !== undefined) {
          queryClient.refetchQueries(queryKey, {
            refetchPage: (_, index) => index === data.pageIndex,
          });
        } else {
          queryClient.invalidateQueries(queryKey);
        }
      },
    }
  );

  const { mutate: replot } = useMutation(
    async ({
      plotId,
      isReplot,
      pageIndex,
    }: {
      plotId: string;
      isReplot: boolean;
      pageIndex?: number;
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
          ? { pageIndex, ...res.json() }
          : res.json();
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        if (typeof data?.pageIndex !== undefined) {
          queryClient.refetchQueries(queryKey, {
            refetchPage: (_, index) => index === data.pageIndex,
          });
        } else {
          queryClient.invalidateQueries(queryKey);
        }
      },
    }
  );

  return { feedback, replot };
};
