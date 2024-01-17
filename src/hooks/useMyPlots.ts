import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { usePlotFeedbackStore } from "state/plotFeedback";
import { FeedTabTypes } from "state/types";

export const useMyPlots = (type: FeedTabTypes, topicId?: string) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();
  const { syncFeedback } = usePlotFeedbackStore();

  const token = account && session?.accounts?.[account]?.access_token;

  const queryKey = useMemo(
    () => ["myPlots", type, topicId, account, !!token],
    [account, type, topicId, token]
  );

  useEffect(
    () => () => queryClient && queryClient.removeQueries({ queryKey }),
    [queryClient, queryKey]
  );

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (!!account) {
        const paramCursor = !_.isEmpty(pageParam) ? `after=${pageParam}` : "";
        const res = await fetch(
          type === FeedTabTypes.Following
            ? getAPI(`/api/myfeed${paramCursor ? "?" + paramCursor : ""}`)
            : getAPI(
                `/api/user/topics/timeline${
                  topicId && topicId !== "all"
                    ? "?topic_id=" + topicId + "&"
                    : "?"
                }${paramCursor}`
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
        const { timeline, topic_timeline } = json.data?.data;
        const timelineData = timeline || topic_timeline;
        syncFeedback(timelineData?.edges);
        return timelineData;
      }
      return {};
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.pageInfo?.next_cursor ?? null,
  });

  const plotsPages = useMemo(
    () => (data ? data.pages.map((group) => group.edges) : []),
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
