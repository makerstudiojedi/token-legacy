import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
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
import TokenProvider from "~~/providers/TokenProvider";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import { darkerGrotesque, inter } from "~~/utils/fonts";

const localSubgraph = new HttpLink({
  uri: "http://localhost:8000/subgraphs/name/ghostffcode/token-legacy",
});

const optimismSubgraph = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/ghostffcode/token-legacy",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.split(operation => operation.getContext().clientName === "10", optimismSubgraph, localSubgraph),
  cache,
  connectToDevTools: true,
});

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
    <ApolloProvider client={client}>
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider theme={darkTheme()} chains={appChains.chains} avatar={BlockieAvatar}>
          <TokenProvider>
            <div className="flex flex-col min-h-screen">
              {/* <Header /> */}
              <main className={cn(inter.variable, darkerGrotesque.variable, "relative flex flex-col flex-1")}>
                <Component {...pageProps} />
              </main>
              {/* <Footer /> */}
            </div>
          </TokenProvider>

          <Toaster />
          <DevAccount />
          {/* <Toaster /> */}
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
};

export default ScaffoldEthApp;
