import { Chain, Wallet } from "@rainbow-me/rainbowkit";
import { InjectedConnector } from "@wagmi/core";
import { isFirefox } from "react-device-detect";

export interface CustomWalletOptions {
  chains: Chain[];
}

export const binancedWallet = ({ chains }: CustomWalletOptions): Wallet => ({
  id: "binance",
  name: "Binance Wallet",
  iconUrl: "https://pancakeswap.finance/images/wallets/binance.png",
  iconBackground: "#ffffff00",
  // @ts-ignore
  installed: typeof window !== "undefined" && Boolean(window.BinanceChain),
  downloadUrls: {
    browserExtension: isFirefox
      ? "https://addons.mozilla.org/en-US/firefox/addon/binance-chain/?src=search"
      : "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp",
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains: chains,
      options: {
        name: "Binance Wallet",
        getProvider: () =>
          // @ts-ignore
          typeof window !== "undefined" ? window.BinanceChain : undefined,
      },
    }),
  }),
});
