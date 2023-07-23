import type { MainIconProps } from "./icons.type";

const WalletBlueIcon = ({ width = 24, height = 24, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.00488 9H21.0049C21.5572 9 22.0049 9.44772 22.0049 10V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V9ZM3.00488 3H18.0049V7H2.00488V4C2.00488 3.44772 2.4526 3 3.00488 3ZM15.0049 14V16H18.0049V14H15.0049Z"
        fill="#43A5FF"
      />
    </svg>
  );
};

export default WalletBlueIcon;
