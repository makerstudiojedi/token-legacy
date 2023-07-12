import { useState } from "react";
import Image from "next/image";
import avatar from "../../public/avatar1.svg";
import styles from "./BeneficiariesList.module.scss";
import BeneficiaryDetails from "./widgets/BeneficiaryDetails";
import { cn } from "~~/lib/utils";
import { shortenAddress } from "~~/utils/helpers";

interface BeneficiaryProps {
  className?: string;
  isReadOnly?: boolean;
}

const Beneficiary: React.FC<BeneficiaryProps> = ({ className, isReadOnly = false }): JSX.Element => {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);
  const address = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  return (
    <>
      <div className={cn(styles.Beneficiary, className)} onClick={() => !isReadOnly && setIsDetailsDialogOpen(true)}>
        <div className={styles.Beneficiary__inner}>
          <div className="flex items-center gap-2">
            <span className="w-[42px] h-[42px] rounded-full bg-red-500 block">
              <Image src={avatar} className="object-cover w-full h-full" alt="avatar" />
            </span>

            <div>
              <p className="text-white font-bold">emu.eth</p>
              <h5 className="font-semibold text-[#3F5876]">{shortenAddress(address)}</h5>
            </div>
          </div>

          <div className="text-right">
            <p className="text-white font-bold">$50000</p>

            <h5 className="font-semibold text-[#3F5876]">50%</h5>
          </div>
        </div>

        {!isReadOnly && (
          <svg className={styles.line} viewBox="0 0 319 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="0.5" x2={319} y2="0.5" stroke="#0E1E31" />
          </svg>
        )}
      </div>

      <BeneficiaryDetails
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        tokenShare={25}
        remainingShare={50}
      />
    </>
  );
};

export default Beneficiary;
