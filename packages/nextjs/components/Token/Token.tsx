import { useContext } from "react";
import Image from "next/image";
import ethereumIcon from "../../public/ethereum.svg";
import Icon from "../Icons";
import styles from "./Token.module.scss";
import { isAddress } from "viem";
import { useAccount, useBalance, useToken } from "wagmi";
import { Allocation, LegacyToken, Maybe } from "~~/gql/types.generated";
import { TokenContext } from "~~/providers/TokenProvider";
import { shortenAddress } from "~~/utils/helpers";

interface TokenProps {
  owner: `0x${string}`;
  token: { __typename?: "LegacyToken" } & Pick<LegacyToken, "id" | "token" | "totalAllocation"> & {
      allocations?: Maybe<Array<{ __typename?: "Allocation" } & Pick<Allocation, "id">>>;
    };
}

const Token: React.FC<TokenProps> = ({ owner, token }): JSX.Element => {
  const { setTokenAddress } = useContext(TokenContext);
  const tokenAddress = (token.token as `0x${string}`) || "";
  const { data: tBalance } = useBalance({
    address: owner,
    token: tokenAddress,
    enabled: isAddress(owner) && isAddress(tokenAddress),
  });
  const { data } = useToken({
    address: tokenAddress,
  });

  const totalAllocations = (token.allocations || []).length;
  const allocationsLeft = 100 - (token.totalAllocation || 0);

  return (
    <>
      <div className={styles.Token} onClick={() => setTokenAddress(tokenAddress)}>
        <div className="flex items-center gap-2">
          <span className="w-[42px] h-[42px] rounded-full bg-[#273B53] flex items-center justify-center">
            <Image src={ethereumIcon} alt="token-icon" />
          </span>

          <div>
            <p className="text-white font-bold">{data?.name}</p>
            <h5 className="font-semibold text-[#3F5876]">{shortenAddress(tokenAddress)}</h5>
          </div>
        </div>

        <div className="text-right">
          <p className="text-white font-bold">
            {tBalance?.formatted} {tBalance?.symbol}
          </p>
          <div className="text-[#3F5876] font-semibold flex items-center gap-2">
            <span className="flex items-center gap-[0.8px]">
              <Icon title="users" />

              <h5>{totalAllocations}</h5>
            </span>

            <Icon title="line" />

            <h5>{allocationsLeft}% Left</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
