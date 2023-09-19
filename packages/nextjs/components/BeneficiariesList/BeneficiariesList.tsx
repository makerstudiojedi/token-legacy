import styles from "./BeneficiariesList.module.scss";
import Beneficiary from "./Beneficiary";
import { AllocationType } from "./Beneficiary.types";
import { FetchTokenResult } from "wagmi/dist/actions";
import { Maybe } from "~~/gql/types.generated";

interface BeneficiariesListProps {
  allocations: Maybe<Array<AllocationType>>;
  balance: number;
  tokenData: FetchTokenResult;
  isReadOnly?: boolean;
  leftOver: number;
  onSave: (_address: `0x${string}`, amount?: number) => Promise<void>;
}

const BeneficiariesList: React.FC<BeneficiariesListProps> = ({
  allocations,
  balance,
  isReadOnly,
  tokenData,
  leftOver,
  onSave,
}): JSX.Element => {
  return (
    <div className={styles.BeneficiariesList}>
      {allocations?.map(allocation => (
        <Beneficiary
          key={allocation.id}
          allocation={allocation}
          balance={balance}
          tokenData={tokenData}
          leftOver={leftOver}
          isReadOnly={isReadOnly}
          onSave={onSave}
        />
      ))}
    </div>
  );
};

export default BeneficiariesList;
