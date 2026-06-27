"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";
import { PropsBase, PropsSingle, DayEventHandler, Matcher, OnSelectHandler } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { DateOnlyString, DateValue, toCalendarDate, toDateOnlyString } from "./dateValue";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

/**
 * Props for the desktop-only single-date picker.
 *
 * Inherits the single-date calendar props from react-day-picker, but normalizes
 * the public value contract to Date | YYYY-MM-DD on input and YYYY-MM-DD on output.
 */
type DesktopDatePickerProps = Omit<PropsBase, "disabled"> &
  Omit<PropsSingle, "mode" | "disabled" | "selected" | "onSelect"> & {
    /** Display format used in the trigger and accessibility label. */
    formatStr?: string;
    /** Placeholder shown when no date is selected. */
    placeholder?: string;
    /** Class name forwarded to the calendar content. */
    calendarClassName?: string;
    /** Current value as a native Date or a YYYY-MM-DD string. */
    selected?: DateValue;
    /** Called with a YYYY-MM-DD string when the user selects a date. */
    onSelect?: (date: DateOnlyString | undefined) => void;
    /** Prevents clearing the selection when true. */
    required?: boolean;
    /** Closes the popover immediately after a day is picked. */
    closeOnSelect?: boolean;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Dates disabled in the calendar. */
    disabledDates?: Matcher | Matcher[];
  };

/**
 * Desktop-only single-date picker rendered in a popover.
 * Use this component when you want the desktop experience regardless of screen size.
 */
const DesktopDatePicker: React.FC<DesktopDatePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  calendarClassName,
  closeOnSelect = true,
  onSelect,
  onDayClick,
  disabled,
  disabledDates,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedDate = toCalendarDate(selected);

  const handleDayClick: DayEventHandler<React.MouseEvent<Element, MouseEvent>> = (date, modifiers, e) => {
    onDayClick?.(date, modifiers, e);
    if (closeOnSelect) setIsOpen(false);
  };

  const handleSelect: OnSelectHandler<Date | undefined> = date => {
    onSelect?.(toDateOnlyString(date));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="text"
          className={cn(
            "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
            className,
          )}
          data-placeholder={!selectedDate ? "" : undefined}
          aria-label={selectedDate ? `Selected date: ${format(selectedDate, formatStr ?? "yyyy/MM/dd")}` : "Pick a date"}
          aria-haspopup="dialog"
          disabled={disabled}
        >
          {selectedDate ? format(selectedDate, formatStr ?? "yyyy/MM/dd") : <span>{placeholder ?? "Pick a date"}</span>}
          <CalendarIcon className="mr-2 ms-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          defaultMonth={selectedDate}
          startMonth={new Date(2000, 0, 1)}
          endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
          {...props}
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown-years"
          className={calendarClassName}
          onSelect={handleSelect}
          onDayClick={handleDayClick}
          disabled={disabledDates}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DesktopDatePicker, type DesktopDatePickerProps };
