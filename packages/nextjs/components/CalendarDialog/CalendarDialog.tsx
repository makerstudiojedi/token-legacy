import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~~/components/ui/dialog";

interface CalendarDialogProps {
  currentDate: Date | undefined;
  onApplyDate: (value: Date | undefined) => void;
  children: React.ReactNode;
  isLoading: boolean;
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  currentDate,
  onApplyDate,
  children,
  isLoading,
}): JSX.Element => {
  const [date, setDate] = useState<Date | undefined>(currentDate);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [allowApply, setAllowApply] = useState<boolean>(true);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    setDate(currentDate);
  };

  const handleApplyDate = () => {
    onApplyDate(date);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={open => handleDialogOpenChange(open)}>
        <DialogTrigger>{children}</DialogTrigger>

        <DialogContent className="sm:max-w-[350px] gap-6 select-none">
          <DialogHeader></DialogHeader>

          <div className="mx-auto bg-backgroundDarker rounded-2xl p-[14px] w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-[14px]"
              fromDate={new Date()}
              defaultMonth={date}
              setAllowApply={setAllowApply}
              showOutsideDays={false}
            />
          </div>

          {allowApply && (
            <Button onClick={handleApplyDate} loading={isLoading}>
              Apply date
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarDialog;
