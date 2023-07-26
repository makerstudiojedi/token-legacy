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

      {children}
    </div>
  );
};

export default CollapsibleFieldContent;
