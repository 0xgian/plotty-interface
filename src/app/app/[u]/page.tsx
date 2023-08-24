"use client";

import { useProfile } from "hooks/useProfile";
import { useProfilePlots } from "hooks/useProfilePlots";
import _ from "lodash";
import PlottedCard from "components/PlottedCard";
import InfiniteScroll from "react-infinite-scroll-component";
import BrandLoading from "components/BrandLoading";
import { Fragment } from "react";
import Empty from "components/Empty";

export default function Page({ params: { u } }: { params: { u: string } }) {
  const { profile } = useProfile(u);
  const uid = profile?.uid;
  const { plotsPages, fetchNextPage, hasNextPage, status, queryKey } =
    useProfilePlots(uid);
  console.log(8888, u);
    
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
      title={`No plots for "${u.substring(0, 6)}"`}
      desc="When you plot some things, they will show up here."
    />
  );
}
