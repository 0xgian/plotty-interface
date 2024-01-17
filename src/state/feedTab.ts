import { create } from "zustand";
import { FeedTabTypes, Topic } from "./types";
import { useAuthStore } from "./auth";
import { useEffect } from "react";
import { getAPI } from "lib/getAPI";
import _ from "lodash";

interface FeedTabStoreType {
  feedTabType: FeedTabTypes;
  changeFeedTab: (feedTabType: FeedTabTypes) => void;
  topics: Topic[];
  updateTopics: (topics: Topic[]) => void;
  topic: Topic;
  changeTopic: (topic: string) => void;
}

const defaultTopic = { topic_id: "all", topic_name: "All" };

export const useFeedTab = create<FeedTabStoreType>((set, get) => ({
  feedTabType: FeedTabTypes.Foryou,
  changeFeedTab: (feedTabType: FeedTabTypes) => set({ feedTabType }),
  topics: [],
  updateTopics: (topics: Topic[]) => set({ topics: [defaultTopic, ...topics] }),
  topic: defaultTopic,
  changeTopic: (topic: string) =>
    set({
      topic:
        get().topics.find(
          (t) => t.topic_id === topic || t.topic_name === topic
        ) || defaultTopic,
    }),
}));

export const useTopicsInitializer = () => {
  const { session, account } = useAuthStore();

  useEffect(() => {
    const getTopics = async () => {
      const res = await fetch(getAPI("/api/user/topics"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      const topics = json?.data?.data?.user_topic;

      useFeedTab.setState((state) => ({
        ...state,
        topics: [defaultTopic, ...topics],
      }));
    };

    const token = account && session?.accounts?.[account]?.access_token;
    if (!token) return;

    !!token && _.isEmpty(useFeedTab.getState().topics) && getTopics();
  }, [session, account]);
};
