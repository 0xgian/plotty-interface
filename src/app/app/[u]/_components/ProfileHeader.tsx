"use client";

import clsx from "clsx";
import { Avatar } from "components/Avatar";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineQrcode,
  HiOutlineX,
} from "react-icons/hi";
import { formatAddress } from "lib/formatAddress";
import QRCode from "react-qr-code";
import Button from "components/Button";
import { toast } from "react-hot-toast";
import RichTextRenderer from "components/RichTextRenderer";
import { useProfile } from "hooks/useProfile";
import { useParams } from "next/navigation";
import { useState } from "react";
import { formatNumber } from "lib/formatNumber";
import { useAuthStore } from "state/auth";
import Modal from "components/Modal";
import { Dialog } from "@headlessui/react";
import IconButton from "components/IconButton";
import FollowButton from "components/FollowButton";

export default function ProfileHeader() {
  const params = useParams();
  const u = params?.["u"] as string;

  const { profile } = useProfile(u);

  const { account } = useAuthStore();
  const {
    profile: currentProfile,
    updateProfile,
    queryKey,
  } = useProfile(account);

  const [bioValue, setBioValue] = useState<string>(profile?.bio ?? "");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-[30px] flex-row">
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <Avatar
            address={
              profile?.profile_picture_uri ?? `avatar:${profile?.public_address}`
            }
            size={132}
          />

          <div className="w-full sm:max-w-[600px] flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-[6px]">
                <div
                  className={clsx(
                    "font-semibold text-xl",
                    !profile?.handle && "text-secondary-text"
                  )}
                >
                  {!profile?.handle ? "No Handle" : profile.handle}
                </div>

                {/* <Button size="xs">
                  <HiOutlinePlus size={16} />
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
            </div>

            {profile?.bio && (
              <div>
                <RichTextRenderer content={profile.bio} />
              </div>
            )}

            {/* <div className="flex gap-[6px] items-center text-secondary-text">
              <HiOutlineCalendar size={16} />
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
          {profile && profile?.uid === currentProfile?.uid ? (
            <>
              <Modal
                buttonRender={({ openModal }) => (
                  <Button
                    className="min-w-[114px]"
                    kind="outline-black"
                    onClick={openModal}
                  >
                    Edit Bio
                  </Button>
                )}
              >
                {({ closeModal }) => (
                  <>
                    <Dialog.Title className="flex items-center justify-between">
                      <IconButton
                        icon={<HiOutlineX size={20} />}
                        activeColor="black"
                        kind="header"
                        label="Edit Bio"
                        onClick={() => {
                          closeModal();
                          setBioValue(profile?.bio ?? "");
                        }}
                      />
                      <Button
                        size="sm"
                        kind="solid-black"
                        onClick={async () => {
                          try {
                            updateProfile && (await updateProfile(bioValue));
                            closeModal();
                          } catch (error) {
                            toast(
                              "Failed to update profile. Please try again later.",
                              { id: "fail-to-update-profile" }
                            );
                          }
                        }}
                      >
                        Save
                      </Button>
                    </Dialog.Title>

                    <div className="px-2 pt-2 pb-3 mt-3 border border-secondary-text border-opacity-20 rounded-[4px] flex flex-col gap-[6px]">
                      <div className="flex justify-between text-xs text-secondary-text">
                        <div>Bio</div>
                        <div>{`${bioValue.length}/160`}</div>
                      </div>
                      <textarea
                        maxLength={160}
                        className="w-full h-16 outline-none resize-none bg-inherit"
                        autoCapitalize="sentences"
                        autoComplete="on"
                        autoCorrect="on"
                        name="description"
                        dir="auto"
                        spellCheck
                        placeholder="Bio"
                        onChange={(e) => {
                          setBioValue(e.target.value);
                        }}
                        value={bioValue}
                      />
                    </div>
                  </>
                )}
              </Modal>
            </>
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
