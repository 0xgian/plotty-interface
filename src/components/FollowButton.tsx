import clsx from "clsx";
import Button from "components/Button";
import { useFollow } from "hooks/useFollow";
import { useWithAuth } from "hooks/useWithAuth";
import { useEffect, useState } from "react";
import { DropdownMenu } from "components/Dropdown";
import { HiOutlineUserAdd, HiOutlineUserRemove } from "react-icons/hi";

export default function FollowButton({
  queryKey,
  profile,
  size = "sm",
  kind = "button",
}: {
  queryKey?: any[];
  profile: any;
  size?: "sm" | "lg";
  kind?: "button" | "dropdown-menu";
}) {
  const { withAuthHandler } = useWithAuth();

  const [followStatus, setFollowStatus] = useState(!!profile?.follow_status);
  const { follow } = useFollow(queryKey);

  useEffect(() => {
    setFollowStatus(profile?.follow_status);
  }, [profile?.follow_status]);

  const unfollowHandler = withAuthHandler(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (profile?.uid && follow) {
      await follow({
        uid: profile?.uid,
        task: "unfollow",
      });
      setFollowStatus(false);
    }
  });

  const followHandler = withAuthHandler(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (profile?.uid && follow) {
      await follow({
        uid: profile?.uid,
        task: "follow",
      });
      setFollowStatus(true);
    }
  });

  return kind === "dropdown-menu" ? (
    followStatus ? (
      <DropdownMenu onClick={unfollowHandler}>
        <HiOutlineUserRemove size={20} />
        <div>Unfollow</div>
      </DropdownMenu>
    ) : (
      <DropdownMenu onClick={followHandler}>
        <HiOutlineUserAdd size={20} />
        <div>Follow</div>
      </DropdownMenu>
    )
  ) : followStatus ? (
    <Button
      className={clsx("group", WIDTHS[size][0])}
      size={size}
      kind="outline-negative"
      onClick={unfollowHandler}
    >
      <span className="group-hover:hidden">Following</span>
      <span className="hidden group-hover:block">Unfollow</span>
    </Button>
  ) : (
    <Button
      className={WIDTHS[size][1]}
      size={size}
      kind="solid-black"
      onClick={followHandler}
    >
      Follow
    </Button>
  );
}

const WIDTHS = {
  sm: ["w-[100px]", "w-[78px]"],
  lg: ["w-[114px]", "w-[114px]"],
};
