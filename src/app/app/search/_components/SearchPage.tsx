"use client";

import BrandLoading from "components/BrandLoading";
import Empty from "components/Empty";
import PlottedCard from "components/PlottedCard";
import { useSearchPlots } from "hooks/useSearchPlots";
import _ from "lodash";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchPage() {
    const searchParams = useSearchParams()
    const q = searchParams?.get("q") as string;
    const { plotsPages, fetchNextPage, hasNextPage, status, queryKey } =
      useSearchPlots(q);
  
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
        title={q ? `No results for "${q}"` : "Search Plotty"}
        desc="Try searching for something else."
        mt="mt-4"
      />
    );
  }