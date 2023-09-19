import { useRouter } from "next/router";
import { formatDistance, isBefore } from "date-fns";
import type { NextPage } from "next";
import { getAddress, isAddress, zeroAddress } from "viem";
import { useAccount, useEnsName } from "wagmi";
import { AddToClipboard } from "~~/components/AddToClipboard";
import Icon from "~~/components/Icons";
import WalletLayout from "~~/components/Layout";
import { NFTCard } from "~~/components/NFTCard";
import { Token, TokenAllocation } from "~~/components/Token";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useFetchLegacyQuery, useMyAllocationsQuery } from "~~/gql/types.generated";
import { useGraphMeta } from "~~/hooks/useGraphMeta";
import { shortenAddress } from "~~/utils/helpers";

const LegacyPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { address } = useAccount();

  const legacyAddress = ((router.query.legacyAddress ?? "") as string).toLowerCase();

  const {
    data: legacyData,
    loading,
    refetch,
  } = useFetchLegacyQuery({
    variables: {
      address: legacyAddress.toLowerCase(),
    },
  });

  const { data: myAllocations } = useMyAllocationsQuery({
    variables: {
      myAddress: ((address as string) || "").toLowerCase(),
      legacy: legacyAddress,
    },
  });

  useGraphMeta(refetch);

  const unlocksAt = (legacyData?.legacy?.unlocksAt ?? 0) * 1000;
  const unlocked = isBefore(new Date(unlocksAt), Date.now());
  const ownerAddress = (legacyData?.legacy?.owner.id as `0x${string}`) ?? "";
  const isLegacyOwner =
    !loading &&
    getAddress((address as `0x${string}`) || zeroAddress) ===
      getAddress((legacyData?.legacy?.owner.id as `0x${string}`) || zeroAddress);
  const tokenList = legacyData?.legacy?.tokens;

  const { data: ownerEns } = useEnsName({
    address: ownerAddress,
    enabled: isAddress(ownerAddress),
    chainId: 1,
  });

  const ownerDisplay = ownerEns || shortenAddress(ownerAddress);

  return (
    <WalletLayout>
      <div className="-mt-14 z-20 relative">
        <div className="">
          <div className="w-28 h-28 rounded-full mx-auto border-[4px] border-[#1B4A76]">
            <BlockieAvatar address={legacyAddress} size={200} className="object-cover w-full h-full blockie-avatar" />
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <h3 className="font-grotesque font-bold">{shortenAddress(legacyAddress)}</h3>

            <AddToClipboard text={legacyAddress} copiedText="Token Address copied!">
              <Icon title="copy" />
            </AddToClipboard>
          </div>

          <div className="mt-6 flex items-center justify-center gap-[18px]">
            <p className="font-medium">Created by: </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E4069] rounded-[20px]">
              <span className="w-5 h-5 relative rounded-full overflow-hidden flex items-center gap-2">
                <BlockieAvatar
                  address={ownerAddress}
                  size={200}
                  className="object-cover w-full h-full blockie-avatar"
                />
              </span>

              <p className="text-[#7DA1CC]">{ownerDisplay}</p>
            </div>

            <p className="font-medium">{unlocked ? "Unlocked" : "Unlocks"}</p>

            <div className="flex items-center gap-2">
              <Icon title="calendar" />
              <p className="font-medium">{formatDistance(new Date(unlocksAt), Date.now(), { addSuffix: true })}</p>
            </div>
          </div>

          <div className="max-w-[400px] mx-auto mt-12">
            {isLegacyOwner && (
              <>
                <div className="flex items-center gap-4 px-1">
                  <div className="h-px bg-[#3F5876] flex-grow"></div>
                  <p className="font-medium">Your Tokens</p>
                  <div className="h-px bg-[#3F5876] flex-grow"></div>
                </div>
                <div className="bg-[#0B1827] rounded-2xl p-4 mt-5">
                  <div className="space-y-3">
                    {tokenList?.map(tokenItem => (
                      <Token
                        token={tokenItem}
                        key={tokenItem.id}
                        owner={ownerAddress}
                        legacy={legacyAddress as `0x${string}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Your Allocations */}
            {(myAllocations?.allocations.length || 0) > 0 && (
              <>
                <div className="flex items-center gap-4">
                  <div className="h-px bg-[#3F5876] flex-grow"></div>

                  <p className="font-medium">Your Allocations</p>

                  <div className="h-px bg-[#3F5876] flex-grow"></div>
                </div>

                <div className="bg-[#0B1827] rounded-2xl p-4 mt-5">
                  <div className="space-y-3">
                    {myAllocations?.allocations.map(allocation => (
                      <TokenAllocation
                        key={allocation.id}
                        unlocked={unlocked}
                        owner={ownerAddress}
                        legacy={legacyAddress as `0x${string}`}
                        allocation={allocation}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Other Allocations */}

            {/* <div className="flex items-center gap-4 mt-10">
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
            </div> */}
          </div>
        </div>
      </div>
    </WalletLayout>
  );
};

export default LegacyPage;
