import Image from "next/image";
import avatar from "../../public/avatar.svg";
import type { NextPage } from "next";
import { AddToClipboard } from "~~/components/AddToClipboard";
import Icon from "~~/components/Icons";
import WalletLayout from "~~/components/Layout";
import { Token } from "~~/components/Token";
import { shortenAddress } from "~~/utils/helpers";

const TokensPage: NextPage = (): JSX.Element => {
  const address = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  return (
    <WalletLayout>
      <div className="-mt-14 z-20 relative">
        <div className="max-w-[353px] mx-auto">
          <div className="w-28 h-28 rounded-full mx-auto border-[4px] border-[#1B4A76]">
            <Image src={avatar} className="object-cover w-full h-full" alt="tokens-bg" />
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <h3 className="font-grotesque font-bold">{shortenAddress(address)}</h3>

            <AddToClipboard text={address} copiedText="Token Address copied!">
              <Icon title="copy" />
            </AddToClipboard>
          </div>

          <div className="mt-14 space-y-2">
            <Token permissionGranted={false} />
            <Token permissionGranted={true} />
            <Token permissionGranted={false} />
          </div>
        </div>
      </div>
    </WalletLayout>
  );
};

export default TokensPage;
