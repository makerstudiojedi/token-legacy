import Image from "next/image";
import tokensBg from "../public/tokens-bg.svg";
import Icon from "./Icons";
import IsMountedWrapper from "./IsMountedWrapper";
import { Navbar } from "./Navbar";

export default function WalletLayout({ children }: { children: React.ReactNode }) {
  return (
    <IsMountedWrapper>
      <div className="min-h-screen flex flex-col pb-16">
        <Navbar />

        <div className="container pb-24 flex-1">
          <div className="h-[160px] overflow-hidden bg-backgroundDarker rounded-[32px] mt-6 ">
            <Image src={tokensBg} className="object-cover w-full h-full" alt="tokens-bg" />
          </div>

          {children}
        </div>

        <footer className="flex-shrink-0 flex items-center justify-center">
          <span className="flex items-center gap-2">
            <Icon title="calendar" className="[&_path]:fill-[#3F5876]" />

            <p className="text-[#3F5876]">73000 days to release</p>
          </span>
        </footer>
      </div>
    </IsMountedWrapper>
  );
}
