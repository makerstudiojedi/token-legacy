import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import ethereumIcon from "../../../public/ethereum.svg";
import AddressEditorDialog from "./AddressEditorDialog";
import { BeneficiariesList } from "~~/components/BeneficiariesList";
import { DonutChart } from "~~/components/DonutChart";
import Icon from "~~/components/Icon";
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
              <Icon title="approximate" />

              <div className="font-semibold flex items-center gap-2">
                <span className="text-2xl">$</span>
                <h2 className="text-white">1,000,000.00</h2>
              </div>
            </div>

            <DonutChart className="mx-auto flex-shrink-0" width={160} height={160} allocated={60} />

            <div className="text-[#3F5876] font-semibold flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <Icon title="users" width={21} height={20} />

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
                <Icon title="beneficiaries" />

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
              <Icon title="approximate" />

              <div className="font-semibold flex items-center gap-2">
                <span className="text-2xl">$</span>
                <h2 className="text-white">1,000,000.00</h2>
              </div>
            </div>

            <div className="p-4 bg-[#83E08C] rounded-[8px] flex items-start gap-2">
              <Icon title="important" />

              <div className="text-[#08121D]">
                <span className="text-xl font-bold text-">Permission request</span>
                <p className="font-medium mt-3 text-sm">
                  A smart contract will like to connect to your wallet to allocate resources based on your settings.
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
