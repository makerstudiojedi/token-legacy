import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import avatar from "../../../public/avatar1.svg";
import DeleteBeneficiary from "./DeleteBeneficiary";
import { isAddress } from "viem";
import { useEnsName } from "wagmi";
import { FetchTokenResult } from "wagmi/dist/actions";
import { AddToClipboard } from "~~/components/AddToClipboard";
import { EditableField } from "~~/components/EditableField";
import Icon from "~~/components/Icons";
import AddressEditorDialog from "~~/components/Token/widgets/AddressEditorDialog";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { Slider } from "~~/components/ui/slider";
import { cn } from "~~/lib/utils";
import { shortenAddress } from "~~/utils/helpers";
import { AllocationType } from "../Beneficiary.types";

interface BeneficiaryDetailsProps {
  open: boolean;
  balance: number;
  onSave: (_address: `0x${string}`, amount?: number) => Promise<void>;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  address: `0x${string}`;
  tokenData: FetchTokenResult;
  allocation: AllocationType;
  tokenShare: number;
  remainingShare: number;
}

const BeneficiaryDetails: React.FC<BeneficiaryDetailsProps> = ({
  open,
  onSave,
  balance,
  onOpenChange,
  address,
  tokenData,
  tokenShare,
  allocation,
  remainingShare,
}): JSX.Element => {
  const [isAddressEditorDialogOpen, setIsAddressEditorDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [allotedShare, setAllotedShare] = useState<number>(tokenShare);

  const { data: ensName } = useEnsName({
    address,
    enabled: isAddress(address),
    chainId: 1,
  });

  const dialogChangeHandler = (open: boolean) => {
    if (open === false) {
      setIsEditing(false);
    }

    onOpenChange(open);
  };

  const onAddressEditorSaveHandler = async () => {
    setIsAddressEditorDialogOpen(false);
    setIsEditing(false);
  };

  const onEditSaveHandler = async (_address: `0x${string}`, amount?: number) => {
    // TODO : Handle tx for user
    await onSave(_address, amount === undefined ? allotedShare : amount);
    onOpenChange(false);
    setIsEditing(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={open => dialogChangeHandler(open)}>
        <DialogContent className="sm:max-w-[393px] gap-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center">
                <span
                  className={cn(
                    "h-10 w-10 flex items-center justify-center cursor-pointer hover:opacity-70 transition",
                    isEditing ? "visible" : "invisible",
                  )}
                  onClick={() => setIsEditing(false)}
                >
                  <Icon title="chevron-left" />
                </span>

                <div className="flex items-center justify-center gap-2 flex-1">
                  <Icon title="beneficiaries-blue" />

                  <h4 className="text-white font-semibold font-grotesque -mt-1">Beneficiary</h4>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="h-[80px] overflow-hidden absolute left-0 top-[5.5rem] block">
            <Image src={addBeneficiaryBg} className="object-cover w-full h-full" alt="add-beneficiary-bg" />
          </div>

          <div className="h-28 w-28 bg-[#143B5F] flex items-center justify-center mx-auto rounded-full relative mt-12">
            <Image src={avatar} className="object-cover w-full h-full" alt="avatar" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <h3 className="font-bold">{ensName ?? "- -"}</h3>
            <AddToClipboard text={address} copiedText="ENS copied">
              <Icon title="copy-purple" />
            </AddToClipboard>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h5 className="text-[#7DA1CC]">{shortenAddress(address)}</h5>

            {/* {isEditing && (
              <Icon
                className="cursor-pointer hover:opacity-70 transition"
                title="edit"
                onClick={() => setIsAddressEditorDialogOpen(true)}
              />
            )} */}
          </div>

          <div className="relative">
            <div className="h-[1px] bg-[#273B53] w-full"></div>
            <span className="text-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-5">
              Alloted share
            </span>
          </div>

          <div className="mt-2">
            <div className={cn("rounded-[10px] bg-backgroundDarker", isEditing ? "px-3 pt-3 pb-6" : "p-3")}>
              {isEditing ? (
                <EditableField
                  onValueChange={setAllotedShare}
                  value={allotedShare}
                  max={remainingShare + Number(tokenShare)}
                />
              ) : (
                <div className="flex items-center justify-center py-5 rounded bg-backgroundDark">
                  <h3 className="font-bold">{allotedShare}%</h3>
                </div>
              )}

              {isEditing && (
                <Slider
                  className="mt-5"
                  value={[allotedShare]}
                  onValueChange={value => setAllotedShare(value[0])}
                  max={remainingShare + Number(tokenShare)}
                  step={1}
                />
              )}
            </div>

            <div className="flex items-center justify-center font-bold gap-1 mt-2 text-[#FFC93F]">
              <Icon title="star" />

              <h6>
                You have {remainingShare + Number(tokenShare) - allotedShare}% {tokenData?.symbol} combined to allocate
              </h6>
            </div>
          </div>

          <DialogFooter className="overflow-hidden mt-5">
            {isEditing ? (
              <Button className="w-full" onClick={async () => await onEditSaveHandler(address)}>
                Save
              </Button>
            ) : (
              <div className="w-full grid grid-cols-5 gap-14">
                <Button
                  className="bg-[#273B53] border-white hover:bg-backgroundDark"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Icon title="delete" className="flex-shrink-0" />
                </Button>

                <Button className="col-span-4" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddressEditorDialog
        open={isAddressEditorDialogOpen}
        onOpenChange={setIsAddressEditorDialogOpen}
        onSave={onAddressEditorSaveHandler}
        tokenData={tokenData}
        leftOver={remainingShare}
      />

      <DeleteBeneficiary
        tokenData={tokenData}
        allocation={allocation}
        open={isDeleteDialogOpen}
        balance={balance}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => onEditSaveHandler(address, 0)}
      />
    </>
  );
};

export default BeneficiaryDetails;
