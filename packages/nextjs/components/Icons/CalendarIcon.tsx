import type { MainIconProps } from "./icons.type";

const CalendarIcon = ({ width = 20, height = 21, className, onClick }: MainIconProps) => {
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
        d="M14.166 3.42744H17.4994C17.9596 3.42744 18.3327 3.80054 18.3327 4.26078V17.5941C18.3327 18.0544 17.9596 18.4275 17.4994 18.4275H2.49935C2.03912 18.4275 1.66602 18.0544 1.66602 17.5941V4.26078C1.66602 3.80054 2.03912 3.42744 2.49935 3.42744H5.83269V1.76077H7.49936V3.42744H12.4994V1.76077H14.166V3.42744ZM3.33269 8.42746V16.7608H16.6661V8.42746H3.33269ZM4.99936 10.0941H6.66603V11.7608H4.99936V10.0941ZM9.16604 10.0941H10.8327V11.7608H9.16604V10.0941ZM13.3327 10.0941H14.9994V11.7608H13.3327V10.0941Z"
        fill="#4A6E9A"
      />
    </svg>
  );
};

export default CalendarIcon;
