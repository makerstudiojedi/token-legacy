import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import homeBg from "../public/home-bg.svg";
import walletSvg from "../public/wallet.svg";
import walletConnectedSvg from "../public/walletConnected.svg";
import walletNotConnectedSvg from "../public/walletNotConnected.svg";
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
// import gesFeeSvg from "../public/gas-fee.svg";
import { decodeEventLog, isAddress, parseAbi, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import Icon from "~~/components/Icons";
import IsMountedWrapper from "~~/components/IsMountedWrapper";
import Logo from "~~/components/Logo/Logo";
import { Button } from "~~/components/ui/button";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const HomePage: NextPage = (): JSX.Element => {
  const { address } = useAccount();

  const isWalletConnected = isAddress(address as string);

  const { openAccountModal } = useAccountModal();

  const router = useRouter();

  // create a new legacy contract using Factory contract
  const { writeAsync: createLegacy } = useScaffoldContractWrite({
    contractName: "LegacyFactory",
    functionName: "createLegacy",
    value: "0",
    onBlockConfirmation(txnReceipt) {
      // interact with the transaction receipt
      const [legacyEvent] = txnReceipt.logs;

      // decode event log from transaction
      const { args } = decodeEventLog({
        abi: parseAbi(["event LegacyCreated(address indexed owner, address indexed legacy)"]),
        data: legacyEvent.data,
        topics: legacyEvent.topics,
      }) as { eventName: string; args: { legacy: string; owner: string } };

      if (args) {
        // use legacy event to load the legacy page
        router.push(`/legacy/${args.legacy}`);
      }
    },
  });

  // read legacyAddress from contract
  const { data: legacyAddress } = useScaffoldContractRead({
    contractName: "LegacyFactory",
    functionName: "userWill",
    args: [address ?? ""],
    enabled: isAddress(address ?? ""),
  });

  useEffect(() => {
    // TODO : Set loading status here as well
    if (isAddress(legacyAddress as string) && legacyAddress !== zeroAddress) {
      router.push(`/legacy/${legacyAddress}`);
    }
  }, [legacyAddress, router]);

  return (
    <IsMountedWrapper>
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
                <Button className="w-full" onClick={() => createLegacy()}>
                  <span>Deploy Will</span>

                  {/* <Image src={gesFeeSvg} alt="gas-fee" /> */}
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
    </IsMountedWrapper>
  );
};

export default HomePage;
