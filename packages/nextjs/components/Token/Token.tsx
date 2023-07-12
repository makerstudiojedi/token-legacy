import { useState } from "react";
import Image from "next/image";
import ethereumIcon from "../../public/ethereum.svg";
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
              <UsersIcon />

              <h5>5</h5>
            </span>

            <span>
              <svg width={1} height={12} viewBox="0 0 1 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2={12} stroke="#273B53" />
              </svg>
            </span>

            <h5>50% Left</h5>
          </div>
        </div>
      </div>

      <TokenDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} permissionGranted={permissionGranted} />
    </>
  );
};

export default Token;

const UsersIcon: React.FC = (): JSX.Element => {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.2796 12.2269C10.3288 12.3023 10.3567 12.3896 10.3604 12.4796C10.364 12.5696 10.3433 12.6589 10.3004 12.7381C10.2575 12.8173 10.194 12.8835 10.1167 12.9296C10.0393 12.9756 9.95091 13 9.86084 13H0.639588C0.549522 13 0.461132 12.9756 0.383756 12.9296C0.30638 12.8835 0.242891 12.8173 0.199996 12.7381C0.157102 12.6589 0.136395 12.5696 0.140063 12.4796C0.143732 12.3896 0.171639 12.3023 0.220837 12.2269C0.924654 11.1435 1.9599 10.3168 3.17209 9.87C2.50196 9.42386 1.9932 8.77392 1.72102 8.01628C1.44885 7.25863 1.42773 6.43351 1.66077 5.66293C1.89381 4.89235 2.36865 4.21723 3.01507 3.73739C3.66149 3.25755 4.44517 2.99847 5.25021 2.99847C6.05526 2.99847 6.83894 3.25755 7.48536 3.73739C8.13177 4.21723 8.60662 4.89235 8.83966 5.66293C9.0727 6.43351 9.05158 7.25863 8.7794 8.01628C8.50723 8.77392 7.99847 9.42386 7.32834 9.87C8.54053 10.3168 9.57577 11.1435 10.2796 12.2269ZM15.774 12.2175C15.07 11.1387 14.037 10.3155 12.8283 9.87C13.6195 9.33709 14.1778 8.52275 14.3896 7.59271C14.6015 6.66268 14.451 5.68686 13.9687 4.86389C13.4865 4.04091 12.7087 3.43264 11.7938 3.16289C10.8789 2.89313 9.89555 2.98217 9.04396 3.41187C9.0114 3.42868 8.98293 3.45245 8.96057 3.48149C8.93822 3.51053 8.92252 3.54413 8.91459 3.5799C8.90665 3.61568 8.90669 3.65277 8.91468 3.68854C8.92267 3.7243 8.93843 3.75787 8.96084 3.78687C9.59407 4.57675 9.95773 5.54865 9.99856 6.56019C10.0394 7.57174 9.75523 8.56978 9.18771 9.40812C9.15103 9.46291 9.13748 9.52997 9.15 9.5947C9.16253 9.65943 9.20012 9.7166 9.25459 9.75375C9.99452 10.2702 10.628 10.9244 11.1202 11.6806C11.3187 11.9847 11.3998 12.3506 11.3483 12.71C11.3425 12.7458 11.3446 12.7823 11.3543 12.8172C11.3641 12.8521 11.3813 12.8845 11.4048 12.9121C11.4282 12.9396 11.4574 12.9618 11.4903 12.977C11.5232 12.9922 11.559 13 11.5952 13H15.364C15.4741 13 15.5811 12.9637 15.6685 12.8967C15.7558 12.8297 15.8186 12.7357 15.8471 12.6294C15.8645 12.5594 15.8669 12.4866 15.8543 12.4157C15.8417 12.3447 15.8144 12.2772 15.774 12.2175Z"
        fill="#3F5876"
      />
    </svg>
  );
};
