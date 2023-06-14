"use client";

import * as React from "react";
import {
  AvatarComponent,
  RainbowKitProvider,
  Theme,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  argentWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { binancedWallet } from "utils/customWallets";
import { merge } from "lodash";
import Image from "next/image";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "PLOTTY_APP";

const demoAppInfo = {
  appName: "Plotty App",
};

const connectors = connectorsForWallets([
  {
    groupName: "Wallet",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      injectedWallet({ chains }),
      coinbaseWallet({ chains, appName: "Plotty App" }),
      binancedWallet({ chains }),
      trustWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      argentWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const light = merge(lightTheme({ borderRadius: "medium" }), {
  // blurs: {
  //   modalOverlay: "blur(5px)",
  // },
  colors: {
    accentColor: "#C296FF",
    modalBackground: "rgba(255, 255, 255, 1)",
    modalBackdrop: "rgba(255, 255, 255, 0.3)",
  },
  shadows: {
    dialog: "0px 0px 1px #9092A0",
  },
} as Theme);

export const Avatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <Image
      alt="profile"
      src="/images/app/no-handle.png"
      className="rounded-full"
      width={size}
      height={size}
    />
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        theme={light}
        modalSize="compact"
        avatar={Avatar}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
