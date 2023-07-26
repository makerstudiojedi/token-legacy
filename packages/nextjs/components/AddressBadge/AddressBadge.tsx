import { BlockieAvatar } from "../scaffold-eth";
import { shortenAddress } from "~~/utils/helpers";

interface AddressBadgeProps {
  address: string;
  onClick?: () => void;
}

const AddressBadge = ({ address, onClick }: AddressBadgeProps) => {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl border border-[#1E4069] cursor-pointer hover:opacity-70 transition"
      onClick={onClick}
    >
      <span className="w-6 h-6 rounded-full block relative">
        <BlockieAvatar address={address} size={200} className="object-cover w-full h-full blockie-avatar" />
      </span>

      <h1 className="text-lg font-bold">{shortenAddress(address)}</h1>
    </div>
  );
};

export default AddressBadge;
