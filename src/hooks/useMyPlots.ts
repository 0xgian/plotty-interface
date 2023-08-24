import { useAuthStatusStore } from "state/authStatus";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";

export const useMyPlots = () => {
  const { session, account } = useAuthStatusStore();
  const queryClient = useQueryClient();

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
        return json;
      }
      return {};
    },
    getNextPageParam: (lastPage, pages) => {
      return (
        lastPage?.data?.data?.timeline?.pageInfo?.next_cursor ?? null
      );
    },
  });

  const plotsPages = useMemo(
    () =>
      data
        ? data.pages.map((group) => group.data?.data?.timeline?.edges)
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
