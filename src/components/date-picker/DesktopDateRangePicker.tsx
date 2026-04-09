"use client";

import * as React from "react";
import { format } from "date-fns";
import { PropsBase, PropsRange, DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

type DesktopDateRangePickerProps = PropsBase &
  Omit<PropsRange, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: DateRange;
    required?: boolean;
    fromText?: string;
    toText?: string;
    disabled?: boolean;
  };

const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  calendarClassName,
  fromText,
  toText,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
          data-placeholder={!selected ? "" : undefined}
          aria-label={
            selected
              ? `Selected date: ${selected?.from ? format(selected.from, formatStr ?? "yyyy/MM/dd") : ""} - ${selected?.to ? format(selected.to, formatStr ?? "yyyy/MM/dd") : ""}`
              : placeholder
          }
          disabled={disabled}
          type="button"
        >
          {selected ? (
            <div className="mtx-grid mtx-grid-cols-2 mtx-flex-1 mtx-justify-items-start">
              <span>
                {fromText ?? "From"}: {selected?.from ? format(selected.from, formatStr ?? "yyyy/MM/dd") : "-"}
              </span>{" "}
              <span>
                {toText ?? "To"}: {selected?.to ? format(selected.to, formatStr ?? "yyyy/MM/dd") : "-"}
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
          defaultMonth={selected?.from}
          startMonth={new Date(2000, 0, 1)}
          endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
          {...props}
          mode="range"
          selected={selected}
          className={cn(calendarClassName, "md:mtx-max-w-full md:mtx-w-[36rem]")}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DesktopDateRangePicker, type DesktopDateRangePickerProps };
