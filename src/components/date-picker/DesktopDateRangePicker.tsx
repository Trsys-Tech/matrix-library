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
            "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
            className,
          )}
          data-placeholder={!selected ? "" : undefined}
          aria-label={
            selected
              ? `Selected date: ${selected?.from ? format(selected.from, formatStr ?? "yyyy/MM/dd") : ""} - ${selected?.to ? format(selected.to, formatStr ?? "yyyy/MM/dd") : ""}`
              : placeholder
          }
          disabled={disabled}
        >
          {selected ? (
            <div className="grid grid-cols-2 flex-1 justify-items-start">
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
          <CalendarIcon className="mr-2 h-5 w-4 ms-auto" />
        </Button>
        {/* <div className="flex gap-2">
          <Button
            variant={"outline"}
            className={cn(
              "border-gray-300 text-text focus:ring-0 active:ring-transparent justify-start",
              !selected && "text-muted-foreground",
              className,
            )}
          >
            {selected?.from ? format(selected.from, formatStr ?? "yyyy/MM/dd") : <span>{placeholder ?? "From"}</span>}
            <CalendarIcon className="mr-2 h-5 w-5 ms-auto" />
          </Button>
          <Button
            variant={"outline"}
            className={cn(
              "border-gray-300 text-text focus:ring-0 active:ring-transparent justify-start",
              !selected && "text-muted-foreground",
              className,
            )}
          >
            {selected?.to ? format(selected.to, formatStr ?? "yyyy/MM/dd") : <span>{placeholder ?? "To"}</span>}
            <CalendarIcon className="mr-2 h-5 w-5 ms-auto" />
          </Button>
        </div> */}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar {...props} mode="range" selected={selected} className={cn(calendarClassName, "md:max-w-full md:w-[36rem]")} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  );
};

export { DesktopDateRangePicker, type DesktopDateRangePickerProps };
