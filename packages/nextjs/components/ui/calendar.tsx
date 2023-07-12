"use client";

import * as React from "react";
import { buttonVariants } from "./button";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker";
import { cn } from "~~/lib/utils";

interface ExtendedCalendarProps {
  setAllowApply: React.Dispatch<React.SetStateAction<boolean>>;
  defaultMonth: Date | undefined;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker> & ExtendedCalendarProps;

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, index) => currentYear + index);

const pageSize = 15;

const paginatedArray = Array.from({ length: Math.ceil(years.length / pageSize) }, (_, index) => {
  const startIndex = index * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    years: years.slice(startIndex, endIndex),
  };
});

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  setAllowApply,
  defaultMonth,
  ...props
}: CalendarProps) {
  const [customDefaultMonth, setCustomDefaultMonth] = React.useState<Date | undefined>(defaultMonth);
  const [showYears, setShowYears] = React.useState<boolean>(false);

  return (
    <div className="w-full">
      {!showYears ? (
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn("p-3", className)}
          month={customDefaultMonth}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-primary hover:text-primary-foreground",
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: cn("flex items-center w-full mt-2", !showOutsideDays && "first:justify-end"),
            cell: "text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary hover:text-primary-foreground",
            ),
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
            day_today: "",
            day_outside: "",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            caption_dropdowns: "bg-red-500 absolute top-0",
            ...classNames,
          }}
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
            Caption: props => (
              <Caption
                {...props}
                setAllowApply={setAllowApply}
                setShowYears={setShowYears}
                setCustomDefaultMonth={setCustomDefaultMonth}
              />
            ),
          }}
          {...props}
          toYear={years[years.length - 1]}
        />
      ) : (
        <Years
          setShowYears={setShowYears}
          setCustomDefaultMonth={setCustomDefaultMonth}
          setAllowApply={setAllowApply}
        />
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

interface CustomCaptionProps extends CaptionProps {
  setAllowApply: React.Dispatch<React.SetStateAction<boolean>>;
  setShowYears: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomDefaultMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function Caption({ displayMonth, setAllowApply, setShowYears, setCustomDefaultMonth }: CustomCaptionProps) {
  const { nextMonth, previousMonth, goToMonth } = useNavigation();

  const formattedMonth = format(displayMonth, "MMMM");

  const formattedYear = format(displayMonth, "yyyy");

  const previousMonthClickHandler = () => {
    if (previousMonth) {
      goToMonth(previousMonth);
      setCustomDefaultMonth(previousMonth);
    }
  };

  const nextMonthClickHandler = () => {
    if (nextMonth) {
      goToMonth(nextMonth);
      setCustomDefaultMonth(nextMonth);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("cursor-pointer hover:opacity-70 transition", previousMonth ? "visible" : "invisible")}
        onClick={previousMonthClickHandler}
      >
        <mask
          id="mask0_113_1928"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect x={24} width={24} height={24} transform="rotate(90 24 0)" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_113_1928)">
          <path
            d="M8.96181 11.9995L14.6156 6.3457L15.6694 7.39953L11.0694 11.9995L15.6694 16.5995L14.6156 17.6534L8.96181 11.9995Z"
            fill="#6484A9"
          />
        </g>
      </svg>

      <p
        className="text-sm text-[#3F5876)] font-medium cursor-pointer hover:opacity-70 transition"
        onClick={() => {
          setShowYears(true);
          setAllowApply(false);
        }}
      >
        {formattedMonth} {formattedYear}
      </p>

      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("cursor-pointer hover:opacity-70 transition", nextMonth ? "visible" : "invisible")}
        onClick={nextMonthClickHandler}
      >
        <mask
          id="mask0_113_1932"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect y={24} width={24} height={24} transform="rotate(-90 0 24)" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_113_1932)">
          <path
            d="M15.0382 12.0005L9.38439 17.6543L8.33057 16.6005L12.9306 12.0005L8.33057 7.40047L9.38439 6.34665L15.0382 12.0005Z"
            fill="#6484A9"
          />
        </g>
      </svg>
    </div>
  );
}

interface YearsProps {
  setAllowApply: React.Dispatch<React.SetStateAction<boolean>>;
  setShowYears: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomDefaultMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function Years({ setShowYears, setCustomDefaultMonth, setAllowApply }: YearsProps) {
  const [currentYearIndex, setCurrentYearIndex] = React.useState<number>(0);

  const yearClickHandler = (year: number) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    let month = 0;

    if (year === currentYear) {
      month = currentMonth;
    }

    const date = new Date(year, month, 1);

    setCustomDefaultMonth(date);
    setShowYears(false);
    setAllowApply(true);
  };

  const nextYearsClickHandler = () => {
    setCurrentYearIndex(prev => prev + 1);
  };

  const prevYearsClickHandler = () => {
    setCurrentYearIndex(prev => prev - 1);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex items-center gap-2 hover:opacity-70 transition",
            currentYearIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer",
          )}
          onClick={prevYearsClickHandler}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask
              id="mask0_113_2599"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <rect x={24} width={24} height={24} transform="rotate(90 24 0)" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_113_2599)">
              <path
                d="M8.96181 11.9995L14.6156 6.3457L15.6694 7.39953L11.0694 11.9995L15.6694 16.5995L14.6156 17.6534L8.96181 11.9995Z"
                fill="#6484A9"
              />
            </g>
          </svg>

          <span className="text-sm">Previous</span>
        </span>

        <span
          className={cn(
            "flex items-center gap-2 cursor-pointer hover:opacity-70 transition",
            currentYearIndex === paginatedArray.length - 1 ? "pointer-events-none opacity-50" : "cursor-pointer",
          )}
          onClick={nextYearsClickHandler}
        >
          <span className="text-sm">Next</span>

          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask
              id="mask0_113_2605"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <rect y={24} width={24} height={24} transform="rotate(-90 0 24)" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_113_2605)">
              <path
                d="M15.0382 12.0005L9.38439 17.6543L8.33057 16.6005L12.9306 12.0005L8.33057 7.40047L9.38439 6.34665L15.0382 12.0005Z"
                fill="#6484A9"
              />
            </g>
          </svg>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-[14px]">
        {paginatedArray[currentYearIndex].years.map(year => (
          <div
            key={year}
            className="bg-[#17304F] rounded-[6px] cursor-pointer hover:opacity-70 transition flex items-center justify-center p-3 text-sm"
            onClick={() => yearClickHandler(year)}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}
