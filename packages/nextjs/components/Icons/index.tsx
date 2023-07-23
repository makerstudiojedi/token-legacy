import React from "react";
import LogoutIcon from "./LogoutIcon";
import { MainIconProps } from "./icons.type";

interface IconProps extends MainIconProps {
  title:
    | "logout"
    | "copy"
    | "users"
    | "star"
    | "approximate"
    | "beneficiaries"
    | "important"
    | "user"
    | "wallet-blue"
    | "magic-wand"
    | "beneficiaries-blue"
    | "line"
    | "stop-watch"
    | "import"
    | "chevron-left"
    | "copy-purple"
    | "edit"
    | "delete"
    | "delete-orange";
}

const IconsMap: Record<string, React.FC<MainIconProps>> = {
  logout: LogoutIcon,
};

const Icon = ({ title, ...rest }: IconProps) => {
  const IconComponent = IconsMap[title];

  return <IconComponent {...rest} />;
};

export default Icon;
