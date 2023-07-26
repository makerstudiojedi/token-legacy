import { MainIconProps } from "./icons.type";

const StopWatchWarningIcon = ({ width, height, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_337_7515)">
        <path
          d="M3.59988 2.98628C4.33306 2.39979 5.26306 2.04909 6.27497 2.04909C7.28688 2.04909 8.21688 2.39979 8.95007 2.98628L9.64216 2.29419L10.3156 2.96762L9.6235 3.65971C10.21 4.39289 10.5607 5.3229 10.5607 6.3348C10.5607 8.70175 8.64192 10.6205 6.27497 10.6205C3.90804 10.6205 1.98926 8.70175 1.98926 6.3348C1.98926 5.3229 2.33996 4.39289 2.92645 3.65971L2.23436 2.96762L2.9078 2.29419L3.59988 2.98628ZM6.75116 5.85861V3.71347L4.37021 6.81099H5.79878V8.95385L8.17973 5.85861H6.75116ZM4.37021 0.620514H8.17973V1.57289H4.37021V0.620514Z"
          fill="#FFC93F"
        />
      </g>
      <defs>
        <clipPath id="clip0_337_7515">
          <rect width="11.4286" height="11.4286" fill="white" transform="translate(0.560547 0.144318)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StopWatchWarningIcon;
