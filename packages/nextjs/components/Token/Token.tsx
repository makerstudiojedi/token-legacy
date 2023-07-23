import { useState } from "react";
import Image from "next/image";
import ethereumIcon from "../../public/ethereum.svg";
import Icon from "../Icon";
import styles from "./Token.module.scss";
import TokenDialog from "./widgets/TokenDialog";

interface TokenProps {
  permissionGranted: boolean;
}

const Token: React.FC<TokenProps> = ({ permissionGranted }): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.Token} onClick={() => setIsDialogOpen(true)}>
        <div className="flex items-center gap-2">
          <span className="w-[42px] h-[42px] rounded-full bg-[#273B53] flex items-center justify-center">
            <Image src={ethereumIcon} alt="token-icon" />
          </span>

          <div>
            <p className="text-white font-bold">WETH</p>
            <h5 className="font-semibold text-[#3F5876]">0.000456 ETH</h5>
          </div>
        </div>

        <div className="text-right">
          <p className="text-white font-bold">$50000</p>
          <div className="text-[#3F5876] font-semibold flex items-center gap-2">
            <span className="flex items-center gap-[0.8px]">
              <Icon title="users" />

              <h5>5</h5>
            </span>

            <Icon title="line" />

            <h5>50% Left</h5>
          </div>
        </div>
      </div>

      <TokenDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} permissionGranted={permissionGranted} />
    </>
  );
};

export default Token;
