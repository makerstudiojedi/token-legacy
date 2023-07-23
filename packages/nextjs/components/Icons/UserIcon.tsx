import type { MainIconProps } from "./icons.type";

const UserIcon = ({ width = 60, height = 72, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 60 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="29.79"
        cy="19.2558"
        rx="10.8838"
        ry="10.8837"
        stroke="#FF7527"
        strokeWidth="2.51163"
        strokeMiterlimit={10}
        strokeLinejoin="round"
      />
      <path
        d="M7.18508 46.0465C7.18508 36.3366 17.3056 35.1628 29.7898 35.1628C42.274 35.1628 52.3945 36.3366 52.3945 46.0465C52.3945 55.7564 42.2741 63.6279 29.7898 63.6279C17.3056 63.6279 7.18508 55.7564 7.18508 46.0465Z"
        stroke="#FF7527"
        strokeWidth="2.51163"
        strokeMiterlimit={10}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
