import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import ethereumIcon from "../../../public/ethereum.svg";
import AddressEditorDialog from "./AddressEditorDialog";
import { BeneficiariesList } from "~~/components/BeneficiariesList";
import { DonutChart } from "~~/components/DonutChart";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";

interface TokenDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  permissionGranted: boolean;
}

const TokenDialog: React.FC<TokenDialogProps> = ({ open, onOpenChange, permissionGranted }): JSX.Element => {
  const [isAddBeneficiaryDialogOpen, setIsAddBeneficiaryDialogOpen] = useState<boolean>(false);

  return (
    <>
      {permissionGranted ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[393px] flex flex-col gap-6">
            <Header />

            <div className="flex items-center justify-center gap-2">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5 7.5C3.5 7.5 7.55 10.875 12.5 7.5C17.45 4.125 21.5 7.5 21.5 7.5"
                  stroke="#3F5876"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <path
                  d="M3.5 16.5C3.5 16.5 7.55 19.875 12.5 16.5C17.45 13.125 21.5 16.5 21.5 16.5"
                  stroke="#3F5876"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>

              <div className="font-semibold flex items-center gap-2">
                <span className="text-2xl">$</span>
                <h2 className="text-white">1,000,000.00</h2>
              </div>
            </div>

            <DonutChart className="mx-auto flex-shrink-0" width={160} height={160} allocated={60} />

            <div className="text-[#3F5876] font-semibold flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_107_10611)">
                    <path
                      d="M13.3488 15.2836C13.4103 15.3779 13.4451 15.4871 13.4497 15.5996C13.4543 15.712 13.4284 15.8237 13.3748 15.9227C13.3212 16.0217 13.2418 16.1043 13.1451 16.162C13.0484 16.2196 12.9379 16.25 12.8253 16.25H1.29875C1.18617 16.25 1.07568 16.2196 0.978963 16.162C0.882243 16.1043 0.802881 16.0217 0.749263 15.9227C0.695645 15.8237 0.669761 15.712 0.674347 15.5996C0.678932 15.4871 0.713817 15.3779 0.775314 15.2836C1.65508 13.9294 2.94914 12.896 4.46438 12.3375C3.62672 11.7798 2.99076 10.9674 2.65055 10.0204C2.31033 9.07331 2.28393 8.04191 2.57523 7.07868C2.86653 6.11546 3.46008 5.27155 4.26811 4.67175C5.07613 4.07195 6.05572 3.74811 7.06203 3.74811C8.06834 3.74811 9.04794 4.07195 9.85596 4.67175C10.664 5.27155 11.2575 6.11546 11.5488 7.07868C11.8401 8.04191 11.8137 9.07331 11.4735 10.0204C11.1333 10.9674 10.4973 11.7798 9.65969 12.3375C11.1749 12.896 12.469 13.9294 13.3488 15.2836ZM20.2167 15.2719C19.3367 13.9234 18.0456 12.8944 16.5347 12.3375C17.5236 11.6714 18.2215 10.6534 18.4863 9.49091C18.7511 8.32836 18.563 7.10859 17.9602 6.07987C17.3574 5.05116 16.3852 4.29082 15.2415 3.95363C14.0979 3.61643 12.8687 3.72773 11.8042 4.26485C11.7635 4.28587 11.7279 4.31558 11.7 4.35188C11.672 4.38817 11.6524 4.43017 11.6425 4.4749C11.6326 4.51962 11.6326 4.56598 11.6426 4.61068C11.6526 4.65539 11.6723 4.69736 11.7003 4.7336C12.4919 5.72095 12.9464 6.93582 12.9975 8.20026C13.0485 9.46469 12.6933 10.7122 11.9839 11.7602C11.9381 11.8287 11.9211 11.9125 11.9368 11.9934C11.9524 12.0743 11.9994 12.1458 12.0675 12.1922C12.9924 12.8377 13.7842 13.6555 14.3995 14.6008C14.6477 14.9808 14.7491 15.4382 14.6847 15.8875C14.6774 15.9322 14.68 15.9779 14.6922 16.0215C14.7044 16.0652 14.7259 16.1056 14.7552 16.1401C14.7846 16.1746 14.8211 16.2022 14.8622 16.2212C14.9033 16.2402 14.948 16.25 14.9933 16.25H19.7042C19.8419 16.2501 19.9756 16.2047 20.0848 16.1209C20.194 16.0371 20.2725 15.9197 20.3081 15.7867C20.3299 15.6993 20.3329 15.6083 20.3172 15.5196C20.3015 15.4309 20.2672 15.3465 20.2167 15.2719Z"
                      fill="#3F5876"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_107_10611">
                      <rect width={20} height={20} fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>

                <p>0</p>
              </div>

              <div className="flex items-center gap-1">
                <span className="block bg-primary h-[10px] w-[10px] rounded-full flex-shrink-0"></span>

                <p>100% Allocated</p>
              </div>

              <div className="flex items-center gap-1">
                <span className="block bg-[#FFE3D4] h-[10px] w-[10px] rounded-full flex-shrink-0"></span>

                <p>100% Left</p>
              </div>
            </div>

            <BeneficiariesList />

            <DialogFooter>
              <Button className="w-full" onClick={() => setIsAddBeneficiaryDialogOpen(true)}>
                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 19.748V16.4C10.5 15.1174 11.4948 14.1076 12.9667 13.5321C12.0431 13.188 11.0435 13 10 13C8.11013 13 6.36432 13.6168 4.95286 14.66C5.83199 17.1544 7.91273 19.082 10.5 19.748ZM19.3794 16.0859C18.9862 15.5526 17.6708 15 16 15C13.9939 15 12.5 15.7967 12.5 16.4V20C15.4255 20 17.9843 18.4296 19.3794 16.0859ZM10.05 11.5C11.2926 11.5 12.3 10.4926 12.3 9.25C12.3 8.00736 11.2926 7 10.05 7C8.80736 7 7.8 8.00736 7.8 9.25C7.8 10.4926 8.80736 11.5 10.05 11.5ZM16 12.5C17.1046 12.5 18 11.6046 18 10.5C18 9.39543 17.1046 8.5 16 8.5C14.8954 8.5 14 9.39543 14 10.5C14 11.6046 14.8954 12.5 16 12.5ZM12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22Z"
                    fill="white"
                  />
                </svg>

                <span>Add Beneficiary</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[393px]">
            <Header />

            <div className="flex items-center justify-center gap-2">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5 7.5C3.5 7.5 7.55 10.875 12.5 7.5C17.45 4.125 21.5 7.5 21.5 7.5"
                  stroke="#3F5876"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <path
                  d="M3.5 16.5C3.5 16.5 7.55 19.875 12.5 16.5C17.45 13.125 21.5 16.5 21.5 16.5"
                  stroke="#3F5876"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>

              <div className="font-semibold flex items-center gap-2">
                <span className="text-2xl">$</span>
                <h2 className="text-white">1,000,000.00</h2>
              </div>
            </div>

            <div className="p-4 bg-[#83E08C] rounded-[8px] flex items-start gap-2">
              <svg
                width={32}
                height={32}
                className="flex-shrink-0"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM15.5 9C15.7967 9 16.0867 9.08797 16.3334 9.2528C16.58 9.41762 16.7723 9.65189 16.8858 9.92597C16.9994 10.2001 17.0291 10.5017 16.9712 10.7926C16.9133 11.0836 16.7704 11.3509 16.5607 11.5607C16.3509 11.7704 16.0836 11.9133 15.7926 11.9712C15.5017 12.0291 15.2001 11.9994 14.926 11.8858C14.6519 11.7723 14.4176 11.58 14.2528 11.3334C14.088 11.0867 14 10.7967 14 10.5C14 10.1022 14.158 9.72064 14.4393 9.43934C14.7206 9.15804 15.1022 9 15.5 9ZM17 23C16.4696 23 15.9609 22.7893 15.5858 22.4142C15.2107 22.0391 15 21.5304 15 21V16C14.7348 16 14.4804 15.8946 14.2929 15.7071C14.1054 15.5196 14 15.2652 14 15C14 14.7348 14.1054 14.4804 14.2929 14.2929C14.4804 14.1054 14.7348 14 15 14C15.5304 14 16.0391 14.2107 16.4142 14.5858C16.7893 14.9609 17 15.4696 17 16V21C17.2652 21 17.5196 21.1054 17.7071 21.2929C17.8946 21.4804 18 21.7348 18 22C18 22.2652 17.8946 22.5196 17.7071 22.7071C17.5196 22.8946 17.2652 23 17 23Z"
                  fill="#1B4A76"
                />
              </svg>

              <div className="text-[#08121D]">
                <span className="text-xl font-bold text-">Permission request</span>

                <p className="font-medium mt-3 text-sm">
                  A smart contract will like to connect to your wallet to allocate resources based on your settings.{" "}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full">Grant Permission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <AddressEditorDialog open={isAddBeneficiaryDialogOpen} onOpenChange={setIsAddBeneficiaryDialogOpen} />
    </>
  );
};

const Header = () => (
  <DialogHeader>
    <DialogTitle>
      <div className="flex items-center gap-2">
        <span className="w-[42px] h-[42px] rounded-full bg-[#273B53] flex items-center justify-center">
          <Image src={ethereumIcon} alt="token-icon" />
        </span>

        <div>
          <p className="text-white font-bold">WETH</p>
          <h5 className="font-semibold text-[#3F5876]">0.000456 ETH</h5>
        </div>
      </div>
    </DialogTitle>
  </DialogHeader>
);

export default TokenDialog;
