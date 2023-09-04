import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { usePlotFeedbackStore } from "state/plotFeedback";

export const useMyPlots = () => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();
  const { syncFeedback } = usePlotFeedbackStore();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

  const queryKey = useMemo(
    () => ["myPlots", account, !!token],
    [account, token]
  );

  useEffect(
    () => () => queryClient && queryClient.removeQueries({ queryKey }),
    [queryClient, queryKey]
  );

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (!!account) {
        const paramCursor = !_.isEmpty(pageParam) ? `?after=${pageParam}` : "";
        const res = await fetch(
          getAPI(`/api/myfeed${paramCursor}`),
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : {}
        );
        const json = await res.json();
        syncFeedback(json.data?.data?.timeline?.edges);
        return json;
      }
      return {};
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.data?.data?.timeline?.pageInfo?.next_cursor ?? null;
    },
  });

  const plotsPages = useMemo(
    () =>
      data ? data.pages.map((group) => group.data?.data?.timeline?.edges) : [],
    [data]
  );

  return {
    plotsPages,
    fetchNextPage,
    hasNextPage,
    status,
    queryKey,
  };
};
