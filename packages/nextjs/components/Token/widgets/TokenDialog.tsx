import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ethereumIcon from "../../../public/ethereum.svg";
import AddressEditorDialog from "./AddressEditorDialog";
import { isBefore } from "date-fns";
import { MaxUint256, isAddress } from "ethers";
import { formatUnits, getAddress } from "viem";
import { erc20ABI, useAccount, useContractRead, useContractWrite, useToken } from "wagmi";
import { BeneficiariesList } from "~~/components/BeneficiariesList";
import { DonutChart } from "~~/components/DonutChart";
import Icon from "~~/components/Icons";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { useTokenAllocationsQuery } from "~~/gql/types.generated";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useGraphMeta } from "~~/hooks/useGraphMeta";
import { useGraphStore } from "~~/services/store/graphstore";
import { shortenAddress, shortenNumber } from "~~/utils/helpers";

interface TokenDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  token?: `0x${string}`;
}

const TokenDialog: React.FC<TokenDialogProps> = ({ open, token, onOpenChange }): JSX.Element => {
  const [isAddBeneficiaryDialogOpen, setIsAddBeneficiaryDialogOpen] = useState<boolean>(false);
  const [setLatestActionBlock] = useGraphStore(state => [state.setLatestActionBlock]);
  const router = useRouter();
  const { address: _loggedInUser } = useAccount();
  const loggedInUser = _loggedInUser as `0x${string}`;
  token = token as `0x${string}`;
  const legacyAddress = router.query.legacyAddress as `0x${string}`;

  const { data: legacyWithToken, refetch } = useTokenAllocationsQuery({
    variables: {
      legacy: legacyAddress?.toLowerCase(),
      token: token?.toLowerCase(),
      beneficiary: loggedInUser?.toLowerCase(),
    },
  });

  // TODO : Refetch subgraph data after every onchain interaction
  useGraphMeta(refetch);

  const legacyTokenData = (legacyWithToken?.legacy?.tokens || [])[0];

  const unlocksAt = (legacyWithToken?.legacy?.unlocksAt ?? 0) * 1000;
  const unlocked = isBefore(new Date(unlocksAt), Date.now());

  const totalAllocation = legacyTokenData?.totalAllocation || 0;
  const totalUsersAllocated = legacyTokenData?.allocations?.length || 0;
  const legacyOwner = legacyWithToken?.legacy?.owner.address as `0x${string}`;

  const { data: tokenData } = useToken({
    address: token,
    enabled: isAddress(token),
  });

  const { data: tBalance } = useScaffoldContractRead({
    contractName: "LegacyImplementation",
    functionName: "getTokenBalance",
    address: legacyAddress,
    args: [token],
    enabled: isAddress(legacyOwner) && isAddress(token),
  });

  const formattedBalance =
    tBalance && tokenData?.decimals ? Number(formatUnits(tBalance, Number(tokenData.decimals))) : 0;

  const { data: allowance } = useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [legacyOwner, legacyAddress],
    enabled: isAddress(legacyOwner),
    watch: true,
  });

  const { write: increaseAllowance, isLoading: isIncreaseTxLoading } = useContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: "approve",
    args: [legacyAddress, MaxUint256],
  });

  const { writeAsync: allocateTokenToUser } = useScaffoldContractWrite({
    contractName: "LegacyImplementation",
    functionName: "willToken",
    address: router.query.legacyAddress as `0x${string}`,
    args: ["", tokenData?.address, 0n],
    onBlockConfirmation: async txReceipt => {
      setLatestActionBlock(Number(txReceipt.blockNumber));
    },
  });
  const { writeAsync: sendWithdrawalTransaction } = useScaffoldContractWrite({
    contractName: "LegacyImplementation",
    functionName: "withdraw",
    address: router.query.legacyAddress as `0x${string}`,
    args: ["" as `0x${string}`],
    onBlockConfirmation: async txReceipt => {
      setLatestActionBlock(Number(txReceipt.blockNumber));
    },
  });

  const permissionGranted =
    allowance !== undefined ? allowance !== 0n && (allowance as bigint) >= (tBalance as bigint) : undefined;
  const isLegacyOwner = loggedInUser && legacyOwner ? getAddress(loggedInUser) === getAddress(legacyOwner) : false;
  const isBeneficiary = (legacyWithToken?.allocations.length || 0) > 0;

  const handleAllocationWithdrawal = async () => {
    await sendWithdrawalTransaction({
      args: [token as `0x${string}`],
    });
  };

  const handleSaveUserAllocation = async (uAddress: `0x${string}`, amount?: number) => {
    await allocateTokenToUser({
      args: [uAddress, tokenData?.address, BigInt(amount || 0)],
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {permissionGranted !== undefined && (
          <>
            {permissionGranted ? (
              <DialogContent className="sm:max-w-[393px] flex flex-col gap-6">
                {tokenData && <Header name={tokenData.name} token={token} />}

                <div className="flex items-center justify-center gap-2">
                  {/* <Icon title="approximate" /> */}

                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-2xl">{tokenData?.symbol}</span>
                    <h2 className="text-white">{shortenNumber(formattedBalance)}</h2>
                  </div>
                </div>

                <DonutChart className="mx-auto flex-shrink-0" width={160} height={160} allocated={totalAllocation} />

                <div className="text-[#3F5876] font-semibold flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <Icon title="users" width={21} height={20} />

                    <p>{totalUsersAllocated}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="block bg-primary h-[10px] w-[10px] rounded-full flex-shrink-0"></span>

                    <p>{totalAllocation}% Allocated</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="block bg-[#FFE3D4] h-[10px] w-[10px] rounded-full flex-shrink-0"></span>

                    <p>{100 - totalAllocation}% Left</p>
                  </div>
                </div>

                {(legacyTokenData?.allocations?.length || 0) > 0 && tokenData && formattedBalance !== undefined && (
                  <BeneficiariesList
                    allocations={legacyTokenData?.allocations || []}
                    tokenData={tokenData}
                    balance={formattedBalance}
                    leftOver={100 - totalAllocation}
                    isReadOnly={!isLegacyOwner}
                    onSave={handleSaveUserAllocation}
                  />
                )}

                {((isLegacyOwner && Number(totalAllocation) !== 100) ||
                  !((isBeneficiary && legacyWithToken?.allocations[0]) || {}).withdrawn) && (
                  <DialogFooter>
                    <Button
                      className="w-full"
                      disabled={(isLegacyOwner && Number(totalAllocation) === 100) || (isBeneficiary && !unlocked)}
                      onClick={async () => {
                        if (isLegacyOwner) {
                          setIsAddBeneficiaryDialogOpen(true);
                        } else {
                          await handleAllocationWithdrawal();
                        }
                      }}
                    >
                      {isLegacyOwner ? (
                        <>
                          <Icon title="beneficiaries" />
                          <span>Add Beneficiary</span>
                        </>
                      ) : (
                        <span>{unlocked ? "Withdraw Allocation" : "Withdrawals not available yet"}</span>
                      )}
                    </Button>
                  </DialogFooter>
                )}
              </DialogContent>
            ) : (
              <DialogContent className="sm:max-w-[393px]">
                {tokenData && <Header name={tokenData.name} token={token} />}

                <div className="flex items-center justify-center gap-2">
                  {/* <Icon title="approximate" /> */}

                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-2xl">{tokenData?.symbol}</span>
                    <h2 className="text-white">{shortenNumber(formattedBalance)}</h2>
                  </div>
                </div>

                <div className="p-4 bg-[#83E08C] rounded-[8px] flex items-start gap-2">
                  <Icon title="important" />

                  <div className="text-[#08121D]">
                    <span className="text-xl font-bold text-">Increase {tokenData?.symbol} allowance</span>
                    <p className="font-medium mt-3 text-sm">
                      Your legacy needs to be able to interact with your {tokenData?.symbol} contract balance. For this,
                      it requires an allowance. Please set your token allowance to continue with this token.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full" loading={isIncreaseTxLoading} onClick={() => increaseAllowance()}>
                    Increase Allowance
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
          </>
        )}
      </Dialog>

      <AddressEditorDialog
        open={isAddBeneficiaryDialogOpen}
        tokenData={tokenData}
        leftOver={100 - totalAllocation}
        allotShare={isLegacyOwner}
        onOpenChange={setIsAddBeneficiaryDialogOpen}
        onSave={handleSaveUserAllocation}
      />
    </>
  );
};

const Header = ({ name, token }: { name: string; token: `0x${string}` }) => (
  <DialogHeader>
    <DialogTitle>
      <div className="flex items-center gap-2">
        <span className="w-[42px] h-[42px] rounded-full bg-[#273B53] flex items-center justify-center">
          <Image src={ethereumIcon} alt="token-icon" />
        </span>

        <div>
          <p className="text-white font-bold">{name}</p>
          <h5 className="font-semibold text-[#3F5876]">{shortenAddress(token)}</h5>
        </div>
      </div>
    </DialogTitle>
  </DialogHeader>
);

export default TokenDialog;
