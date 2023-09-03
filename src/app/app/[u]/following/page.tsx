"use client";

import AvatarCard from "components/AvatarCard";
import { useFollowing } from "hooks/useFollow";
import { useProfile } from "hooks/useProfile";
import CardContainer from "components/CardContainer";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import BrandLoading from "components/BrandLoading";
import { Fragment } from "react";
import FollowButton from "components/FollowButton";
import _ from "lodash";
import Empty from "components/Empty";

export default function Page({ params: { u } }: { params: { u: string } }) {
  const router = useRouter();
  const { profile } = useProfile(u);
  const { followingPages, fetchNextPage, hasNextPage, status } = useFollowing(
    profile?.uid
  );

  return status === "loading" ? (
    <BrandLoading listView />
  ) : followingPages.some((page) => !_.isEmpty(page)) ? (
    <InfiniteScroll
      dataLength={followingPages.length}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<BrandLoading listView />}
    >
      {followingPages.map((following, pageIndex) => (
        <Fragment key={pageIndex}>
          {following &&
            following.map((item: any, i: number) => (
              <CardContainer
                key={i}
                onClick={() =>
                  item.node.profile &&
                  router &&
                  router.push(
                    `/${
                      item.node.profile?.handle ??
                      item.node.profile?.public_address
                    }`
                  )
                }
                borderHidden
              >
                <AvatarCard
                  profile={
                    item.node.profile ?? { public_address: "0x000000000" }
                  }
                  showBio
                  hoverAction
                  trailing={<FollowButton profile={item.node.profile} />}
                />
              </CardContainer>
            ))}
        </Fragment>
      ))}
    </InfiniteScroll>
  ) : (
    <Empty
      title={`Be in the know`}
      desc="Following accounts is an easy way to curate your timeline and know what's happening with the on-chain activities and address you're interested in."
    />
  );
}
