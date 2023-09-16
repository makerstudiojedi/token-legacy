import { useNetwork } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const DevAccount = () => {
  const { chain } = useNetwork();

  return chain && chain?.id !== 31337 ? (
    <div className="fixed w-full bottom-4">
      <div className="flex flex-1 justify-center">
        <div className="flex max-w-md p-2 bg-blue-950 items-center justify-center rounded">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </div>
  ) : null;
};

export default DevAccount;
