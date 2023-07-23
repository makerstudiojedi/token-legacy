import Image from "next/image";
import { useRouter } from "next/navigation";
import gesFeeSvg from "../../public/gas-fee.svg";
import homeBg from "../../public/home-bg.svg";
import walletSvg from "../../public/wallet.svg";
import walletConnectedSvg from "../../public/walletConnected.svg";
import walletNotConnectedSvg from "../../public/walletNotConnected.svg";
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import Icon from "~~/components/Icon";
import Logo from "~~/components/Logo/Logo";
import { Button } from "~~/components/ui/button";
import { useIsMounted } from "~~/hooks/useIsMounted";

const HomePage: NextPage = (): JSX.Element => {
  const { address } = useAccount();

  const isWalletConnected = isAddress(address as string);

  const { openAccountModal } = useAccountModal();

  const router = useRouter();

  const isMounted = useIsMounted();

  if (!isMounted) return <></>;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="container flex items-center justify-between pt-8">
        <Logo />

        {isWalletConnected && (
          <Button size={"icon"} variant={"icon"} onClick={openAccountModal}>
            <Icon title="logout" />
          </Button>
        )}
      </div>

      <div className="container py-24 flex-1">
        <div className="bg-backgroundLight rounded-3xl p-4 md:p-6 max-w-full md:max-w-md text-center mx-auto">
          <div className="mb-1">
            {isWalletConnected ? (
              <Image className="mx-auto" src={walletConnectedSvg} alt="wallet-connected" />
            ) : (
              <Image className="mx-auto" src={walletNotConnectedSvg} alt="wallet-not-connected" />
            )}
          </div>

          <h1 className="font-grotesque font-semibold text-white">Welcome</h1>

          <div className="px-3">
            {isWalletConnected ? (
              <h5>To start using TokenLegacy, you need to deploy your will.</h5>
            ) : (
              <h5>Connect wallet address to continue</h5>
            )}
          </div>

          <div className="mt-5">
            {isWalletConnected ? (
              <Button className="w-full" onClick={() => router.push("/token-legacy/wallet")}>
                <span>Deploy Will</span>

                <Image src={gesFeeSvg} alt="gas-fee" />
              </Button>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button className="w-full" onClick={openConnectModal}>
                    <span>Connect wallet</span>

                    <Image src={walletSvg} alt="wallet" />
                  </Button>
                )}
              </ConnectButton.Custom>
            )}
          </div>
        </div>
      </div>

      <div className="h-[180px] overflow-hidden">
        <Image src={homeBg} className="object-cover w-full h-full" alt="home-bg" />
      </div>
    </div>
  );
};

export default HomePage;
