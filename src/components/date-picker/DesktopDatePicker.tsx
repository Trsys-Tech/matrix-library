"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";
import { PropsBase, PropsSingle, DayEventHandler } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

type DesktopDatePickerProps = PropsBase &
  Omit<PropsSingle, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: Date;
    required?: boolean;
    closeOnSelect?: boolean;
    disabled?: boolean;
  };

const DesktopDatePicker: React.FC<DesktopDatePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  calendarClassName,
  closeOnSelect = true,
  onDayClick,
  disabled,
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
          variant="text"
          className={cn(
            "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
            className,
          )}
          data-placeholder={!selected ? "" : undefined}
          aria-label={selected ? `Selected date: ${format(selected, formatStr ?? "yyyy/MM/dd")}` : "Pick a date"}
          disabled={disabled}
        >
          {selected ? format(selected, formatStr ?? "yyyy/MM/dd") : <span>{placeholder ?? "Pick a date"}</span>}
          <CalendarIcon className="mr-2 ms-auto" />
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
