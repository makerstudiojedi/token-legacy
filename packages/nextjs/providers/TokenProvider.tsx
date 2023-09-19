import { ReactNode, createContext, useCallback, useState } from "react";
import { TokenDialog, TokenImporter } from "~~/components/Token";

type TokenContextProps = {
  tokenAddress: `0x${string}` | undefined;
  setTokenAddress: (address?: `0x${string}`) => void;
  toggleTokenImporter: (open: boolean) => void;
};

export const TokenContext = createContext<TokenContextProps>({
  tokenAddress: "" as `0x${string}`,
  setTokenAddress: () => null,
  toggleTokenImporter: () => null,
});

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | undefined>();
  const [openTokenDialog, setOpenTokenDialog] = useState(false);
  const [openImporter, setOpenImporter] = useState(false);

  const handleSetTokenAddress = useCallback((token?: `0x${string}`) => {
    setOpenImporter(false);
    setOpenTokenDialog(!!token);
    if (token) {
      setTokenAddress(token);
    }
  }, []);

  const handleImporterModal = useCallback((open: boolean) => {
    setTokenAddress(undefined);
    setOpenImporter(open);
  }, []);

  return (
    <TokenContext.Provider
      value={{ tokenAddress, setTokenAddress: handleSetTokenAddress, toggleTokenImporter: handleImporterModal }}
    >
      {children}
      <TokenImporter open={openImporter} onOpenChange={() => handleImporterModal(false)} onSave={() => null} />
      <TokenDialog open={openTokenDialog} onOpenChange={() => handleSetTokenAddress(undefined)} token={tokenAddress} />
    </TokenContext.Provider>
  );
};

export default TokenProvider;
