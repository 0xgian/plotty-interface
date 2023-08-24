import { useAuthStatusStore } from "state/authStatus";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";

export const useSearchPlots = (q?: string) => {
  const { session, account } = useAuthStatusStore();
  const queryClient = useQueryClient();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

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
