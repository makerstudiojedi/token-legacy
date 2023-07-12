import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import LoadAddress from "./LoadAddress";
import { Loader } from "~~/components/Loader";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { cn } from "~~/lib/utils";

interface AddressEditorDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSave?: () => void;
  allotShare?: boolean;
}

const AddressEditorDialog: React.FC<AddressEditorDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  allotShare = true,
}): JSX.Element => {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(false);

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
      setIsAddressLoaded(true);
    } catch (error) {
      console.error("Failed to read text from clipboard:", error);
    }

    setIsLoading(false);
  };

  const onSaveHandler = () => {
    if (onSave) onSave();

    setIsAddressLoaded(false);
    onOpenChange(false);
    setAddress("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={open => handleDialogOpenChange(open)}>
        <DialogContent className="sm:max-w-[393px] gap-4">
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

          <div className="h-28 w-28 bg-[#143B5F] flex items-center justify-center mx-auto rounded-full relative mt-12">
            <svg
              width={60}
              height={72}
              viewBox="0 0 60 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <ellipse
                cx="29.79"
                cy="19.2558"
                rx="10.8838"
                ry="10.8837"
                stroke="#FF7527"
                strokeWidth="2.51163"
                strokeMiterlimit={10}
                strokeLinejoin="round"
              />
              <path
                d="M7.18508 46.0465C7.18508 36.3366 17.3056 35.1628 29.7898 35.1628C42.274 35.1628 52.3945 36.3366 52.3945 46.0465C52.3945 55.7564 42.2741 63.6279 29.7898 63.6279C17.3056 63.6279 7.18508 55.7564 7.18508 46.0465Z"
                stroke="#FF7527"
                strokeWidth="2.51163"
                strokeMiterlimit={10}
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h5 className="text-center">Enter beneficiary wallet address to continue</h5>

          <DialogFooter className="overflow-hidden">
            <div className="flex items-center justify-between w-full rounded-[10px] bg-backgroundDarker p-4 gap-3">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M2.00488 9H21.0049C21.5572 9 22.0049 9.44772 22.0049 10V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V9ZM3.00488 3H18.0049V7H2.00488V4C2.00488 3.44772 2.4526 3 3.00488 3ZM15.0049 14V16H18.0049V14H15.0049Z"
                  fill="#43A5FF"
                />
              </svg>

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
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M15.5005 9.5C15.5005 9.63261 15.4478 9.75979 15.354 9.85355C15.2603 9.94732 15.1331 10 15.0005 10H14.0005V11C14.0005 11.1326 13.9478 11.2598 13.854 11.3536C13.7603 11.4473 13.6331 11.5 13.5005 11.5C13.3679 11.5 13.2407 11.4473 13.1469 11.3536C13.0532 11.2598 13.0005 11.1326 13.0005 11V10H12.0005C11.8679 10 11.7407 9.94732 11.6469 9.85355C11.5532 9.75979 11.5005 9.63261 11.5005 9.5C11.5005 9.36739 11.5532 9.24021 11.6469 9.14645C11.7407 9.05268 11.8679 9 12.0005 9H13.0005V8C13.0005 7.86739 13.0532 7.74021 13.1469 7.64645C13.2407 7.55268 13.3679 7.5 13.5005 7.5C13.6331 7.5 13.7603 7.55268 13.854 7.64645C13.9478 7.74021 14.0005 7.86739 14.0005 8V9H15.0005C15.1331 9 15.2603 9.05268 15.354 9.14645C15.4478 9.24021 15.5005 9.36739 15.5005 9.5ZM3.50047 4.5H4.50047V5.5C4.50047 5.63261 4.55315 5.75979 4.64692 5.85355C4.74069 5.94732 4.86787 6 5.00047 6C5.13308 6 5.26026 5.94732 5.35403 5.85355C5.4478 5.75979 5.50047 5.63261 5.50047 5.5V4.5H6.50047C6.63308 4.5 6.76026 4.44732 6.85403 4.35355C6.9478 4.25979 7.00047 4.13261 7.00047 4C7.00047 3.86739 6.9478 3.74021 6.85403 3.64645C6.76026 3.55268 6.63308 3.5 6.50047 3.5H5.50047V2.5C5.50047 2.36739 5.4478 2.24021 5.35403 2.14645C5.26026 2.05268 5.13308 2 5.00047 2C4.86787 2 4.74069 2.05268 4.64692 2.14645C4.55315 2.24021 4.50047 2.36739 4.50047 2.5V3.5H3.50047C3.36787 3.5 3.24069 3.55268 3.14692 3.64645C3.05315 3.74021 3.00047 3.86739 3.00047 4C3.00047 4.13261 3.05315 4.25979 3.14692 4.35355C3.24069 4.44732 3.36787 4.5 3.50047 4.5ZM11.5005 12H11.0005V11.5C11.0005 11.3674 10.9478 11.2402 10.854 11.1464C10.7603 11.0527 10.6331 11 10.5005 11C10.3679 11 10.2407 11.0527 10.1469 11.1464C10.0532 11.2402 10.0005 11.3674 10.0005 11.5V12H9.50047C9.36787 12 9.24069 12.0527 9.14692 12.1464C9.05315 12.2402 9.00047 12.3674 9.00047 12.5C9.00047 12.6326 9.05315 12.7598 9.14692 12.8536C9.24069 12.9473 9.36787 13 9.50047 13H10.0005V13.5C10.0005 13.6326 10.0532 13.7598 10.1469 13.8536C10.2407 13.9473 10.3679 14 10.5005 14C10.6331 14 10.7603 13.9473 10.854 13.8536C10.9478 13.7598 11.0005 13.6326 11.0005 13.5V13H11.5005C11.6331 13 11.7603 12.9473 11.854 12.8536C11.9478 12.7598 12.0005 12.6326 12.0005 12.5C12.0005 12.3674 11.9478 12.2402 11.854 12.1464C11.7603 12.0527 11.6331 12 11.5005 12ZM13.7073 5L5.00047 13.7069C4.81296 13.8943 4.5587 13.9995 4.2936 13.9995C4.0285 13.9995 3.77424 13.8943 3.58672 13.7069L2.29297 12.4144C2.20009 12.3215 2.12641 12.2113 2.07614 12.0899C2.02587 11.9686 2 11.8385 2 11.7072C2 11.5758 2.02587 11.4458 2.07614 11.3245C2.12641 11.2031 2.20009 11.0929 2.29297 11L11.0005 2.29312C11.0933 2.20024 11.2036 2.12656 11.3249 2.07629C11.4463 2.02602 11.5763 2.00015 11.7077 2.00015C11.839 2.00015 11.9691 2.02602 12.0904 2.07629C12.2117 2.12656 12.322 2.20024 12.4148 2.29312L13.7073 3.58562C13.8002 3.67849 13.8739 3.78874 13.9242 3.91008C13.9745 4.03142 14.0003 4.16147 14.0003 4.29281C14.0003 4.42415 13.9745 4.55421 13.9242 4.67555C13.8739 4.79689 13.8002 4.90714 13.7073 5ZM13.0005 4.29313L11.7073 3L9.70735 5L11.0005 6.29313L13.0005 4.29313Z"
                        fill="#FFC93F"
                      />
                    </svg>

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

      <LoadAddress
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
      />
    </>
  );
};

export default AddressEditorDialog;
