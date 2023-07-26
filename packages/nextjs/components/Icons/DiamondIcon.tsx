import type { MainIconProps } from "./icons.type";

const DiamondIcon = ({ width = 20, height = 21, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0033 19.2637C5.40089 19.2637 1.66992 15.5328 1.66992 10.9304C1.66992 6.32807 5.40089 2.59711 10.0033 2.59711C14.6056 2.59711 18.3366 6.32807 18.3366 10.9304C18.3366 15.5328 14.6056 19.2637 10.0033 19.2637ZM7.91992 8.43044L5.83659 10.5137L10.0026 14.6804L14.1699 10.5137L12.0866 8.43044H7.91992Z"
        fill="#4A6E9A"
      />
    </svg>
  );
};

export default DiamondIcon;
