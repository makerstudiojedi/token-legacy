import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
// import LoadAddress from "./LoadAddress";
import Icon from "~~/components/Icons";
import { Loader } from "~~/components/Loader";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { cn } from "~~/lib/utils";

interface NFTEditorProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const NFTEditor = ({ open, onOpenChange }: NFTEditorProps) => {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDialogOpenChange = (open: boolean) => {
    if (isLoading) return null;

    onOpenChange(open);
    setAddress("");
  };

  const pasteAddressHandler = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
      console.error("Failed to read text from clipboard:", error);
    }

    setIsLoading(false);
  };

  // const onSaveHandler = () => {
  //   if (onSave) onSave();

  //   setIsAddressLoaded(false);
  //   onOpenChange(false);
  //   setAddress("");
  // };

  return (
    <>
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

          <div className="h-28 w-28 bg-[#143B5F] flex items-center justify-center mx-auto rounded-full relative mt-12">
            <Icon title="user" />
          </div>

          <h5 className="text-center">Enter beneficiary wallet address to continue</h5>

          <DialogFooter className="overflow-hidden">
            <div className="flex items-center justify-between w-full rounded-[10px] bg-backgroundDarker p-4 gap-3">
              <Icon title="wallet-blue" />

              <div className="flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis font-bold text-[#3F5876]">
                {address}
              </div>

              <span
                className={cn(
                  "flex items-center justify-end gap-2 cursor-pointer hover:opacity-70 transition flex-shrink-0 w-[55px]",
                  isLoading && "pointer-events-none",
                )}
                onClick={pasteAddressHandler}
              >
                {!isLoading ? (
                  <>
                    <Icon title="magic-wand" />

                    <h6 className="font-semibold text-[#FFC93F]">Paste</h6>
                  </>
                ) : (
                  <Loader />
                )}
              </span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <LoadAddress
        open={isAddressLoaded}
        onOpenChange={setIsAddressLoaded}
        onSave={onSaveHandler}
        allotShare={allotShare}
        onClose={() => {
          onOpenChange(false);
          setAddress("");
        }}
        tokenShare={25}
        remainingShare={50}
      /> */}
    </>
  );
};

export default NFTEditor;
