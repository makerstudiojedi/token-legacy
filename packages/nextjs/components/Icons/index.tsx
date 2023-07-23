import React from "react";
import LogoutIcon from "./LogoutIcon";
import { MainIconProps } from "./icons.type";

const IconsMap: Record<string, React.FC<MainIconProps>> = {
  logout: LogoutIcon,
};

interface IconProps extends MainIconProps {
  title: keyof typeof IconsMap;
}

const Icon = ({ title, ...rest }: IconProps) => {
  const IconComponent = IconsMap[title];

  return <IconComponent {...rest} />;
};

export default Icon;
