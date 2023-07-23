import { useRouter } from "next/navigation";
import Icon from "../Icon";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = (): JSX.Element => {
  const router = useRouter();

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
            <Button size={"icon"} variant={"icon"}>
              <Icon title="logout" />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
