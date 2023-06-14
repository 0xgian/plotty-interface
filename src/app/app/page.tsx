"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

export default function Page() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    redirect(`/${address}`);
  } else {
    openConnectModal && openConnectModal();
  }
}
