"use client";

import * as React from "react";
import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
import { PropsBase, PropsSingle, DayEventHandler } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { CalendarIcon } from "../Icons/CalendarIcon";

type DesktopDatePickerProps = PropsBase &
  Omit<PropsSingle, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: Date;
    required?: boolean;
    closeOnSelect?: boolean;
  };

const DesktopDatePicker: React.FC<DesktopDatePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  calendarClassName,
  closeOnSelect,
  onDayClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDayClick: DayEventHandler<React.MouseEvent<Element, MouseEvent>> = (date, modifiers, e) => {
    onDayClick?.(date, modifiers, e);
    if (closeOnSelect) setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "border-gray-300 text-text focus:ring-0 active:ring-transparent justify-start",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          {selected ? format(selected, formatStr ?? "yyyy/MM/dd") : <span>{placeholder ?? "Pick a date"}</span>}
          <CalendarIcon className="mr-2 h-5 w-5 ms-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          mode="single"
          selected={selected}
          captionLayout="dropdown-years"
          className={calendarClassName}
          onDayClick={handleDayClick}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DesktopDatePicker, type DesktopDatePickerProps };
