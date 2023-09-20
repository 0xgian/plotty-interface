"use client";

import {
  ConnectButton as RKConnectButton,
  useAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import Button from "components/Button";
import {
  HiCheckCircle,
  HiOutlineDotsHorizontal,
  HiOutlineLogout,
} from "react-icons/hi";
import { Avatar } from "components/Avatar";
import { useAuthStore } from "state/auth";
import { formatAddress } from "lib/formatAddress";
import { useDisconnect } from "wagmi";
import Dropdown from "components/Dropdown";
import Link from "next/link";
import AvatarCard from "components/AvatarCard";
import { useProfile } from "hooks/useProfile";

export default function AuthButton() {
  const { account: currentAccount } = useAuthStore();
  const { profile: currentProfile } = useProfile(currentAccount);
  const { disconnect } = useDisconnect();
  const { signOut } = useAuthenticationAdapter();
  return (
    <RKConnectButton.Custom>
      {({
        authenticationStatus,
        mounted,
        account: rkAccount,
        openConnectModal,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && rkAccount;
        const authenticated =
          ready &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!authenticated || !currentAccount) {
                return (
                  <Link href="/login">
                    <Button size="md">
                      {!connected ? "Log in" : "Verify"}
                    </Button>
                  </Link>
                );
              }
              return (
                <Dropdown
                  button={
                    <Button kind="transparent" className="-mr-4 sm:mr-auto">
                      <Avatar address={currentAccount as string} size={24} />
                      <div className="hidden sm:block">
                        {formatAddress(currentAccount as string, {
                          trailing: 0,
                        })}
                      </div>
                      <HiOutlineDotsHorizontal className="min-w-[16px] hidden sm:block" />
                    </Button>
                  }
                >
                  {({}) => (
                    <>
                      <div className="py-3 border-b border-secondary-text border-opacity-10">
                        <div className="relative px-4 py-3 select-none hover:bg-secondary-text hover:bg-opacity-5">
                          <AvatarCard
                            profile={
                              currentProfile ?? {
                                public_address: currentAccount,
                              }
                            }
                            trailing={
                              <HiCheckCircle className="text-green-500" />
                            }
                          />
                        </div>
                      </div>
                      <div className="pb-3 font-semibold cursor-pointer">
                        {/* <div className="flex items-center gap-3 px-4 py-3 select-none hover:bg-secondary-text hover:bg-opacity-5">
                          <HiOutlinePlus className="text-secondary-text" />
                          <span className="truncate">Add another account</span>
                        </div> */}
                        <div
                          className="flex items-center gap-3 px-4 py-3 select-none hover:bg-secondary-text hover:bg-opacity-5"
                          onClick={() => {
                            !!rkAccount ? disconnect() : signOut && signOut();
                          }}
                        >
                          <HiOutlineLogout className="text-secondary-text" />
                          <span className="truncate">
                            Log out{" "}
                            {formatAddress(currentAccount, { trailing: 0 })}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Dropdown>
              );
            })()}
          </div>
        );
      }}
    </RKConnectButton.Custom>
  );
}
