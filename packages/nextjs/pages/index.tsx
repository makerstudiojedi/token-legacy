import Image from "next/image";
import { useRouter } from "next/navigation";
import homeBg from "../public/home-bg.svg";
import walletSvg from "../public/wallet.svg";
import walletConnectedSvg from "../public/walletConnected.svg";
import walletNotConnectedSvg from "../public/walletNotConnected.svg";
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import { formatDistanceToNow } from "date-fns";
import type { NextPage } from "next";
import { isAddress, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { AddressBadge } from "~~/components/AddressBadge";
import Icon from "~~/components/Icons";
import IsMountedWrapper from "~~/components/IsMountedWrapper";
import Logo from "~~/components/Logo/Logo";
import { ToolTip } from "~~/components/ToolTip";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { useFetchLegacyQuery } from "~~/gql/types.generated";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";
import { legacyUnlockDateCheck, legacyUnlockDateCheckStatus, shortenAddress } from "~~/utils/helpers";

const HomePage: NextPage = (): JSX.Element => {
  const { address } = useAccount();

  const isWalletConnected = isAddress(address as string);

  const { openAccountModal } = useAccountModal();

  // create a new legacy contract using Factory contract
  const { writeAsync: createLegacy } = useScaffoldContractWrite({
    contractName: "LegacyFactory",
    functionName: "createLegacy",
    value: "0",
  });

  // read legacyAddress from contract
  const { data: legacyAddress } = useScaffoldContractRead({
    contractName: "LegacyFactory",
    functionName: "userWill",
    args: [address ?? ""],
    enabled: isAddress(address ?? ""),
  });

  const isExistingWill = legacyAddress !== zeroAddress;

  return (
    <IsMountedWrapper>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="container flex items-center justify-between pt-8">
          <Logo />

          {isWalletConnected && <AddressBadge address={address ?? ""} onClick={openAccountModal} />}
        </div>

        <div className="container py-24 flex-1">
          <div className="bg-backgroundLight rounded-3xl p-4 md:p-8 max-w-full md:max-w-[490px] text-center mx-auto">
            <div className="mb-1">
              {isWalletConnected ? (
                <Image className="mx-auto" src={walletConnectedSvg} alt="wallet-connected" />
              ) : (
                <Image className="mx-auto" src={walletNotConnectedSvg} alt="wallet-not-connected" />
              )}
            </div>

            <h1 className="font-grotesque font-semibold text-white">Welcome</h1>

            <div className="px-3 mt-1">
              {isWalletConnected ? (
                <h5>
                  {isExistingWill
                    ? "Below is your deployed will."
                    : "To start using TokenLegacy, you need to deploy your will."}
                </h5>
              ) : (
                <h5>Connect wallet address to continue</h5>
              )}
            </div>

            <div className="mt-7">
              {!isWalletConnected ? (
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <Button className="w-full" onClick={openConnectModal}>
                      <span>Connect wallet</span>

                      <Image src={walletSvg} alt="wallet" />
                    </Button>
                  )}
                </ConnectButton.Custom>
              ) : (
                <>
                  {isExistingWill ? (
                    <>
                      {legacyAddress && (
                        <div className="rounded-2xl p-3 bg-backgroundDark mt-7 mb-4">
                          <BenefactorCard legacyAddress={legacyAddress} />
                        </div>
                      )}
                    </>
                  ) : (
                    <Button className="w-full" onClick={() => createLegacy()}>
                      <span>Deploy Will</span>
                    </Button>
                  )}

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="h-px flex-grow bg-[#3F5876]"></div>
                      <p className="text-sm font-semibold">You are a beneficiary to</p>
                      <div className="h-px flex-grow bg-[#3F5876]"></div>
                    </div>

                    <div className="rounded-2xl p-3 bg-backgroundDark mt-4 space-y-3">
                      <BeneficiaryCard address={address ?? ""} />
                      <BeneficiaryCard address={address ?? ""} />
                      <BeneficiaryCard address={address ?? ""} />
                    </div>
                  </div>
                </>
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

export const BeneficiaryCard = ({ address }: { address: string }) => {
  const router = useRouter();
  return (
    <div className="bg-[#1E4069] rounded-[10px] p-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full block relative">
          <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
        </span>

        <p className="text-sm font-bold">{shortenAddress(address)}</p>
      </div>

      <div className="flex items-center gap-1">
        <Icon className="flex-shrink-0" title="diamond" />
        <p className="text-sm font-bold">4 Tokens</p>
      </div>

      <div className="flex items-center gap-1">
        <Icon className="flex-shrink-0" title="calendar" />
        <p className="text-sm font-bold">30 days</p>
      </div>

      <ToolTip text="View will">
        <span
          role="link"
          className={cn(
            "w-5 h-5 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition [&>svg]:fill-foreground mt-1",
          )}
          onClick={() => router.push(`/legacy/${address}`)}
        >
          <Icon className="flex-shrink-0" title="arrow-up-right" width={14} height={14} />
        </span>
      </ToolTip>
    </div>
  );
};

export const BenefactorCard = ({ legacyAddress }: { legacyAddress: string }) => {
  const router = useRouter();

  // handle loading data for this legacy here
  const { data } = useFetchLegacyQuery({
    variables: {
      address: legacyAddress.toLowerCase(),
    },
  });

  const legacy = data?.legacy;

  const totalTokens = legacy?.tokens?.length;

  const unlocksAt = Number(legacy?.unlocksAt ?? 0) * 1000;

  const legacyDateCheck = legacyUnlockDateCheck(unlocksAt) as legacyUnlockDateCheckStatus;

  let isWithdrawalDateClose;

  if (legacyDateCheck === legacyUnlockDateCheckStatus.DateClose) {
    isWithdrawalDateClose = true;
  }

  if (legacyDateCheck === legacyUnlockDateCheckStatus.DateNotClose) {
    isWithdrawalDateClose = false;
  }

  return (
    <div className="bg-[#1E4069] rounded-[10px] p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        <Icon className="flex-shrink-0" title="diamond" />

        <p className="text-sm font-bold">
          {totalTokens} Token{totalTokens === 1 ? "" : "s"}
        </p>
      </div>

      {unlocksAt !== 0 && (
        <div className="flex items-center gap-1">
          <Icon className="flex-shrink-0" title="calendar" />

          <p className="text-sm font-bold">
            {formatDistanceToNow(unlocksAt, {
              addSuffix: true,
            })}
          </p>
        </div>
      )}

      <div className="flex items-center gap-5">
        {legacyDateCheck === legacyUnlockDateCheckStatus.NotSet ? (
          <ToolTip text="No unlock date has been set. Any allocation can be withdrawn by set beneficiaries immediately">
            <span
              className={
                "w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition bg-red-700/30"
              }
              onClick={() => router.push("/legacy/release-date")}
            >
              <Icon className="flex-shrink-0 [&_path]:fill-red-400" title="stop-watch" width={16} height={16} />
            </span>
          </ToolTip>
        ) : (
          <ToolTip text="Extend unlock date">
            <span
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition",
                isWithdrawalDateClose ? "bg-[#45350D]" : "bg-backgroundDark",
              )}
              onClick={() => router.push("/legacy/release-date")}
            >
              {isWithdrawalDateClose ? (
                <Icon className="flex-shrink-0" title="stop-watch-warning" width={16} height={16} />
              ) : (
                <Icon className="flex-shrink-0" title="stop-watch" width={16} height={16} />
              )}
            </span>
          </ToolTip>
        )}

        <ToolTip text="View will">
          <span
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition [&>svg]:fill-foreground mt-1",
            )}
            onClick={() => router.push(`/legacy/${legacyAddress}`)}
          >
            <Icon className="flex-shrink-0" title="arrow-up-right" width={14} height={14} />
          </span>
        </ToolTip>
      </div>
    </div>
  );
};
