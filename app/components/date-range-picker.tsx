import { CalendarIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "app/lib/utils";
import { Button } from "app/components/ui/button";
import { Calendar } from "app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover";

export function CalendarDateRangePicker({
  dateRange,
  onChange,
}: {
  dateRange: DateRange | undefined;
  onChange: (dateRange: DateRange | undefined) => void;
}) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange?.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={{ from: dateRange?.from, to: dateRange?.to }}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
