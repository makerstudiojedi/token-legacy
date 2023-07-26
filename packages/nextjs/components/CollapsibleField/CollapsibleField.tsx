import { CollapsibleFieldContextProvider } from "./context";

interface CollapsibleFieldProps {
  children: React.ReactNode;
}

const CollapsibleField = ({ children }: CollapsibleFieldProps) => {
  return (
    <>
      <CollapsibleFieldContextProvider>
        <div className="p-4 rounded-2xl overflow-hidden bg-[#17304F]">{children}</div>
      </CollapsibleFieldContextProvider>
    </>
  );
};

export default CollapsibleField;
