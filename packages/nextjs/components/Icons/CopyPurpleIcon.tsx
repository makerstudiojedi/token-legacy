import type { MainIconProps } from "./icons.type";

const CopyPurpleIcon = ({ width = 21, height = 20, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33317 5V2.5C6.33317 2.03976 6.70627 1.66666 7.1665 1.66666H17.1665C17.6267 1.66666 17.9998 2.03976 17.9998 2.5V14.1667C17.9998 14.6269 17.6267 15 17.1665 15H14.6665V17.4992C14.6665 17.9599 14.2916 18.3333 13.8275 18.3333H3.83888C3.37549 18.3333 3 17.9628 3 17.4992L3.00217 5.83406C3.00225 5.37342 3.3772 5 3.84118 5H6.33317ZM7.99983 5H14.6665V13.3333H16.3332V3.33333H7.99983V5Z"
        fill="#AC43FF"
      />
    </svg>
  );
};

export default CopyPurpleIcon;
