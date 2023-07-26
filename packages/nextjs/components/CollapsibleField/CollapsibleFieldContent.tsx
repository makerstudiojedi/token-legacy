import { useCollapsibleFieldContext } from "./context";

interface CollapsibleFieldContentProps {
  children: React.ReactNode;
}

const CollapsibleFieldContent = ({ children }: CollapsibleFieldContentProps) => {
  const { isOpen } = useCollapsibleFieldContext();

  if (!isOpen) return null;

  return (
    <div>
      <div className="h-px bg-[#265083] my-5"></div>

      <div className="px-2 pb-2">{children}</div>
    </div>
  );
};

export default CollapsibleFieldContent;
