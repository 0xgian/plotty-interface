import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";

export const useProfilePlots = (uid?: string) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

  const queryKey = useMemo(() => ["profilePlots", uid, !!token], [uid, token]);

  useEffect(
    () => () => queryClient && queryClient.removeQueries({ queryKey }),
    [queryClient, queryKey]
  );

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (typeof uid !== "undefined") {
        const paramCursor = !_.isEmpty(pageParam) ? `?after=${pageParam}` : "";
        const res = await fetch(
          getAPI(`/api/feed/${uid}${paramCursor}`),
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
      return lastPage?.data?.data?.page_feed?.pageInfo?.next_cursor ?? null;
    },
  });

  const plotsPages = useMemo(
    () =>
      data ? data.pages.map((group) => group.data?.data?.page_feed?.edges) : [],
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
