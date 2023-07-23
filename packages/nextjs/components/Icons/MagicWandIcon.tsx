import type { MainIconProps } from "./icons.type";

const MagicWandIcon = ({ width = 16, height = 16, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5005 9.5C15.5005 9.63261 15.4478 9.75979 15.354 9.85355C15.2603 9.94732 15.1331 10 15.0005 10H14.0005V11C14.0005 11.1326 13.9478 11.2598 13.854 11.3536C13.7603 11.4473 13.6331 11.5 13.5005 11.5C13.3679 11.5 13.2407 11.4473 13.1469 11.3536C13.0532 11.2598 13.0005 11.1326 13.0005 11V10H12.0005C11.8679 10 11.7407 9.94732 11.6469 9.85355C11.5532 9.75979 11.5005 9.63261 11.5005 9.5C11.5005 9.36739 11.5532 9.24021 11.6469 9.14645C11.7407 9.05268 11.8679 9 12.0005 9H13.0005V8C13.0005 7.86739 13.0532 7.74021 13.1469 7.64645C13.2407 7.55268 13.3679 7.5 13.5005 7.5C13.6331 7.5 13.7603 7.55268 13.854 7.64645C13.9478 7.74021 14.0005 7.86739 14.0005 8V9H15.0005C15.1331 9 15.2603 9.05268 15.354 9.14645C15.4478 9.24021 15.5005 9.36739 15.5005 9.5ZM3.50047 4.5H4.50047V5.5C4.50047 5.63261 4.55315 5.75979 4.64692 5.85355C4.74069 5.94732 4.86787 6 5.00047 6C5.13308 6 5.26026 5.94732 5.35403 5.85355C5.4478 5.75979 5.50047 5.63261 5.50047 5.5V4.5H6.50047C6.63308 4.5 6.76026 4.44732 6.85403 4.35355C6.9478 4.25979 7.00047 4.13261 7.00047 4C7.00047 3.86739 6.9478 3.74021 6.85403 3.64645C6.76026 3.55268 6.63308 3.5 6.50047 3.5H5.50047V2.5C5.50047 2.36739 5.4478 2.24021 5.35403 2.14645C5.26026 2.05268 5.13308 2 5.00047 2C4.86787 2 4.74069 2.05268 4.64692 2.14645C4.55315 2.24021 4.50047 2.36739 4.50047 2.5V3.5H3.50047C3.36787 3.5 3.24069 3.55268 3.14692 3.64645C3.05315 3.74021 3.00047 3.86739 3.00047 4C3.00047 4.13261 3.05315 4.25979 3.14692 4.35355C3.24069 4.44732 3.36787 4.5 3.50047 4.5ZM11.5005 12H11.0005V11.5C11.0005 11.3674 10.9478 11.2402 10.854 11.1464C10.7603 11.0527 10.6331 11 10.5005 11C10.3679 11 10.2407 11.0527 10.1469 11.1464C10.0532 11.2402 10.0005 11.3674 10.0005 11.5V12H9.50047C9.36787 12 9.24069 12.0527 9.14692 12.1464C9.05315 12.2402 9.00047 12.3674 9.00047 12.5C9.00047 12.6326 9.05315 12.7598 9.14692 12.8536C9.24069 12.9473 9.36787 13 9.50047 13H10.0005V13.5C10.0005 13.6326 10.0532 13.7598 10.1469 13.8536C10.2407 13.9473 10.3679 14 10.5005 14C10.6331 14 10.7603 13.9473 10.854 13.8536C10.9478 13.7598 11.0005 13.6326 11.0005 13.5V13H11.5005C11.6331 13 11.7603 12.9473 11.854 12.8536C11.9478 12.7598 12.0005 12.6326 12.0005 12.5C12.0005 12.3674 11.9478 12.2402 11.854 12.1464C11.7603 12.0527 11.6331 12 11.5005 12ZM13.7073 5L5.00047 13.7069C4.81296 13.8943 4.5587 13.9995 4.2936 13.9995C4.0285 13.9995 3.77424 13.8943 3.58672 13.7069L2.29297 12.4144C2.20009 12.3215 2.12641 12.2113 2.07614 12.0899C2.02587 11.9686 2 11.8385 2 11.7072C2 11.5758 2.02587 11.4458 2.07614 11.3245C2.12641 11.2031 2.20009 11.0929 2.29297 11L11.0005 2.29312C11.0933 2.20024 11.2036 2.12656 11.3249 2.07629C11.4463 2.02602 11.5763 2.00015 11.7077 2.00015C11.839 2.00015 11.9691 2.02602 12.0904 2.07629C12.2117 2.12656 12.322 2.20024 12.4148 2.29312L13.7073 3.58562C13.8002 3.67849 13.8739 3.78874 13.9242 3.91008C13.9745 4.03142 14.0003 4.16147 14.0003 4.29281C14.0003 4.42415 13.9745 4.55421 13.9242 4.67555C13.8739 4.79689 13.8002 4.90714 13.7073 5ZM13.0005 4.29313L11.7073 3L9.70735 5L11.0005 6.29313L13.0005 4.29313Z"
        fill="#FFC93F"
      />
    </svg>
  );
};

export default MagicWandIcon;