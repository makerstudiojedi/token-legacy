import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Image from "next/image";
import addBeneficiaryBg from "../../../public/add-beneficiary-bg.svg";
import LoadAddress from "./LoadAddress";
import { isAddress } from "viem";
import { useToken } from "wagmi";
import Icon from "~~/components/Icons";
import { Loader } from "~~/components/Loader";
import { AddressInput } from "~~/components/scaffold-eth";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { cn } from "~~/lib/utils";
import { TokenContext } from "~~/providers/TokenProvider";

interface TokenImporterProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSave?: () => void;
  allotShare?: boolean;
}

const TokenImporter: React.FC<TokenImporterProps> = ({ open, onOpenChange, onSave }): JSX.Element => {
  const { setTokenAddress } = useContext(TokenContext);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(false);

  const { data } = useToken({
    address: address as `0x${string}`,
    enabled: isAddress(address as `0x${string}`),
  });

  useEffect(() => {
    if (data?.address) {
      setTokenAddress(data.address as `0x${string}`);
      setAddress("");
    }
  }, [data?.address, setTokenAddress]);

  const handleDialogOpenChange = (open: boolean) => {
    if (isLoading) return null;

    onOpenChange(open);
    setAddress("");
  };

  const pasteAddressHandler = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 4000));
      setIsAddressLoaded(true);
    } catch (error) {
      console.error("Failed to read text from clipboard:", error);
    }

    setIsLoading(false);
  };

  const onSaveHandler = () => {
    if (onSave) onSave();

    setIsAddressLoaded(false);
    onOpenChange(false);
    setAddress("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={open => handleDialogOpenChange(open)}>
        <DialogContent className="sm:max-w-[393px] gap-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-center gap-2">
                <Icon title="beneficiaries-blue" />

                <h4 className="text-white font-semibold font-grotesque -mt-1">Import Token</h4>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="h-[80px] overflow-hidden absolute left-0 top-[5.5rem] block">
            <Image src={addBeneficiaryBg} className="object-cover w-full h-full" alt="add-beneficiary-bg" />
          </div>

          <div className="h-28 w-28 bg-[#143B5F] flex items-center justify-center mx-auto rounded-full relative mt-12">
            <Icon title="user" />
          </div>

          <h5 className="text-center">Enter token address</h5>

          <DialogFooter className="overflow-hidden">
            <div className="flex items-center justify-between w-full rounded-[10px] bg-backgroundDarker p-4 gap-3">
              <Icon title="wallet-blue" />

              <AddressInput
                name="address"
                value={address}
                onChange={_address => setAddress(_address)}
                placeholder="Token Address or ENS name"
              />

              <span
                className={cn(
                  "flex items-center justify-end gap-2 cursor-pointer hover:opacity-70 transition flex-shrink-0 w-[55px]",
                  isLoading && "pointer-events-none",
                )}
                onClick={pasteAddressHandler}
              >
                {!isLoading && address.length === 0 && !isAddress(address) ? (
                  <>
                    <Icon title="magic-wand" />

                    <h6 className="font-semibold text-[#FFC93F]">Paste</h6>
                  </>
                ) : (
                  <Loader />
                )}
              </span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <LoadAddress
        open={isAddressLoaded}
        onOpenChange={setIsAddressLoaded}
        onSave={onSaveHandler}
        onClose={() => {
          onOpenChange(false);
          setAddress("");
        }}
        tokenShare={25}
        remainingShare={50}
      /> */}
    </>
  );
};

export default TokenImporter;
