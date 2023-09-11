import clsx from "clsx";
import { Avatar } from "components/Avatar";
import { formatAddress } from "lib/formatAddress";
import { ReactNode } from "react";
import RichTextRenderer from "./RichTextRenderer";

export default function AvatarCard({
  profile,
  showBio = false,
  hoverAction = false,
  trailing,
  className,
  ...props
}: {
  profile: {
    profile_picture_uri?: string;
    public_address: string;
    handle?: string;
    bio?: string;
  };
  showBio?: boolean;
  hoverAction?: boolean;
  trailing?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-3 cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-start gap-3">
          <div
            className={clsx(
              "min-w-[40px]",
              hoverAction && "hover:brightness-90"
            )}
          >
            <Avatar
              address={
                profile?.profile_picture_uri ??
                `avatar:${profile?.public_address}`
              }
              size={40}
            />
          </div>

          <div className="flex flex-col">
            <div
              className={clsx(
                "font-semibold truncate text-ellipsis",
                hoverAction && "hover:underline"
              )}
            >
              {profile?.handle ??
                formatAddress(profile?.public_address, { trailing: 0 })}
            </div>
            <div className="truncate text-ellipsis text-secondary-text">
              {formatAddress(profile?.public_address)}
            </div>
            {showBio && profile?.bio && (
              <div>
                <RichTextRenderer content={profile.bio} />
              </div>
            )}
          </div>
        </div>
      </div>

      {trailing}
    </div>
  );
}
