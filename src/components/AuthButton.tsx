"use client";

import { ConnectButton as RKConnectButton } from "@rainbow-me/rainbowkit";
import Button from "components/Button";
import {
  HiCheckCircle,
  HiOutlineDotsHorizontal,
  HiOutlineLogout,
} from "react-icons/hi";
import { Avatar } from "components/Avatar";
import { useAuthStatusStore } from "state/authStatus";
import { formatAddress } from "lib/formatAddress";
import { useDisconnect } from "wagmi";
import Dropdown from "components/Dropdown";
import Link from "next/link";
import AvatarCard from "components/AvatarCard";

export default function AuthButton() {
  const { account: currentAccount } = useAuthStatusStore();
  const { disconnect } = useDisconnect();
  return (
    <RKConnectButton.Custom>
      {({
        authenticationStatus,
        mounted,
        account: rkAccount,
        openConnectModal,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
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
                  <Link href="/">
                    <Button size="md">Log in</Button>
                  </Link>
                );
              }
              return (
                <Dropdown
                  button={
                    <Button kind="transparent" size="md">
                      <Avatar address={currentAccount as string} size={24} />
                      <div className="hidden sm:block">
                        {formatAddress(currentAccount as string, {
                          trailing: 0,
                        })}
                      </div>
                      <HiOutlineDotsHorizontal className="min-w-[16px]" />
                    </Button>
                  }
                >
                  {({}) => (
                    <>
                      <div className="py-3 border-b border-secondary-text border-opacity-10">
                        <div className="relative px-4 py-3 select-none hover:bg-secondary-text hover:bg-opacity-5">
                          <AvatarCard
                            profile={{ public_address: currentAccount }}
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
                            !!rkAccount ? disconnect() : openConnectModal();
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