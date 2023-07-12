import Image from "next/image";
import tokensBg from "../public/tokens-bg.svg";
import { Navbar } from "./Navbar";

export default function WalletLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <div className="container pb-20">
        <div className="h-[160px] overflow-hidden bg-backgroundDarker rounded-[32px] mt-6 ">
          <Image src={tokensBg} className="object-cover w-full h-full" alt="tokens-bg" />
        </div>

        {children}

        {/* <footer>73000 days to release</footer> */}
      </div>
    </>
  );
}
