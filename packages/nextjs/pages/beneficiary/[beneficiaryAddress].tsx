import Image from "next/image";
import { useRouter } from "next/router";
import ethereumIcon from "../../public/ethereum.svg";
import type { NextPage } from "next";
import { AddToClipboard } from "~~/components/AddToClipboard";
import Icon from "~~/components/Icons";
import WalletLayout from "~~/components/Layout";
import { NFTCard } from "~~/components/NFTCard";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { shortenAddress } from "~~/utils/helpers";

const BeneficiaryPage: NextPage = (): JSX.Element => {
  const router = useRouter();

  const address = (router.query.beneficiaryAddress ?? "") as string;

  return (
    <WalletLayout>
      <div className="-mt-14 z-20 relative">
        <div className="">
          <div className="w-28 h-28 rounded-full mx-auto border-[4px] border-[#1B4A76]">
            <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <h3 className="font-grotesque font-bold">{shortenAddress(address)}</h3>

            <AddToClipboard text={address} copiedText="Token Address copied!">
              <Icon title="copy" />
            </AddToClipboard>
          </div>

          <div className="mt-6 flex items-center justify-center gap-[18px]">
            <p className="font-medium">Created by: </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E4069] rounded-[20px]">
              <span className="w-5 h-5 relative rounded-full overflow-hidden flex items-center gap-2">
                <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
              </span>

              <p className="text-[#7DA1CC]">emu.eth</p>
            </div>

            <p className="font-medium">Unlocks in</p>

            <div className="flex items-center gap-2">
              <Icon title="calendar" />
              <p className="font-medium">73000 days</p>
            </div>
          </div>

          <div className="max-w-[353px] mx-auto mt-12">
            <div className="flex items-center gap-4">
              <div className="h-px bg-[#3F5876] flex-grow"></div>

              <p className="font-medium">Your Allocations</p>

              <div className="h-px bg-[#3F5876] flex-grow"></div>
            </div>

            <div className="bg-[#0B1827] rounded-2xl p-4 mt-5">
              <div className="space-y-5">
                <TokenBeneficiary />
                <TokenBeneficiary />
                <TokenBeneficiary />
              </div>

              <div className="h-px w-full bg-[#273B53] my-8"></div>

              <div className="grid grid-cols-2 gap-6">
                <NFTCard readOnly />
                <NFTCard readOnly />
              </div>
            </div>

            {/* Other Allocations */}

            <div className="flex items-center gap-4 mt-10">
              <div className="h-px bg-[#3F5876] flex-grow"></div>
              <p className="font-medium">Other Allocations</p>
              <div className="h-px bg-[#3F5876] flex-grow"></div>
            </div>

            <div className="bg-[#0B1827] rounded-2xl p-4 mt-5">
              <div className="space-y-5">
                <TokenBeneficiary />
                <TokenBeneficiary />
                <TokenBeneficiary />
              </div>

              <div className="h-px w-full bg-[#273B53] my-8"></div>

              <div className="grid grid-cols-2 gap-6">
                <NFTCard readOnly />
                <NFTCard readOnly />
                <NFTCard readOnly />
                <NFTCard readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletLayout>
  );
};

export default BeneficiaryPage;

export const TokenBeneficiary = () => {
  return (
    <div className={"flex items-center justify-between"}>
      <div className="flex items-center gap-2">
        <span className="w-[42px] h-[42px] rounded-full bg-[#273B53] flex items-center justify-center">
          <Image src={ethereumIcon} alt="token-icon" />
        </span>

        <div>
          <p className="text-white font-bold">WETH</p>
          <h5 className="font-semibold text-[#3F5876]">0.000456 ETH</h5>
        </div>
      </div>

      <div className="text-right">
        <p className="text-white font-bold">$50000</p>
        <div className="text-[#3F5876] font-semibold flex items-center gap-2">
          <span className="flex items-center gap-[0.8px]">
            <Icon title="users" />

            <h5>5</h5>
          </span>

          <Icon title="line" />

          <h5>50% Left</h5>
        </div>
      </div>
    </div>
  );
};
