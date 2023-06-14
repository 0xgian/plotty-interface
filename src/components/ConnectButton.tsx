"use client";

import { ConnectButton as RKConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import {
  HiOutlineDotsHorizontal,
  HiOutlineExclamation,
  HiPlus,
} from "react-icons/hi";
import { Avatar } from "components/Providers";

export default function ConnectButton() {
  return (
    <RKConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
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
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} size="medium">
                    <HiPlus size={16} />
                    <div>Connect</div>
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} size="medium" kind="solid">
                    <HiOutlineExclamation size={16} />
                    <div>Connect</div>
                  </Button>
                );
              }
              return (
                <Button kind="solid" size="medium" onClick={openAccountModal}>
                  <Avatar address={account.address} size={24} />
                  <div className="hidden sm:block">{account.displayName}</div>
                  <HiOutlineDotsHorizontal className="min-w-[16px]" />
                </Button>
              );
            })()}
          </div>
        );
      }}
    </RKConnectButton.Custom>
  );
}
