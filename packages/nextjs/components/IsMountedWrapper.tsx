import { useEffect, useState } from "react";

interface IsMountedWrapperProps {
  children: React.ReactNode;
}

const IsMountedWrapper = ({ children }: IsMountedWrapperProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};

export default IsMountedWrapper;
