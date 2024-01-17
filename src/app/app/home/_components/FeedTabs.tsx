"use client";

import _ from "lodash";
import { useCallback } from "react";
import Tabs from "components/Tabs";
import { FeedTabTypes } from "state/types";
import { useFeedTab, useTopicsInitializer } from "state/feedTab";
import ChooseTopicsModal from "./ChooseTopicsModal";

export default function FeedTabs() {
  useTopicsInitializer();

  const { feedTabType, changeFeedTab, topics, topic, changeTopic } =
    useFeedTab();

  const changePrimaryTap = useCallback(
    (tab: string) => {
      changeFeedTab(tab as FeedTabTypes);
    },
    [changeFeedTab]
  );

  const changeSecondaryTap = useCallback(
    (tab: string) => {
      changeTopic(tab);
    },
    [changeTopic]
  );

  return (
    <>
      <div className="sticky top-0 flex flex-col bg-white z-[1] backdrop-blur-md bg-opacity-25">
        <Tabs
          selected={feedTabType}
          onSelect={changePrimaryTap}
          tabs={Object.values(FeedTabTypes)}
        />
        {feedTabType === FeedTabTypes.Foryou &&
          Object.keys(topics).length > 1 && (
            <Tabs
              selected={topic.topic_name}
              onSelect={changeSecondaryTap}
              tabs={topics.map((topic) => topic.topic_name)}
            />
          )}
      </div>

      {Object.keys(topics).length >= 1 && (
        <ChooseTopicsModal showOnStart={Object.keys(topics).length <= 1} />
      )}
    </>
  );
}
