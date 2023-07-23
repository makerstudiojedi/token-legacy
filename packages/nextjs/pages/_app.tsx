import { useEffect } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { WagmiConfig } from "wagmi";
import DevAccount from "~~/components/DevAccount";
// import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { Toaster } from "~~/components/ui/toaster";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import { darkerGrotesque, inter } from "~~/utils/fonts";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider theme={darkTheme()} chains={appChains.chains} avatar={BlockieAvatar}>
        <div className="flex flex-col min-h-screen">
          {/* <Header /> */}
          <main className={cn(inter.variable, darkerGrotesque.variable, "relative flex flex-col flex-1")}>
            <Component {...pageProps} />
          </main>
          {/* <Footer /> */}
        </div>

        <Toaster />
        <DevAccount />
        {/* <Toaster /> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
