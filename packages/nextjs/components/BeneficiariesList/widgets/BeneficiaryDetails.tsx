import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import avatar from "../../../public/avatar1.svg";
import DeleteBeneficiary from "./DeleteBeneficiary";
import { AddToClipboard } from "~~/components/AddToClipboard";
import { EditableField } from "~~/components/EditableField";
import AddressEditorDialog from "~~/components/Token/widgets/AddressEditorDialog";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { Slider } from "~~/components/ui/slider";
import { cn } from "~~/lib/utils";
import { shortenAddress } from "~~/utils/helpers";

interface BeneficiaryDetailsProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  tokenShare: number;
  remainingShare: number;
}

const BeneficiaryDetails: React.FC<BeneficiaryDetailsProps> = ({
  open,
  onOpenChange,
  tokenShare,
  remainingShare,
}): JSX.Element => {
  const [isAddressEditorDialogOpen, setIsAddressEditorDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [allotedShare, setAllotedShare] = useState<number>(tokenShare);
  const address = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  const dialogChangeHandler = (open: boolean) => {
    if (open === false) {
      setIsEditing(false);
    }

    onOpenChange(open);
  };

  const onAddressEditorSaveHandler = () => {
    setIsAddressEditorDialogOpen(false);
    setIsEditing(false);
  };

  const onEditSaveHandler = () => {
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </span>

                <div className="flex items-center justify-center gap-2 flex-1">
                  <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.5 19.748V16.4C10.5 15.1174 11.4948 14.1076 12.9667 13.5321C12.0431 13.188 11.0435 13 10 13C8.11013 13 6.36432 13.6168 4.95286 14.66C5.83199 17.1544 7.91273 19.082 10.5 19.748ZM19.3794 16.0859C18.9862 15.5526 17.6708 15 16 15C13.9939 15 12.5 15.7967 12.5 16.4V20C15.4255 20 17.9843 18.4296 19.3794 16.0859ZM10.05 11.5C11.2926 11.5 12.3 10.4926 12.3 9.25C12.3 8.00736 11.2926 7 10.05 7C8.80736 7 7.8 8.00736 7.8 9.25C7.8 10.4926 8.80736 11.5 10.05 11.5ZM16 12.5C17.1046 12.5 18 11.6046 18 10.5C18 9.39543 17.1046 8.5 16 8.5C14.8954 8.5 14 9.39543 14 10.5C14 11.6046 14.8954 12.5 16 12.5ZM12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22Z"
                      fill="#3F5876"
                    />
                  </svg>

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
            <h3 className="font-bold">emu.eth</h3>
            <AddToClipboard text="emu.eth" copiedText="ENS copied">
              <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33317 5V2.5C6.33317 2.03976 6.70627 1.66666 7.1665 1.66666H17.1665C17.6267 1.66666 17.9998 2.03976 17.9998 2.5V14.1667C17.9998 14.6269 17.6267 15 17.1665 15H14.6665V17.4992C14.6665 17.9599 14.2916 18.3333 13.8275 18.3333H3.83888C3.37549 18.3333 3 17.9628 3 17.4992L3.00217 5.83406C3.00225 5.37342 3.3772 5 3.84118 5H6.33317ZM7.99983 5H14.6665V13.3333H16.3332V3.33333H7.99983V5Z"
                  fill="#AC43FF"
                />
              </svg>
            </AddToClipboard>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h5 className="text-[#7DA1CC]">{shortenAddress(address)}</h5>

            {isEditing && (
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer hover:opacity-70 transition"
                onClick={() => setIsAddressEditorDialogOpen(true)}
              >
                <path
                  d="M17.7586 5.73214L14.268 2.24073C14.1519 2.12463 14.0141 2.03253 13.8624 1.96969C13.7107 1.90685 13.5482 1.87451 13.384 1.87451C13.2198 1.87451 13.0572 1.90685 12.9056 1.96969C12.7539 2.03253 12.6161 2.12463 12.5 2.24073L2.86641 11.8751C2.74983 11.9908 2.65741 12.1284 2.59451 12.2801C2.5316 12.4318 2.49948 12.5945 2.50001 12.7587V16.2501C2.50001 16.5816 2.6317 16.8996 2.86612 17.134C3.10054 17.3684 3.41849 17.5001 3.75001 17.5001H7.24141C7.40563 17.5006 7.5683 17.4685 7.71999 17.4056C7.87168 17.3427 8.00935 17.2503 8.12501 17.1337L17.7586 7.5001C17.8747 7.38403 17.9668 7.24622 18.0296 7.09454C18.0925 6.94286 18.1248 6.7803 18.1248 6.61612C18.1248 6.45194 18.0925 6.28937 18.0296 6.1377C17.9668 5.98602 17.8747 5.84821 17.7586 5.73214ZM15 8.49073L11.5086 5.0001L13.3836 3.1251L16.875 6.61573L15 8.49073Z"
                  fill="#FFC93F"
                />
              </svg>
            )}
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
                <EditableField onValueChange={setAllotedShare} value={allotedShare} max={remainingShare} />
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
                  max={remainingShare}
                  step={1}
                />
              )}
            </div>

            <div className="flex items-center justify-center font-bold gap-1 mt-2 text-[#FFC93F]">
              <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.57627 11.8637L8.16133 10.5236C8.68207 9.33106 9.61927 8.38172 10.7883 7.86279L12.3988 7.14792C12.9108 6.92066 12.9108 6.17578 12.3988 5.9485L10.8386 5.25595C9.63947 4.72367 8.68547 3.7392 8.17367 2.50595L7.581 1.07781C7.36107 0.547834 6.62879 0.547835 6.40887 1.07781L5.81618 2.50594C5.30438 3.7392 4.35035 4.72367 3.15123 5.25595L1.59105 5.9485C1.07902 6.17578 1.07902 6.92066 1.59105 7.14792L3.20153 7.86279C4.37059 8.38172 5.30781 9.33106 5.8285 10.5236L6.4136 11.8637C6.63851 12.3788 7.35133 12.3788 7.57627 11.8637ZM13.4343 15.1266L13.5988 14.7495C13.8921 14.0771 14.4205 13.5417 15.0797 13.2488L15.5866 13.0235C15.8608 12.9017 15.8608 12.5033 15.5866 12.3815L15.1081 12.1688C14.4319 11.8684 13.8941 11.3132 13.6057 10.6179L13.4368 10.2104C13.319 9.92639 12.9263 9.92639 12.8085 10.2104L12.6396 10.6179C12.3513 11.3132 11.8135 11.8684 11.1373 12.1688L10.6587 12.3815C10.3846 12.5033 10.3846 12.9017 10.6587 13.0235L11.1657 13.2488C11.8249 13.5417 12.3532 14.0771 12.6465 14.7495L12.8111 15.1266C12.9315 15.4027 13.3138 15.4027 13.4343 15.1266Z"
                  fill="#FFC93F"
                />
              </svg>

              <h6>You have {remainingShare - allotedShare}% USDC left to allocate</h6>
            </div>
          </div>

          <DialogFooter className="overflow-hidden mt-5">
            {isEditing ? (
              <Button className="w-full" onClick={onEditSaveHandler}>
                Save
              </Button>
            ) : (
              <div className="w-full grid grid-cols-5 gap-14">
                <Button
                  className="bg-[#273B53] border-white hover:bg-backgroundDark"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <svg
                    width={25}
                    height={24}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M4.5 8H20.5V21C20.5 21.5523 20.0523 22 19.5 22H5.5C4.94772 22 4.5 21.5523 4.5 21V8ZM7.5 5V3C7.5 2.44772 7.94772 2 8.5 2H16.5C17.0523 2 17.5 2.44772 17.5 3V5H22.5V7H2.5V5H7.5ZM9.5 4V5H15.5V4H9.5ZM9.5 12V18H11.5V12H9.5ZM13.5 12V18H15.5V12H13.5Z"
                      fill="white"
                    />
                  </svg>
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
      />

      <DeleteBeneficiary open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} />
    </>
  );
};

export default BeneficiaryDetails;
