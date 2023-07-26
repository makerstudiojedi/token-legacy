import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { CollapsibleField, CollapsibleFieldContent, CollapsibleFieldHeader } from "~~/components/CollapsibleField";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { shortenAddress } from "~~/utils/helpers";

interface NFTDetailsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  address: string;
}

const NFTDetails = ({ isOpen, setIsOpen, address }: NFTDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[393px] gap-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <span className="w-[42px] h-[42px] rounded-full relative overflow-hidden block">
                <Image
                  src={"https://ik.imagekit.io/bayc/assets/ape3.png"}
                  fill
                  alt="bored-apes"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </span>

              <div className="mt-1">
                <p className="font-bold text-white">NFT name</p>

                <p className="text-[#3F5876] text-sm font-semibold mt-1">Collection</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="h-[230px] rounded-[8px] relative overflow-hidden">
          <Image
            src={"https://ik.imagekit.io/bayc/assets/ape3.png"}
            fill
            alt="bored-apes"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="text-center">
          <p>Token ID</p>
        </div>

        <CollapsibleField>
          <CollapsibleFieldHeader>
            <div className="flex items-center gap-3">
              <span className="w-[42px] h-[42px] rounded-full relative overflow-hidden block">
                <Image
                  src={"https://ik.imagekit.io/bayc/assets/ape3.png"}
                  fill
                  alt="bored-apes"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </span>

              <div>
                <p className="text-[#6484A9] font-bold">Bored Apes Collection</p>
              </div>
            </div>
          </CollapsibleFieldHeader>

          <CollapsibleFieldContent>
            <h1 className="text-xl font-semibold mb-3">Description</h1>

            <p className="text-sm text-[#587698]">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not only five centuries, but also
            </p>

            <p className="text-sm mt-2 text-[#587698]">
              Why do we use it? It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using, making it look like readable English. Many desktop
            </p>
          </CollapsibleFieldContent>
        </CollapsibleField>

        <div className="flex items-center justify-between bg-[#1E4069] rounded-[10px] p-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full relative overflow-hidden block">
              <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
            </span>

            <p className="font-bold">{shortenAddress(address)}</p>
          </div>

          <span className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition">
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.7594 5.73184L14.268 2.24122C14.1519 2.12511 14.0141 2.03301 13.8624 1.97018C13.7107 1.90734 13.5482 1.875 13.384 1.875C13.2198 1.875 13.0572 1.90734 12.9056 1.97018C12.7539 2.03301 12.6161 2.12511 12.5 2.24122L2.86641 11.8748C2.74983 11.9905 2.65741 12.1281 2.59451 12.2798C2.5316 12.4315 2.49948 12.5942 2.50001 12.7584V16.2498C2.50001 16.5813 2.6317 16.8993 2.86612 17.1337C3.10054 17.3681 3.41849 17.4998 3.75001 17.4998H16.875C17.0408 17.4998 17.1997 17.434 17.3169 17.3168C17.4342 17.1995 17.5 17.0406 17.5 16.8748C17.5 16.7091 17.4342 16.5501 17.3169 16.4329C17.1997 16.3157 17.0408 16.2498 16.875 16.2498H9.00938L17.7594 7.49981C17.8755 7.38373 17.9676 7.24592 18.0304 7.09425C18.0933 6.94257 18.1256 6.78 18.1256 6.61583C18.1256 6.45165 18.0933 6.28908 18.0304 6.13741C17.9676 5.98573 17.8755 5.84792 17.7594 5.73184ZM15 8.49122L11.5094 4.99981L13.3844 3.12481L16.875 6.61622L15 8.49122Z"
                fill="#4A6E9A"
              />
            </svg>
            Edit
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFTDetails;
