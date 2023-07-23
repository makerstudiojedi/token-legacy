import type { MainIconProps } from "./icons.type";

const ApproximateIcon = ({ width = 24, height = 24, className, onClick }: MainIconProps) => {
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
        d="M3.5 7.5C3.5 7.5 7.55 10.875 12.5 7.5C17.45 4.125 21.5 7.5 21.5 7.5"
        stroke="#3F5876"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M3.5 16.5C3.5 16.5 7.55 19.875 12.5 16.5C17.45 13.125 21.5 16.5 21.5 16.5"
        stroke="#3F5876"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ApproximateIcon;
