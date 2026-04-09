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
            "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
            className,
          )}
          data-placeholder={!selected ? "" : undefined}
          aria-label={selected ? `Selected date: ${format(selected, formatStr ?? "yyyy/MM/dd")}` : "Pick a date"}
          disabled={disabled}
          type="button"
        >
          {selected ? format(selected, formatStr ?? "yyyy/MM/dd") : <span>{placeholder ?? "Pick a date"}</span>}
          <CalendarIcon className="mtx-mr-2 mtx-ms-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mtx-w-auto mtx-p-0">
        <Calendar
          defaultMonth={selected}
          startMonth={new Date(2000, 0, 1)}
          endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
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
