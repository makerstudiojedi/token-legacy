import type { MainIconProps } from "./icons.type";

const DeleteOrangeIcon = ({ width = 47, height = 46, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 47 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.16634 15.3333H38.833V40.2499C38.833 41.3085 37.9749 42.1666 36.9163 42.1666H10.083C9.02447 42.1666 8.16634 41.3085 8.16634 40.2499V15.3333ZM13.9163 9.58325V5.74992C13.9163 4.69138 14.7745 3.83325 15.833 3.83325H31.1663C32.2249 3.83325 33.083 4.69138 33.083 5.74992V9.58325H42.6663V13.4166H4.33301V9.58325H13.9163ZM17.7497 7.66659V9.58325H29.2497V7.66659H17.7497ZM17.7497 22.9999V34.4999H21.583V22.9999H17.7497ZM25.4163 22.9999V34.4999H29.2497V22.9999H25.4163Z"
        fill="#FF7527"
      />
    </svg>
  );
};

export default DeleteOrangeIcon;
