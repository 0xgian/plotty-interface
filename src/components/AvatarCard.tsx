import clsx from "clsx";
import { Avatar } from "components/Avatar";
import { formatAddress, formatWithBrackets } from "lib/formatAddress";
import { Fragment, ReactNode, useMemo } from "react";
import RichTextRenderer from "components/RichTextRenderer";
import { IconHandleBadge } from "custom-icons";
import { Profile } from "hooks/types";
import { useLabel } from "hooks/useLabel";

export default function AvatarCard({
  profile,
  showBio = false,
  hoverAction = false,
  trailing,
  className,
  ...props
}: {
  profile: Profile;
  showBio?: boolean;
  hoverAction?: boolean;
  trailing?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { label } = useLabel(profile);

  const shortedAddress = formatAddress(profile.public_address);
  const subtitleEntity = [shortedAddress];

  const username = profile?.handle
    ? profile.handle + formatWithBrackets(label)
    : label || formatAddress(profile?.public_address, { trailing: 0 });
  const usernameBadge = useMemo(
    () =>
      profile?.handle ? (
        <IconHandleBadge size={15} className="text-primary" />
      ) : null,
    [profile]
  );

  return (
    <div
      className={clsx(
        "grid grid-cols-[1fr_auto] items-center gap-3 cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-[40px_1fr] items-start gap-3">
        <div
          className={clsx("min-w-[40px]", hoverAction && "hover:brightness-90")}
        >
          <Avatar
            address={
              profile?.profile_picture_uri ??
              `avatar:${profile?.public_address}`
            }
            size={40}
          />
        </div>

        <div className="flex flex-col truncate">
          <div className="flex items-center gap-[6px]">
            <div
              className={clsx(
                "font-semibold truncate text-ellipsis",
                hoverAction && "hover:underline"
              )}
            >
              {username}
            </div>
            {usernameBadge}
          </div>

          <div className="flex items-center gap-[6px]">
            {subtitleEntity
              .filter((text) => !!text)
              .map((text, i) => (
                <Fragment key={text}>
                  {i > 0 && (
                    <div className="truncate text-ellipsis text-secondary-text">
                      ·
                    </div>
                  )}
                  <div className="truncate text-secondary-text">{text}</div>
                </Fragment>
              ))}
          </div>

          {showBio && profile?.bio && (
            <div>
              <RichTextRenderer content={profile.bio} />
            </div>
          )}
        </div>
      </div>

      {trailing}
    </div>
  );
}
