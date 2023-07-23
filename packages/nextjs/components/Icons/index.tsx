import React from "react";
import ApproximateIcon from "./ApproximateIcon";
import BeneficiariesBlueIcon from "./BeneficiariesBlueIcon";
import BeneficiariesIcon from "./BeneficiariesIcon";
import ChevronLeftIcon from "./ChevronLeftIcon";
import CopyIcon from "./CopyIcon";
import CopyPurpleIcon from "./CopyPurpleIcon";
import DeleteIcon from "./DeleteIcon";
import DeleteOrangeIcon from "./DeleteOrangeIcon";
import EditIcon from "./EditIcon";
import ImportIcon from "./ImportIcon";
import ImportantIcon from "./ImportantIcon";
import LineIcon from "./LineIcon";
import LogoutIcon from "./LogoutIcon";
import MagicWandIcon from "./MagicWandIcon";
import StarIcon from "./StarIcon";
import StopWatchIcon from "./StopWatchIcon";
import UserIcon from "./UserIcon";
import UsersIcon from "./UsersIcon";
import WalletBlueIcon from "./WalletBlueIcon";
import { MainIconProps } from "./icons.type";

const IconsMap = {
  logout: LogoutIcon,
  users: UsersIcon,
  copy: CopyIcon,
  star: StarIcon,
  approximate: ApproximateIcon,
  beneficiaries: BeneficiariesIcon,
  important: ImportantIcon,
  user: UserIcon,
  delete: DeleteIcon,
  "wallet-blue": WalletBlueIcon,
  "magic-wand": MagicWandIcon,
  "beneficiaries-blue": BeneficiariesBlueIcon,
  "stop-watch": StopWatchIcon,
  import: ImportIcon,
  "chevron-left": ChevronLeftIcon,
  "copy-purple": CopyPurpleIcon,
  edit: EditIcon,
  "delete-orange": DeleteOrangeIcon,
  line: LineIcon,
};

interface IconProps extends MainIconProps {
  title: keyof typeof IconsMap;
}

const Icon = ({ title, ...rest }: IconProps) => {
  const IconComponent = IconsMap[title] as React.FC<MainIconProps>;

  return <IconComponent {...rest} />;
};

export default Icon;
