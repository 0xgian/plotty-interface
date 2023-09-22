"use client";

import clsx from "clsx";
import { Avatar } from "components/Avatar";
import { HiOutlineDocumentDuplicate, HiOutlineQrcode } from "react-icons/hi";
import { formatAddress } from "lib/formatAddress";
import QRCode from "react-qr-code";
import { toast } from "react-hot-toast";
import RichTextRenderer from "components/RichTextRenderer";
import { useProfile } from "hooks/useProfile";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { formatNumber } from "lib/formatNumber";
import { useAuthStore } from "state/auth";
import IconButton from "components/IconButton";
import FollowButton from "components/FollowButton";
import { IconHandleBadge } from "custom-icons";
import EditProfileModal from "./EditProfileModal";
import ProfileLabel from "./ProfileLabel";

export default function ProfileHeader() {
  const params = useParams();
  const u = params?.["u"] as string;

  const { profile, queryKey } = useProfile(u);

  const { account } = useAuthStore();
  const { profile: currentProfile, updateProfile } = useProfile(account);

  const usernameBadge = useMemo(
    () =>
      profile?.handle ? (
        <IconHandleBadge size={20} className="text-primary ml-[6px]" />
      ) : null,
    [profile]
  );

  const isOwnProfile =
    profile && currentProfile && profile?.uid === currentProfile?.uid;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-[30px] flex-row">
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <div className="min-w-[132px]">
            <Avatar
              address={
                profile?.profile_picture_uri ??
                `avatar:${profile?.public_address}`
              }
              size={132}
            />
          </div>

          <div className="w-full sm:max-w-[600px] flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex items-center mb-[6px]">
                <div
                  className={clsx(
                    "font-semibold text-xl",
                    !profile?.handle && "text-secondary-text"
                  )}
                >
                  {!profile?.handle ? "No Handle" : profile.handle}
                </div>

                {usernameBadge}

                {/* <Button size="xs" px="px-3" className="ml-3">
                  <HiOutlinePlus size={15} />
                  <span className="hidden sm:block">Mint</span>
                </Button> */}
              </div>

              {profile?.public_address && (
                <div className="flex gap-3 text-secondary-text">
                  <div className="hidden xl:block">
                    {profile.public_address}
                  </div>
                  <div className="xl:hidden">
                    {formatAddress(profile.public_address)}
                  </div>
                  <div className="flex gap-[6px]">
                    <IconButton
                      icon={<HiOutlineDocumentDuplicate size={20} />}
                      activeColor="black"
                      onClick={() => {
                        navigator.clipboard.writeText(profile.public_address);
                        toast.success("Copied", { id: profile.public_address });
                      }}
                    />
                    <div
                      className={clsx(
                        "relative flex items-center justify-center",
                        "w-6 h-6 rounded-full group"
                      )}
                    >
                      <IconButton
                        icon={<HiOutlineQrcode size={20} />}
                        activeColor="black"
                      />
                      <div
                        className={clsx(
                          "bg-white border border-opacity-10 rounded-xl border-secondary-text transition-all",
                          "absolute top-8 h-0 w-0 opacity-0 group-hover:h-32 group-hover:w-32 group-hover:p-3 group-hover:opacity-100"
                        )}
                      >
                        <QRCode
                          size={132}
                          value={profile.public_address}
                          viewBox={`0 0 256 256`}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <ProfileLabel
                profile={profile}
                isOwnProfile={isOwnProfile}
                queryKey={queryKey}
              />
            </div>

            {profile?.bio && (
              <div>
                <RichTextRenderer content={profile.bio} />
              </div>
            )}

            {/* <div className="flex gap-[6px] items-center text-secondary-text">
              <HiOutlineCalendar size={15} />
              <div>1800 days</div>
            </div> */}

            <div className="flex items-baseline gap-3">
              <div className="flex gap-[6px] items-baseline">
                <div className="font-semibold">
                  {formatNumber(profile?.following)}
                </div>
                <div className="text-secondary-text">Following</div>
              </div>

              <div className="flex gap-[6px] items-baseline">
                <div className="font-semibold">
                  {formatNumber(profile?.follower)}
                </div>
                <div className="text-secondary-text">Followers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex flex-col items-end gap-3 lg:justify-between md:static right-6">
          {isOwnProfile ? (
            <EditProfileModal
              bio={profile?.bio}
              updateProfile={updateProfile}
            />
          ) : (
            <FollowButton queryKey={queryKey} profile={profile} size="lg" />
          )}

          {/* <div className="flex flex-col text-right">
            <div className="text-4xl font-semibold">$20,061,648</div>
            <div className="font-medium text-red-500">
              -2.4% ($488,858.11)
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
