import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface CollapsibleFieldContextData {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CollapsibleFieldContext = createContext<CollapsibleFieldContextData | null>(null);

export const useCollapsibleFieldContext = (): CollapsibleFieldContextData => {
  const context = useContext(CollapsibleFieldContext);

  if (!context) {
    throw new Error("useCollapsibleFieldContext must be used within a MyContextProvider");
  }

  return context;
};

interface CollapsibleFieldContextProviderProps {
  children: React.ReactNode;
}

export const CollapsibleFieldContextProvider = ({ children }: CollapsibleFieldContextProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value: CollapsibleFieldContextData = { isOpen, setIsOpen };

  return <CollapsibleFieldContext.Provider value={value}>{children}</CollapsibleFieldContext.Provider>;
};
