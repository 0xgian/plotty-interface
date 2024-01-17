"use client";

import BrandLoading from "components/BrandLoading";
import Empty from "components/Empty";
import PlottedCard from "components/PlottedCard";
import { useMyPlots } from "hooks/useMyPlots";
import _ from "lodash";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFeedTab } from "state/feedTab";

export default function Page() {
  const { feedTabType, topic } = useFeedTab();
  const { plotsPages, fetchNextPage, hasNextPage, status, queryKey } =
    useMyPlots(feedTabType, topic.topic_id);

  return status === "loading" ? (
    <BrandLoading listView />
  ) : plotsPages.some((page) => !_.isEmpty(page)) ? (
    <InfiniteScroll
      dataLength={plotsPages.length}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<BrandLoading listView />}
    >
      {plotsPages.map((plots, pageIndex) => (
        <Fragment key={pageIndex}>
          {plots &&
            plots.map((item: any, i: number) => {
              return (
                <PlottedCard
                  key={i}
                  nodeItem={item}
                  pageIndex={pageIndex}
                  queryKey={queryKey}
                />
              );
            })}
        </Fragment>
      ))}
    </InfiniteScroll>
  ) : (
    <Empty
      title={`Nothing in your plots`}
      desc="There is no data or information present in your plots."
      mt="mt-4"
    />
  );
}
