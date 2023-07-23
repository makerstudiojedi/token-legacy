import type { MainIconProps } from "./icons.type";

const DeleteIcon = ({ width = 25, height = 24, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M4.5 8H20.5V21C20.5 21.5523 20.0523 22 19.5 22H5.5C4.94772 22 4.5 21.5523 4.5 21V8ZM7.5 5V3C7.5 2.44772 7.94772 2 8.5 2H16.5C17.0523 2 17.5 2.44772 17.5 3V5H22.5V7H2.5V5H7.5ZM9.5 4V5H15.5V4H9.5ZM9.5 12V18H11.5V12H9.5ZM13.5 12V18H15.5V12H13.5Z"
        fill="white"
      />
    </svg>
  );
};

export default DeleteIcon;
