import { useState } from "react";
import Image from "next/image";
import avatar from "../../public/avatar1.svg";
import styles from "./BeneficiariesList.module.scss";
import { AllocationType } from "./Beneficiary.types";
import BeneficiaryDetails from "./widgets/BeneficiaryDetails";
import { isAddress } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { FetchTokenResult } from "wagmi/dist/actions";
import { cn } from "~~/lib/utils";
import { shortenAddress } from "~~/utils/helpers";

interface BeneficiaryProps {
  className?: string;
  isReadOnly?: boolean;
  allocation: AllocationType;
  balance: number;
  tokenData: FetchTokenResult;
  leftOver: number;
  onSave: (_address: `0x${string}`, amount?: number) => Promise<void>;
}

const Beneficiary: React.FC<BeneficiaryProps> = ({
  className,
  isReadOnly = false,
  allocation,
  balance,
  tokenData,
  leftOver,
  onSave,
}): JSX.Element => {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);
  const address = allocation.to.address as `0x${string}`;

  // TODO : Get ENS Name & Avatar if any
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    enabled: isAddress(address),
    chainId: 1,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
    chainId: 1,
  });

  return (
    <>
      <div className={cn(styles.Beneficiary, className)} onClick={() => !isReadOnly && setIsDetailsDialogOpen(true)}>
        <div className={styles.Beneficiary__inner}>
          <div className="flex items-center gap-2">
            <span className="w-[42px] h-[42px] rounded-full bg-red-500 block relative overflow-hidden">
              <Image src={ensAvatar || avatar} fill className="object-cover w-full h-full" alt="avatar" />
            </span>

            <div>
              <p className="text-white font-bold">{ensName ?? "- -"}</p>
              <h5 className="font-semibold text-[#3F5876]">{shortenAddress(address)}</h5>
            </div>
          </div>

          <div className="text-right">
            <p className="text-white font-bold">
              {(allocation.percentage / 100) * balance} {tokenData.symbol}
            </p>

            <h5 className="font-semibold text-[#3F5876]">{allocation.percentage}%</h5>
          </div>
        </div>

        {!isReadOnly && (
          <svg className={styles.line} viewBox="0 0 319 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="0.5" x2={319} y2="0.5" stroke="#0E1E31" />
          </svg>
        )}
      </div>

      {tokenData && (
        <BeneficiaryDetails
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          address={address}
          tokenData={tokenData}
          tokenShare={allocation.percentage}
          remainingShare={leftOver}
          onSave={onSave}
        />
      )}
    </>
  );
};

export default Beneficiary;
