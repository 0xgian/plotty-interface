"use client";

import { ReactNode, useEffect, useState } from "react";
import {
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
import { binancedWallet } from "lib/customWallets";
import { merge } from "lodash";
import { Avatar } from "components/Avatar";
import AuthContext from "./AuthContext";
import PlotModal from "./PlotModal";
import AuthModal from "./AuthModal";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = process.env.NEXT_WC_PROJECT_ID ?? "PLOTTY_APP";

const appInfo = {
  appName: "Plotty App",
};

const connectors = connectorsForWallets([
  {
    groupName: "Please select sign-in method",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
  {
    groupName: "or more options",
    wallets: [
      injectedWallet({ chains }),
      coinbaseWallet({ chains, appName: "Plotty App" }),
      binancedWallet({ chains }),
      trustWallet({ projectId, chains }),
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
  //   modalOverlay: "blur(12px)",
  // },
  colors: {
    accentColor: "#5B6BDF",
    modalBackground: "#FFFEF8",
    modalBackdrop: "#13121740",
  },
  shadows: {
    dialog: "0px 0px 1px #6D6C6F",
  },
} as Theme);

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <AuthContext>
        <RainbowKitProvider
          chains={chains}
          appInfo={appInfo}
          theme={light}
          modalSize="compact"
          avatar={Avatar}
        >
          {mounted && children}
          <AuthModal />
          <PlotModal />
        </RainbowKitProvider>
      </AuthContext>
    </WagmiConfig>
  );
}
