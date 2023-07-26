import { useState } from "react";
import Image from "next/image";
import NFTDetails from "./widgets/NFTDetails";

const NFTCard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const address = "0x9c68C50bb36c453Ef873A5F437e5Cb16e8f48a62";

  return (
    <>
      <div className="cursor-pointer hover:opacity-80 transition" onClick={() => setIsOpen(true)}>
        <div className="h-40 rounded overflow-hidden relative">
          <Image
            src={"https://ik.imagekit.io/bayc/assets/ape3.png"}
            fill
            alt="bored-apes"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="mt-2">
          <p className="font-bold text-white">NFT name</p>

          <p className="text-[#3F5876] text-sm font-semibold mt-1">Token ID</p>
        </div>
      </div>

      <NFTDetails isOpen={isOpen} setIsOpen={setIsOpen} address={address} />
    </>
  );
};

export default NFTCard;
