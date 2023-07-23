import type { MainIconProps } from "./icons.type";

const LineIcon = ({ width = 1, height = 12, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 1 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2={12} stroke="#273B53" />
    </svg>
  );
};

export default LineIcon;
