"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";
import { PropsBase, PropsRange, DateRange, Matcher, OnSelectHandler } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { DateOnlyRange, DateRangeValue, toCalendarDateRange, toDateOnlyRange } from "./dateValue";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

/**
 * Props for the desktop-only date-range picker.
 *
 * Inherits the range calendar props from react-day-picker, but normalizes the
 * public value contract to Date | YYYY-MM-DD on input and { from, to } strings on output.
 */
type DesktopDateRangePickerProps = Omit<PropsBase, "disabled"> &
  Omit<PropsRange, "mode" | "disabled" | "selected" | "onSelect"> & {
    /** Display format used in the trigger and accessibility label. */
    formatStr?: string;
    /** Placeholder shown when no range is selected. */
    placeholder?: string;
    /** Class name forwarded to the calendar content. */
    calendarClassName?: string;
    /** Current value as Date objects or YYYY-MM-DD strings. */
    selected?: DateRangeValue;
    /** Called with YYYY-MM-DD range values when the user selects a range. */
    onSelect?: (date: DateOnlyRange | undefined) => void;
    /** Prevents clearing the selection when true. */
    required?: boolean;
    /** Label shown before the start date in the trigger. */
    fromText?: string;
    /** Label shown before the end date in the trigger. */
    toText?: string;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Dates disabled in the calendar. */
    disabledDates?: Matcher | Matcher[];
    /** Separator between the start and end date in the trigger. default: ": " */
    labelSeparator?: string;
    /** Separator between the start and end date in the trigger. default: "" */
    fromToSeparator?: string;
  };

/**
 * Desktop-only date-range picker rendered in a popover.
 * Use this component when you want the desktop experience regardless of screen size.
 */
const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  labelSeparator = ": ",
  fromToSeparator = "",
  calendarClassName,
  fromText,
  toText,
  onSelect,
  disabled,
  disabledDates,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedRange = toCalendarDateRange(selected);
  const hasSelectedRange = Boolean(selectedRange?.from || selectedRange?.to);

  const handleSelect: OnSelectHandler<DateRange | undefined> = range => {
    onSelect?.(toDateOnlyRange(range));
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="text"
          className={cn(
            "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
            className,
          )}
          data-placeholder={!hasSelectedRange ? "" : undefined}
          aria-label={
            hasSelectedRange
              ? `Selected date: ${selectedRange?.from ? format(selectedRange.from, formatStr ?? "yyyy/MM/dd") : ""} - ${selectedRange?.to ? format(selectedRange.to, formatStr ?? "yyyy/MM/dd") : ""}`
              : placeholder
          }
          disabled={disabled}
          type="button"
        >
          {hasSelectedRange ? (
            <div className="mtx-flex mtx-flex-row mtx-gap-1 mtx-flex-1 mtx-justify-items-start">
              <span>
                {fromText ?? "From"}
                {labelSeparator}
                {selectedRange?.from ? format(selectedRange.from, formatStr ?? "yyyy/MM/dd") : "-"}
              </span>
              {fromToSeparator}
              <span>
                {toText ?? "To"}
                {labelSeparator}
                {selectedRange?.to ? format(selectedRange.to, formatStr ?? "yyyy/MM/dd") : "-"}
              </span>
            </div>
          ) : (
            <span>{placeholder ?? "Pick a Range"}</span>
          )}
          <CalendarIcon className="mtx-mr-2 mtx-h-5 mtx-w-4 mtx-ms-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mtx-w-auto mtx-p-0" align="start">
        <Calendar
          defaultMonth={selectedRange?.from}
          startMonth={new Date(2000, 0, 1)}
          endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
          {...props}
          mode="range"
          selected={selectedRange}
          className={cn(calendarClassName, "md:mtx-max-w-full md:mtx-w-[36rem]")}
          numberOfMonths={2}
          onSelect={handleSelect}
          disabled={disabledDates}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DesktopDateRangePicker, type DesktopDateRangePickerProps };
