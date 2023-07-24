import { useRouter } from "next/router";
import type { NextPage } from "next";
import { AddToClipboard } from "~~/components/AddToClipboard";
import Icon from "~~/components/Icons";
import WalletLayout from "~~/components/Layout";
import { Token } from "~~/components/Token";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { shortenAddress } from "~~/utils/helpers";

const TokensPage: NextPage = (): JSX.Element => {
  const router = useRouter();

  const address = (router.query.legacyAddress ?? "") as string;

  return (
    <WalletLayout>
      <div className="-mt-14 z-20 relative">
        <div className="max-w-[353px] mx-auto">
          <div className="w-28 h-28 rounded-full mx-auto border-[4px] border-[#1B4A76]">
            <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
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
