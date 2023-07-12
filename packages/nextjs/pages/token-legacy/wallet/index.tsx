import Image from "next/image";
import avatar from "../../../public/avatar.svg";
import type { NextPage } from "next";
import { AddToClipboard } from "~~/components/AddToClipboard";
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
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.83317 5V2.5C5.83317 2.03976 6.20627 1.66666 6.6665 1.66666H16.6665C17.1267 1.66666 17.4998 2.03976 17.4998 2.5V14.1667C17.4998 14.6269 17.1267 15 16.6665 15H14.1665V17.4992C14.1665 17.9599 13.7916 18.3333 13.3275 18.3333H3.33888C2.87549 18.3333 2.5 17.9628 2.5 17.4992L2.50217 5.83406C2.50225 5.37342 2.8772 5 3.34118 5H5.83317ZM7.49983 5H14.1665V13.3333H15.8332V3.33333H7.49983V5Z"
                  fill="#143B5F"
                />
              </svg>
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
