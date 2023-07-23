import React from "react";
import LogoutIcon from "./LogoutIcon";
import { MainIconProps } from "./icons.type";

const IconsMap = {
  logout: LogoutIcon,
};

interface IconProps extends MainIconProps {
  title: keyof typeof IconsMap;
}

const Icon = ({ title, ...rest }: IconProps) => {
  const IconComponent = IconsMap[title] as React.FC<MainIconProps>;

  return <IconComponent {...rest} />;
};

export default Icon;
