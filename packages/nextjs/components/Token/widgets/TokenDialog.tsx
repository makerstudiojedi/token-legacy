import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ethereumIcon from "../../../public/ethereum.svg";
import AddressEditorDialog from "./AddressEditorDialog";
import { MaxUint256 } from "ethers";
import { isAddress } from "ethers";
import { getAddress } from "viem";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useToken,
  useWatchPendingTransactions,
} from "wagmi";
import { BeneficiariesList } from "~~/components/BeneficiariesList";
import { DonutChart } from "~~/components/DonutChart";
import Icon from "~~/components/Icons";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { useTokenAllocationsQuery } from "~~/gql/types.generated";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { shortenAddress } from "~~/utils/helpers";

interface TokenDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  token?: `0x${string}`;
}

const TokenDialog: React.FC<TokenDialogProps> = ({ open, token, onOpenChange }): JSX.Element => {
  const [isAddBeneficiaryDialogOpen, setIsAddBeneficiaryDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const { address: _loggedInUser } = useAccount();
  const loggedInUser = _loggedInUser as `0x${string}`;
  token = token as `0x${string}`;
  const legacyAddress = router.query.legacyAddress as `0x${string}`;

  const { data: legacyWithToken, refetch } = useTokenAllocationsQuery({
    variables: {
      legacy: legacyAddress?.toLowerCase(),
      token: token?.toLowerCase(),
    },
  });

  // TODO : Refetch subgraph data after every onchain interaction

  const legacyTokenData = (legacyWithToken?.legacy?.tokens || [])[0];

  const totalAllocation = legacyTokenData?.totalAllocation || 0;
  const totalUsersAllocated = legacyTokenData?.allocations?.length || 0;
  const legacyOwner = legacyWithToken?.legacy?.owner.address as `0x${string}`;

  const { data: tokenData } = useToken({
    address: token,
    enabled: isAddress(token),
  });

  const { data: tBalance } = useBalance({
    address: legacyOwner,
    token,
    enabled: isAddress(token) && isAddress(legacyOwner),
  });

  const { data: allowance, isLoading: isLoadingAllowance } = useContractRead({
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
    onBlockConfirmation: () => {
      // TODO : Have a way to wait till thegraph catches up
      return new Promise((res, rej) => {
        setTimeout(async () => {
          try {
            await refetch();
            res(null);
          } catch (error) {
            rej(error);
          }
        }, 5000);
      });
    },
  });

  const handleSaveUserAllocation = async (uAddress: `0x${string}`, amount?: number) => {
    await allocateTokenToUser({
      args: [uAddress, tokenData?.address, BigInt(amount || 0)],
    });
  };

  const permissionGranted = allowance ? (allowance as bigint) >= (tBalance?.value as bigint) : false;
  const isLegacyOwner = loggedInUser && legacyOwner ? getAddress(loggedInUser) === getAddress(legacyOwner) : false;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {!!allowance && (
          <>
            {permissionGranted ? (
              <DialogContent className="sm:max-w-[393px] flex flex-col gap-6">
                {tokenData && <Header name={tokenData.name} token={token} />}

                <div className="flex items-center justify-center gap-2">
                  {/* <Icon title="approximate" /> */}

                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-2xl">{tBalance?.symbol}</span>
                    <h2 className="text-white">{tBalance?.formatted}</h2>
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

                {(legacyTokenData?.allocations?.length || 0) > 0 && tokenData && tBalance && (
                  <BeneficiariesList
                    allocations={legacyTokenData?.allocations || []}
                    tokenData={tokenData}
                    balance={Number(tBalance?.formatted)}
                    leftOver={100 - totalAllocation}
                    isReadOnly={!isLegacyOwner}
                    onSave={handleSaveUserAllocation}
                  />
                )}

                {Number(totalAllocation) !== 100 && (
                  <DialogFooter>
                    <Button
                      className="w-full"
                      disabled={Number(totalAllocation) === 100}
                      onClick={() => setIsAddBeneficiaryDialogOpen(true)}
                    >
                      <Icon title="beneficiaries" />

                      <span>Add Beneficiary</span>
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
                    <span className="text-2xl">{tBalance?.symbol}</span>
                    <h2 className="text-white">{tBalance?.formatted}</h2>
                  </div>
                </div>

                <div className="p-4 bg-[#83E08C] rounded-[8px] flex items-start gap-2">
                  <Icon title="important" />

                  <div className="text-[#08121D]">
                    <span className="text-xl font-bold text-">Increase {tokenData?.symbol} allowance</span>
                    <p className="font-medium mt-3 text-sm">
                      A smart contract will like to connect to your wallet to allocate resources based on your settings.
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
