import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { useProfile } from "hooks/useProfile";
import Image from "next/image";

export const Avatar: AvatarComponent = ({ address, ensImage, size }) => {
  const { profile } = useProfile(
    address && address.startsWith("http") ? undefined : address
  );

  return (
    <Image
      alt="profile"
      src={
        address && address.startsWith("http")
          ? address
          : profile?.profile_picture_uri ?? "/images/app/no-handle.png"
      }
      className="rounded-full select-none"
      width={size}
      height={size}
    />
  );
};
