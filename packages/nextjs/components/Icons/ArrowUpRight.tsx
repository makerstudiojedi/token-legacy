import { MainIconProps } from "./icons.type";

const ArrowUpRight = ({ width = 20, height = 20, className, onClick }: MainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 1V14C18 14.2652 17.8947 14.5196 17.7071 14.7071C17.5196 14.8946 17.2652 15 17 15C16.7348 15 16.4804 14.8946 16.2929 14.7071C16.1054 14.5196 16 14.2652 16 14V3.41375L1.70751 17.7075C1.51987 17.8951 1.26537 18.0006 1.00001 18.0006C0.734643 18.0006 0.480147 17.8951 0.292507 17.7075C0.104866 17.5199 -0.000549316 17.2654 -0.000549316 17C-0.000549316 16.7346 0.104866 16.4801 0.292507 16.2925L14.5863 2H4.00001C3.73479 2 3.48044 1.89464 3.2929 1.70711C3.10536 1.51957 3.00001 1.26522 3.00001 1C3.00001 0.734784 3.10536 0.48043 3.2929 0.292893C3.48044 0.105357 3.73479 0 4.00001 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8947 0.48043 18 0.734784 18 1Z"
        fill="#efefef"
      />
    </svg>
  );
};

export default ArrowUpRight;
