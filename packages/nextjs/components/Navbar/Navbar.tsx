import { useRouter } from "next/navigation";
import { AddressBadge } from "../AddressBadge";
import Icon from "../Icons";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import styles from "./Navbar.module.scss";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Navbar: React.FC = (): JSX.Element => {
  const router = useRouter();

  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();

  return (
    <header className={styles.Navbar}>
      <nav>
        <Logo className="cursor-pointer hover:opacity-70 transition" onClick={() => router.push("/wallet")} />

        <ul>
          <li>
            <Button>
              <Icon title="import" />

              <span>Import tokens</span>
            </Button>
          </li>

          <li>
            <Button size={"icon"} variant={"icon"} onClick={() => router.push("/wallet/release-date")}>
              <Icon title="stop-watch" />
            </Button>
          </li>

          <li>
            <AddressBadge address={address ?? ""} onClick={openAccountModal} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
