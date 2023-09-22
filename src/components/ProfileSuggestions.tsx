"use client";

import { useProfileSuggestions } from "hooks/useProfileSuggestions";
import AvatarCard from "components/AvatarCard";
import FollowButton from "components/FollowButton";
import { useRouter } from "next/navigation";
import CardContainer from "components/CardContainer";
import _ from "lodash";

export default function ProfileSuggestions() {
  const router = useRouter();
  const { profileSuggestions } = useProfileSuggestions();

  return !_.isEmpty(profileSuggestions) ? (
    <div className="sticky flex flex-col w-full py-3 mt-3 rounded-lg bg-primary-white top-3">
      <div className="px-4 mb-3 text-xl font-semibold">Who to follow</div>
      {profileSuggestions.map((profile: any, i: number) => (
        <CardContainer
          key={i}
          onClick={() =>
            profile &&
            router &&
            router.push(`/${profile?.handle ?? profile?.public_address}`)
          }
          borderHidden
        >
          <AvatarCard
            profile={profile}
            hoverAction
            trailing={<FollowButton profile={profile} />}
          />
        </CardContainer>
      ))}
    </div>
  ) : null;
}
