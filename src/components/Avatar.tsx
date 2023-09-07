import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { useProfile } from "hooks/useProfile";
import Image from "next/image";
import BoringAvatar from "boring-avatars";
import clsx from "clsx";

export const Avatar: AvatarComponent = ({
  address = "0x0",
  ensImage,
  size,
}) => {
  const { profile } = useProfile(
    address.startsWith("http") ? undefined : address
  );

  return address.startsWith("http") || !!profile?.profile_picture_uri ? (
    <Image
      alt="profile"
      src={address.startsWith("http") ? address : profile?.profile_picture_uri}
      className={clsx("rounded-full select-none")}
      width={size}
      height={size}
    />
  ) : (
    <BoringAvatar
      size={size}
      name={address}
      variant="beam"
      colors={["#352F44", "#5C5470", "#B9B4C7", "#FAF0E6"]}
    />
  );
};
