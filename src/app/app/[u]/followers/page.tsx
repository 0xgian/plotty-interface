"use client";

import AvatarCard from "components/AvatarCard";
import { useFollowers } from "hooks/useFollow";
import { useProfile } from "hooks/useProfile";
import ProfileCardContainer from "components/ProfileCardContainer";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import BrandLoading from "components/BrandLoading";
import { Fragment } from "react";
import FollowButton from "components/FollowButton";
import Empty from "components/Empty";
import _ from "lodash";

export default function Page({ params: { u } }: { params: { u: string } }) {
  const router = useRouter();
  const { profile } = useProfile(u);
  const { followersPages, fetchNextPage, hasNextPage, status } = useFollowers(
    profile?.uid
  );

  return status === "loading" ? (
    <BrandLoading listView />
  ) : followersPages.some((page) => !_.isEmpty(page)) ? (
    <InfiniteScroll
      dataLength={followersPages.length}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<BrandLoading listView />}
    >
      {followersPages.map((followers, pageIndex) => (
        <Fragment key={pageIndex}>
          {followers &&
            followers.map((item: any, i: number) => (
              <ProfileCardContainer
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
              </ProfileCardContainer>
            ))}
        </Fragment>
      ))}
    </InfiniteScroll>
  ) : (
    <Empty
      title={`Looking for followers?`}
      desc="When someone follows this account, they'll show up here."
    />
  );
}
