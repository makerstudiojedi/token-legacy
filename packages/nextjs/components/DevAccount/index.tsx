import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const DevAccount = () => {
  return (
    <div className="fixed w-full bottom-4">
      <div className="flex flex-1 justify-center">
        <div className="flex max-w-md p-2 bg-blue-950 items-center justify-center rounded">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </div>
  );
};

export default DevAccount;
