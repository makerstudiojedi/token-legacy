import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { AddressBadge } from "../AddressBadge";
import { CalendarDialog } from "../CalendarDialog";
import Icon from "../Icons";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import styles from "./Navbar.module.scss";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { fromUnixTime } from "date-fns";
import { useAccount, useEnsName } from "wagmi";
import { useFetchLegacyQuery } from "~~/gql/types.generated";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { TokenContext } from "~~/providers/TokenProvider";
import { useGraphStore } from "~~/services/store/graphstore";

const Navbar: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { toggleTokenImporter } = useContext(TokenContext);

  const [setLatestActionBlock] = useGraphStore(state => [state.setLatestActionBlock, state.isLoading]);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState<boolean>(false);

  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  });

  const pathname = usePathname() ?? "";

  const isBeneficiaryPage = pathname.startsWith("/beneficiary");

  const legacyAddress = ((router.query.legacyAddress ?? "") as string).toLowerCase();

  const { writeAsync: updateReleaseDate } = useScaffoldContractWrite({
    contractName: "LegacyImplementation",
    functionName: "registerProof",
    address: legacyAddress as `0x${string}`,
    args: [0n],
    onBlockConfirmation: async txReceipt => {
      setLatestActionBlock(Number(txReceipt.blockNumber));
      setIsLoading(false);
      toast({
        variant: "default",
        description: "A new release date has been set successfully",
      });
    },
    onError: async () => {
      setIsLoading(false);
      toast({
        variant: "destructive",
        description: "An error occured. Please try again.",
      });
    },
  });

  const { data: legacyData } = useFetchLegacyQuery({
    variables: {
      address: legacyAddress.toLowerCase(),
    },
  });

  const unlocksAt = (legacyData?.legacy?.unlocksAt ?? 0) * 1000;

  useEffect(() => {
    const futureDate = fromUnixTime(unlocksAt / 1000);
    setDate(futureDate);
  }, [unlocksAt]);

  const onSaveDateHandler = async (newDate: Date | undefined) => {
    if (typeof newDate === "undefined") {
      toast({
        variant: "destructive",
        description: "Please select a date",
      });

      return;
    }

    setIsLoading(true);

    try {
      await updateReleaseDate({ args: [BigInt(newDate.getTime() / 1000)] });
    } catch (error) {
      setIsLoading(false);

      toast({
        variant: "destructive",
        description: "An error occured. Please try again.",
      });
    }
  };

  return (
    <header className={styles.Navbar}>
      <nav>
        <Logo
          className="cursor-pointer hover:opacity-70 transition"
          onClick={() => router.push(`/legacy/${legacyAddress}`)}
        />

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
            <CalendarDialog
              currentDate={date}
              onApplyDate={onSaveDateHandler}
              isLoading={isLoading}
              open={isCalendarDialogOpen}
              onClose={open => setIsCalendarDialogOpen(open)}
            >
              <Icon title="stop-watch" />
            </CalendarDialog>
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
