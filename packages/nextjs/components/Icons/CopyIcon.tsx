import { MainIconProps } from "./icons.type";

const CopyIcon = ({ width = 20, height = 20, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83317 5V2.5C5.83317 2.03976 6.20627 1.66666 6.6665 1.66666H16.6665C17.1267 1.66666 17.4998 2.03976 17.4998 2.5V14.1667C17.4998 14.6269 17.1267 15 16.6665 15H14.1665V17.4992C14.1665 17.9599 13.7916 18.3333 13.3275 18.3333H3.33888C2.87549 18.3333 2.5 17.9628 2.5 17.4992L2.50217 5.83406C2.50225 5.37342 2.8772 5 3.34118 5H5.83317ZM7.49983 5H14.1665V13.3333H15.8332V3.33333H7.49983V5Z"
        fill="#143B5F"
      />
    </svg>
  );
};

export default CopyIcon;
