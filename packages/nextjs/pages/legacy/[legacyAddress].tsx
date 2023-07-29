import { useRouter } from "next/router";
import type { NextPage } from "next";
import { AddToClipboard } from "~~/components/AddToClipboard";
import Icon from "~~/components/Icons";
import WalletLayout from "~~/components/Layout";
import { NFTCard } from "~~/components/NFTCard";
import { Token } from "~~/components/Token";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { shortenAddress } from "~~/utils/helpers";

const LegacyPage: NextPage = (): JSX.Element => {
  const router = useRouter();

  const address = (router.query.legacyAddress ?? "") as string;

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

          <div className="max-w-[400px] mx-auto mt-12">
            <div className="flex items-center gap-4">
              <div className="h-px bg-[#3F5876] flex-grow"></div>

              <p className="font-medium">Your Allocations</p>

              <div className="h-px bg-[#3F5876] flex-grow"></div>
            </div>

            <div className="bg-[#0B1827] rounded-2xl p-4 mt-5">
              <div className="space-y-3">
                <Token permissionGranted={false} />
                <Token permissionGranted={true} />
                <Token permissionGranted={false} />
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
              <div className="space-y-3">
                <Token permissionGranted={false} />
                <Token permissionGranted={true} />
                <Token permissionGranted={false} />
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

export default LegacyPage;
