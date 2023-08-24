import clsx from "clsx";
import Button from "components/Button";
import { useFollow } from "hooks/useFollow";
import { useWithAuth } from "hooks/useWithAuth";
import { useEffect, useState } from "react";

export default function FollowButton({
  queryKey,
  profile,
  size = "sm",
}: {
  queryKey?: any[];
  profile: any;
  size?: "sm" | "lg";
}) {
  const { withAuthHandler } = useWithAuth();

  const [followStatus, setFollowStatus] = useState(!!profile?.follow_status);
  const { follow } = useFollow(queryKey);

  useEffect(() => {
    setFollowStatus(profile?.follow_status);
  }, [profile?.follow_status]);

  return followStatus ? (
    <Button
      className={clsx("group", WIDTHS[size][0])}
      size={size}
      kind="outline-negative"
      onClick={withAuthHandler(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile?.uid && follow) {
          await follow({
            uid: profile?.uid,
            task: "unfollow",
          });
          setFollowStatus(false);
        }
      })}
    >
      <span className="group-hover:hidden">Following</span>
      <span className="hidden group-hover:block">Unfollow</span>
    </Button>
  ) : (
    <Button
      className={WIDTHS[size][1]}
      size={size}
      kind="solid-black"
      onClick={withAuthHandler(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (profile?.uid && follow) {
          await follow({
            uid: profile?.uid,
            task: "follow",
          });
          setFollowStatus(true);
        }
      })}
    >
      Follow
    </Button>
  );
}

const WIDTHS = {
  sm: ["w-[100px]", "w-[78px]"],
  lg: ["w-[114px]", "w-[114px]"],
};
