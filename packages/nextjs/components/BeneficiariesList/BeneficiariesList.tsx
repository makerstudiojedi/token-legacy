import styles from "./BeneficiariesList.module.scss";
import Beneficiary from "./Beneficiary";

const BeneficiariesList: React.FC = (): JSX.Element => {
  return (
    <div className={styles.BeneficiariesList}>
      <Beneficiary />
      <Beneficiary />
      <Beneficiary />
    </div>
  );
};

export default BeneficiariesList;
