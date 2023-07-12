import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import Beneficiary from "../Beneficiary";
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
              <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.5 19.748V16.4C10.5 15.1174 11.4948 14.1076 12.9667 13.5321C12.0431 13.188 11.0435 13 10 13C8.11013 13 6.36432 13.6168 4.95286 14.66C5.83199 17.1544 7.91273 19.082 10.5 19.748ZM19.3794 16.0859C18.9862 15.5526 17.6708 15 16 15C13.9939 15 12.5 15.7967 12.5 16.4V20C15.4255 20 17.9843 18.4296 19.3794 16.0859ZM10.05 11.5C11.2926 11.5 12.3 10.4926 12.3 9.25C12.3 8.00736 11.2926 7 10.05 7C8.80736 7 7.8 8.00736 7.8 9.25C7.8 10.4926 8.80736 11.5 10.05 11.5ZM16 12.5C17.1046 12.5 18 11.6046 18 10.5C18 9.39543 17.1046 8.5 16 8.5C14.8954 8.5 14 9.39543 14 10.5C14 11.6046 14.8954 12.5 16 12.5ZM12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22Z"
                  fill="#3F5876"
                />
              </svg>

              <h4 className="text-white font-semibold font-grotesque -mt-1">Beneficiary</h4>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="h-[80px] overflow-hidden absolute left-0 top-[5.5rem] block">
          <Image src={addBeneficiaryBg} className="object-cover w-full h-full" alt="add-beneficiary-bg" />
        </div>

        <div className="h-28 w-28 bg-[#FFF1E9] flex items-center justify-center mx-auto rounded-full relative mt-12">
          <svg width={47} height={46} viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.16634 15.3333H38.833V40.2499C38.833 41.3085 37.9749 42.1666 36.9163 42.1666H10.083C9.02447 42.1666 8.16634 41.3085 8.16634 40.2499V15.3333ZM13.9163 9.58325V5.74992C13.9163 4.69138 14.7745 3.83325 15.833 3.83325H31.1663C32.2249 3.83325 33.083 4.69138 33.083 5.74992V9.58325H42.6663V13.4166H4.33301V9.58325H13.9163ZM17.7497 7.66659V9.58325H29.2497V7.66659H17.7497ZM17.7497 22.9999V34.4999H21.583V22.9999H17.7497ZM25.4163 22.9999V34.4999H29.2497V22.9999H25.4163Z"
              fill="#FF7527"
            />
          </svg>
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
