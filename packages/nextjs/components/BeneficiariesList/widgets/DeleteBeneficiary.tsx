import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import Beneficiary from "../Beneficiary";
import Icon from "~~/components/Icon";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";

interface DeleteBeneficiaryProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const DeleteBeneficiary: React.FC<DeleteBeneficiaryProps> = ({ open, onOpenChange }): JSX.Element => {
  const handleDialogOpenChange = (open: boolean) => {
    // if (isLoading) return null

    onOpenChange(open);
  };

  const onDeleteHandler = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={open => handleDialogOpenChange(open)}>
      <DialogContent className="sm:max-w-[393px] gap-5">
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

        <div className="h-28 w-28 bg-[#FFF1E9] flex items-center justify-center mx-auto rounded-full relative mt-12">
          <Icon title="delete-orange" />
        </div>

        <div className="flex items-center justify-center">
          <h3 className="font-bold">Delete beneficiary?</h3>
        </div>

        <div className="flex items-center justify-center">
          <h5 className="text-[#7DA1CC]">This action cannot be undone</h5>
        </div>

        <div className="relative">
          <div className="h-[1px] bg-[#273B53] w-full"></div>
          <span className="text-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-5">
            This User
          </span>
        </div>

        <div className="mt-2">
          <Beneficiary className="bg-backgroundDarker p-4 rounded-2xl" isReadOnly={true} />
        </div>

        <DialogFooter className="mt-5">
          <div className="grid grid-cols-2 gap-6 w-full">
            <Button onClick={() => onOpenChange(false)} variant={"ghost"}>
              Cancel
            </Button>

            <Button onClick={onDeleteHandler}>Delete</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBeneficiary;
