import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
export function DatePickerWithRange({
  className,
  onChange, 
  startDate,
  endDate,
  startDateLimit,
  endDateLimit,
}: { className: string|null, onChange(value: DateRange|null): void, startDate: Date, endDate: Date|undefined, startDateLimit: Date|null, endDateLimit: Date|null}) {

  console.log("inner startDateLimit: ", startDateLimit);
  console.log("inner endDateLimit: ", endDateLimit);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate ||  Date.now(),
    to: endDate || addDays(Date.now(), 20),
  })

  const handleDateChange = (dateRange: DateRange|undefined) => {
    setDate({
      from: dateRange?.from || startDate,
      to: dateRange?.to || addDays(startDate, 20),
    })
    onChange(dateRange == undefined ? null : dateRange)
  }
 
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            disabled={(day) => {

                console.log(" --- inner startDateLimit: ", startDateLimit);
                console.log(" --- inner endDateLimit: ", endDateLimit);
                
                if (!startDateLimit || !endDateLimit) { return true }
                return day < startDateLimit || day > endDateLimit
              }
          
              
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}