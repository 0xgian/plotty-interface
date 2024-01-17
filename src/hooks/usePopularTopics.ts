import { getAPI } from "lib/getAPI";
import { useAuthStore } from "state/auth";
import { useFeedTab } from "state/feedTab";
import { FeedTabTypes, Topic } from "state/types";
import { useMutation, useQuery, useQueryClient } from "wagmi";

export const usePopularTopics = () => {
  const queryClient = useQueryClient();
  const { session, account } = useAuthStore();
  const { updateTopics } = useFeedTab();

  const token = account && session?.accounts?.[account]?.access_token;

  const { data: topics } = useQuery(["popularTopics"], async () => {
    const res = await fetch(getAPI(`/api/topics`));
    const json = await res.json();
    const list = json?.data?.topics?.data?.topic;
    return list;
  });

  const { mutateAsync: chooseTopics } = useMutation(
    async (topics: Topic[]) => {
      if (token) {
        const res = await fetch(getAPI(`/api/user/topics`), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            topic_ids: topics.map((t) => t.topic_id),
          }),
        });
        const json = await res.json();
        return { ...json, topics };
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: (data) => {
        updateTopics(data.topics);
        queryClient.invalidateQueries([
          "myPlots",
          FeedTabTypes.Foryou,
          "all",
          account,
          true,
        ]);
      },
    }
  );

  return { topics, chooseTopics };
};
