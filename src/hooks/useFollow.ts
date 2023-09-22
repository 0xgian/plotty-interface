import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useInfiniteQuery, useMutation, useQueryClient } from "wagmi";
import { useEffect, useMemo } from "react";
import _ from "lodash";

export interface FollowParams {
  uid: number;
  task: "follow" | "unfollow";
}

export const useFollow = (queryKey?: any[]) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

  const { mutateAsync: follow } = useMutation(
    async ({ uid, task }: FollowParams) => {
      if (token) {
        const res = await fetch(getAPI(`/api/user/${task}/${uid}`), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return res.json();
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: () => {
        queryKey && queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { follow };
};

export const useFollowing = (uid?: number) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

  const queryKey = useMemo(() => ["following", uid, !!token], [uid, token]);

  useEffect(
    () => () => queryClient && queryClient.removeQueries({ queryKey }),
    [queryClient, queryKey]
  );

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (typeof uid === "number" && !!token) {
        const paramCursor = !_.isEmpty(pageParam) ? `?after=${pageParam}` : "";
        const res = await fetch(
          getAPI(`/api/user/${uid}/following${paramCursor}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        return json.data.data.following_list;
      }
      return null;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.pageInfo?.next_cursor ?? null;
    },
  });

  const followingPages = useMemo(
    () => (data ? data.pages.map((group) => group.edges) : []),
    [data]
  );

  return { followingPages, fetchNextPage, hasNextPage, status, queryKey };
};

export const useFollowers = (uid?: number) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

  const queryKey = useMemo(() => ["followers", uid, !!token], [uid, token]);

  useEffect(
    () => () => queryClient && queryClient.removeQueries({ queryKey }),
    [queryClient, queryKey]
  );

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (typeof uid === "number" && !!token) {
        const paramCursor = !_.isEmpty(pageParam) ? `?after=${pageParam}` : "";
        const res = await fetch(
          getAPI(`/api/user/${uid}/follower${paramCursor}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        return json.data.data.follower_list;
      }
      return null;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.pageInfo?.next_cursor ?? null;
    },
  });

  const followersPages = useMemo(
    () => (data ? data.pages.map((group) => group.edges) : []),
    [data]
  );

  return { followersPages, fetchNextPage, hasNextPage, status, queryKey };
};
