import { useCollapsibleFieldContext } from "./context";
import { cn } from "~~/lib/utils";

interface CollapsibleFieldHeaderProps {
  children: React.ReactNode;
}

const CollapsibleFieldHeader = ({ children }: CollapsibleFieldHeaderProps) => {
  const { isOpen, setIsOpen } = useCollapsibleFieldContext();

  return (
    <div className="flex items-center justify-between" onClick={() => setIsOpen(prevState => !prevState)}>
      {children}

      <span className="w-6 h-6 cursor-pointer flex items-center justify-center hover:opacity-75 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn("transition-all duration-300 ease-in-out fill-[#265083]", isOpen && "rotate-180")}
          width={18}
          height={18}
          viewBox="0 0 256 256"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </span>
    </div>
  );
};

export default CollapsibleFieldHeader;
