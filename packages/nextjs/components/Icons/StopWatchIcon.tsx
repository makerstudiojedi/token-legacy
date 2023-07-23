import type { MainIconProps } from "./icons.type";

const StopWatchIcon = ({ width = 25, height = 25, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.95946 6.82305C8.49914 5.59142 10.4521 4.85495 12.5771 4.85495C14.7021 4.85495 16.6551 5.59142 18.1948 6.82305L19.6482 5.36967L21.0624 6.78388L19.609 8.23726C20.8406 9.77694 21.5771 11.7299 21.5771 13.8549C21.5771 18.8256 17.5477 22.8549 12.5771 22.8549C7.60659 22.8549 3.57715 18.8256 3.57715 13.8549C3.57715 11.7299 4.31362 9.77694 5.54525 8.23726L4.09187 6.78388L5.50608 5.36967L6.95946 6.82305ZM13.5771 12.8549V8.35015L8.57715 14.8549H11.5771V19.3549L16.5771 12.8549H13.5771ZM8.57715 1.85495H16.5771V3.85495H8.57715V1.85495Z"
        fill="#6F8CB1"
      />
    </svg>
  );
};

export default StopWatchIcon;
