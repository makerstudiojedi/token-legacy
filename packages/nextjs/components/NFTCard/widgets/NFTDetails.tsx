import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import NFTEditor from "./NFTEditor";
import { CollapsibleField, CollapsibleFieldContent, CollapsibleFieldHeader } from "~~/components/CollapsibleField";
import Icon from "~~/components/Icons";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { shortenAddress } from "~~/utils/helpers";

interface NFTDetailsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  address: string;
  readOnly?: boolean;
}

const NFTDetails = ({ isOpen, setIsOpen, address, readOnly = false }: NFTDetailsProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  // This is to simulate token claimed or not. Test purposes only
  const isClaimed = false;

  return (
    <>
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
                Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
              </p>

              <p className="text-sm mt-2 text-[#587698]">
                Why do we use it? It is a long established fact that a reader will be distracted by the readable content
                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using, making it look like readable English. Many desktop
              </p>
            </CollapsibleFieldContent>
          </CollapsibleField>

          <div>
            <div className="flex items-center justify-between bg-[#1E4069] rounded-[10px] p-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full relative overflow-hidden block">
                  <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
                </span>

                {!readOnly ? (
                  <p className="font-bold">{shortenAddress(address)}</p>
                ) : (
                  <p className="font-bold">emu.eth</p>
                )}
              </div>

              {!readOnly ? (
                <span
                  className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition"
                  onClick={() => setIsEditorOpen(true)}
                >
                  <Icon title="pencil-edit" />
                  Edit
                </span>
              ) : (
                <div>
                  {isClaimed ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full block bg-[#99E8A1]"></span>
                      <p className="font-medium">Claimed</p>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full block bg-[#FFC93F]"></span>
                      <p className="font-medium">Unclaimed</p>
                    </span>
                  )}
                </div>
              )}
            </div>

            {readOnly && (
              <>
                {isClaimed ? (
                  <Button className="w-full mt-4">Disable Claim</Button>
                ) : (
                  <Button className="w-full mt-4">Claim</Button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {!readOnly && <NFTEditor open={isEditorOpen} onOpenChange={setIsEditorOpen} />}
    </>
  );
};

export default NFTDetails;
