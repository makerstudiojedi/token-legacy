import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import avatar from "../../../public/avatar1.svg";
import { isAddress } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { FetchTokenResult } from "wagmi/dist/actions";
import { AddToClipboard } from "~~/components/AddToClipboard";
import { EditableField } from "~~/components/EditableField";
import Icon from "~~/components/Icons";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { Slider } from "~~/components/ui/slider";
import { shortenAddress } from "~~/utils/helpers";

interface LoadAddressProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSave?: (_share?: number) => Promise<void>;
  onClose?: () => void;
  address: `0x${string}`;
  allotShare?: boolean;
  tokenShare: number;
  remainingShare: number;
  tokenData: FetchTokenResult;
}

const LoadAddress: React.FC<LoadAddressProps> = ({
  open,
  onOpenChange,
  onSave,
  onClose,
  address,
  allotShare = true,
  tokenShare,
  remainingShare,
  tokenData,
}): JSX.Element => {
  const [allotedShare, setAllotedShare] = useState<number>(tokenShare);

  const { data: ensName } = useEnsName({
    address,
    enabled: isAddress(address),
    chainId: 1,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
    chainId: 1,
  });

  const onSavehandler = async () => {
    if (onSave) {
      await onSave(allotedShare);
    }

    onOpenChange(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    // if (isLoading) return null

    if (open === false && onClose) {
      onClose();
    }

    onOpenChange(open);
  };

  useEffect(() => {
    setAllotedShare(tokenShare);
  }, [address, tokenShare]);

  return (
    <Dialog open={open} onOpenChange={open => handleDialogOpenChange(open)}>
      <DialogContent className="sm:max-w-[393px] gap-4">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-center gap-2">
              <Icon title="beneficiaries-blue" />

              <h4 className="text-white font-semibold font-grotesque -mt-1">Beneficiary</h4>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="h-[80px] overflow-hidden absolute left-0 top-[5.5rem] block">
          <Image src={addBeneficiaryBg} className="object-cover w-full h-full" alt="add-beneficiary-bg" />
        </div>

        <div className="h-28 w-28 bg-[#143B5F] flex items-center justify-center mx-auto rounded-full relative mt-12 overflow-hidden">
          <Image src={ensAvatar || avatar} fill className="object-cover w-full h-full" alt="avatar" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <h3 className="font-bold">{ensName ?? "- -"}</h3>

          <AddToClipboard text={address} copiedText="ENS copied">
            <Icon title="copy" />
          </AddToClipboard>
        </div>

        <div className="flex items-center justify-center">
          <h5 className="text-[#7DA1CC]">{shortenAddress(address)}</h5>
        </div>

        <div className="relative">
          <div className="h-[1px] bg-[#273B53] w-full"></div>
          <span className="text-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-5">
            Alloted share
          </span>
        </div>

        <div className="mt-2">
          <div className="rounded-[10px] p-3 bg-backgroundDarker">
            {allotShare ? (
              <EditableField onValueChange={setAllotedShare} value={allotedShare} max={remainingShare} />
            ) : (
              <div className="flex items-center justify-center py-5 rounded bg-backgroundDark">
                <h3 className="font-bold">{allotedShare}%</h3>
              </div>
            )}

            {allotShare && (
              <Slider
                className="mt-5"
                value={[allotedShare]}
                onValueChange={value => setAllotedShare(value[0])}
                max={remainingShare}
                step={1}
              />
            )}
          </div>

          <div className="flex items-center justify-center font-bold gap-1 mt-2 text-[#FFC93F]">
            <Icon title="star" />

            <h6>
              You have {remainingShare - allotedShare}% {tokenData?.symbol} left to allocate
            </h6>
          </div>
        </div>

        <DialogFooter className="mt-5">
          <Button className="w-full" onClick={onSavehandler}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoadAddress;
