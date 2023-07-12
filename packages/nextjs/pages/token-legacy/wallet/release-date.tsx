import { useState } from "react";
import type { NextPage } from "next";
import { CalendarDialog } from "~~/components/CalendarDialog";
import WalletLayout from "~~/components/Layout";
import { Button } from "~~/components/ui/button";
import { toast } from "~~/components/ui/use-toast";
import { cn } from "~~/lib/utils";

const ReleaseDatePage: NextPage = (): JSX.Element => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDateChanged, setIsDateChanged] = useState<boolean>(false);

  const onApplyDateHandler = (newDate: Date | undefined) => {
    setDate(newDate);
    setIsDateChanged(true);
  };

  const onSaveDateHandler = async () => {
    if (typeof date === "undefined") {
      return toast({
        variant: "destructive",
        description: "Please select a date",
      });
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      // router.push("/wallet")

      toast({
        variant: "default",
        description: "A new release date has been set successfully",
      });
    } catch (error) {
      setIsLoading(false);

      toast({
        variant: "destructive",
        description: "An error occured. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <WalletLayout>
      <div className="mt-16">
        <div className="max-w-[370px] mx-auto text-center">
          <CalendarDialog currentDate={date} onApplyDate={onApplyDateHandler} />

          <h6 className="mt-4">on this day, tokens allocated will be released</h6>

          <Button
            className={cn("mt-14", isDateChanged ? "" : "bg-[#273B53] border border-[#587698] text-white")}
            variant={isDateChanged ? "default" : "secondary"}
            disabled={date ? false : true}
            loading={isLoading}
            onClick={onSaveDateHandler}
          >
            Save date
          </Button>
        </div>
      </div>
    </WalletLayout>
  );
};

export default ReleaseDatePage;
