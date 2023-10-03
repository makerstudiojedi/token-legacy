import { useContext } from "react";
import Image from "next/image";
import ethereumIcon from "../../public/ethereum.svg";
import styles from "./Token.module.scss";
import { formatUnits, isAddress } from "viem";
import { useToken } from "wagmi";
import { Allocation, LegacyToken } from "~~/gql/types.generated";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";
import { TokenContext } from "~~/providers/TokenProvider";
import { abbreviateNumber, shortenAddress } from "~~/utils/helpers";

interface TokenAllocationProps {
  owner: `0x${string}`;
  legacy: `0x${string}`;
  unlocked: boolean;
  allocation: { __typename?: "Allocation" } & Pick<Allocation, "id" | "percentage" | "createdAt" | "withdrawn"> & {
      token: { __typename?: "LegacyToken" } & Pick<LegacyToken, "token">;
    };
}

const TokenAllocation: React.FC<TokenAllocationProps> = ({ owner, legacy, unlocked, allocation }): JSX.Element => {
  // const { address } = useAccount();
  const { setTokenAddress } = useContext(TokenContext);
  const tokenAddress = (allocation.token.token as `0x${string}`) || "";
  const { data } = useToken({
    address: tokenAddress,
  });

  const { data: tBalance } = useScaffoldContractRead({
    contractName: "LegacyImplementation",
    functionName: "getTokenBalance",
    address: legacy,
    args: [tokenAddress],
    enabled: isAddress(owner) && isAddress(tokenAddress),
  });

  const formattedBalance = tBalance && data?.decimals ? formatUnits(tBalance, Number(data.decimals)) : 0;
  const allocationAmount = (allocation.percentage / 100) * Number(formattedBalance);
  // const allocationsLeft = 100 - (token.totalAllocation || 0);

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
          <div className="text-white font-bold inline-flex items-center justify-center">
            <div
              className={cn("w-2 h-2 rounded-full mr-2", {
                "bg-[#99E8A1]": unlocked && !allocation.withdrawn,
                "bg-yellow-500": !unlocked,
                "bg-red-500": allocation.withdrawn,
              })}
            />
            <div>
              {allocationAmount} {data?.symbol}
            </div>
          </div>
          <div className="text-[#3F5876] font-semibold flex items-center gap-2">
            <span className="flex items-center gap-[0.8px]">
              <h5>
                {allocation.percentage}% of {abbreviateNumber(Number(formattedBalance))} {data?.symbol}
              </h5>
            </span>

            {/* <Icon title="line" />

            <h5>{allocationsLeft}% Left</h5> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenAllocation;
