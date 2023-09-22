import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { usePlotFeedbackStore } from "state/plotFeedback";

export const useSearchPlots = (q?: string) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();
  const { syncFeedback } = usePlotFeedbackStore();

  const token = account && session?.accounts?.[account]?.access_token;

  const queryKey = useMemo(() => ["searchPlots", q, !!token], [q, token]);

  useEffect(
    () => () => queryClient && queryClient.removeQueries({ queryKey }),
    [queryClient, queryKey]
  );

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (typeof q !== "undefined") {
        const paramCursor = !_.isEmpty(pageParam) ? `?after=${pageParam}` : "";
        const res = await fetch(
          getAPI(
            `/api/search?hashtag=${q
              .replace(/^#/g, "%23")
              .replace(/^\$/g, "%24")}${paramCursor}`
          ),
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : {}
        );
        const json = await res.json();
        syncFeedback(json.data?.data?.search_timeline?.edges);
        return json;
      }
      return {};
    },
    getNextPageParam: (lastPage, pages) => {
      return (
        lastPage?.data?.data?.search_timeline?.pageInfo?.next_cursor ?? null
      );
    },
  });

  const plotsPages = useMemo(
    () =>
      data
        ? data.pages.map((group) => group.data?.data?.search_timeline?.edges)
        : [],
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
