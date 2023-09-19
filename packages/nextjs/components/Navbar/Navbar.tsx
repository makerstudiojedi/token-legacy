import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AddressBadge } from "../AddressBadge";
import Icon from "../Icons";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import styles from "./Navbar.module.scss";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";
import { TokenContext } from "~~/providers/TokenProvider";

const Navbar: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { toggleTokenImporter } = useContext(TokenContext);

  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  });

  const pathname = usePathname() ?? "";

  const isBeneficiaryPage = pathname.startsWith("/beneficiary");

  return (
    <header className={styles.Navbar}>
      <nav>
        <Logo className="cursor-pointer hover:opacity-70 transition" onClick={() => router.push("/")} />

        <ul>
          <li>
            {!isBeneficiaryPage ? (
              <Button onClick={() => toggleTokenImporter(true)}>
                <Icon title="import" />

                <span>Import token</span>
              </Button>
            ) : (
              <Button>
                <Icon title="import" />

                <span>Withdraw to wallet</span>
              </Button>
            )}
          </li>

          <li>
            <Button size={"icon"} variant={"icon"} onClick={() => router.push("/legacy/release-date")}>
              <Icon title="stop-watch" />
            </Button>
          </li>

          <li>
            <AddressBadge address={(ensName || address) ?? ""} onClick={openAccountModal} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
