"use client";

import { HTMLAttributes, useState } from "react";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { Time, TimePickerContent } from "./TimePickerContent";

const formatTimeLabel = (time: Time, is24HourMode: boolean) => {
  const minute = time.minute.toString().padStart(2, "0");

  if (is24HourMode) {
    const hour = time.ampm ? (time.hour % 12) + (time.ampm === "PM" ? 12 : 0) : time.hour;
    return `${hour.toString().padStart(2, "0")} : ${minute}`;
  }

  const hourFromAmpm = time.ampm ? (time.hour % 12) + (time.ampm === "PM" ? 12 : 0) : time.hour;
  const hour = hourFromAmpm % 12 || 12;
  const ampm = time.ampm ?? (hourFromAmpm >= 12 ? "PM" : "AM");

  return `${hour.toString().padStart(2, "0")} : ${minute} ${ampm}`;
};

type DesktopTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
  time: Time | undefined;
  onTimeChange: (time: Time | undefined) => void;
  is24HourMode?: boolean;
  placeholder?: string;
  disabled?: boolean;
  slotsProps?: {
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

const DesktopTimePicker: React.FC<DesktopTimePickerProps> = ({
  time,
  onTimeChange,
  className,
  slotsProps,
  is24HourMode = false,
  placeholder = "Pick a Time",
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
          data-placeholder={!time ? "" : undefined}
          aria-label={time ? `Selected time: ${formatTimeLabel(time, is24HourMode)}` : placeholder}
          {...restProps}
        >
          {time ? formatTimeLabel(time, is24HourMode) : "-- : --"}
        </Button>
      </PopoverTrigger>
      <PopoverContent {...(slotsProps?.content ?? {})} className={cn("w-auto p-0", slotsProps?.content?.className)}>
        <TimePickerContent isOpen={isOpen} is24HourMode={is24HourMode} onTimeChange={onTimeChange} time={time} slotsProps={slotsProps} />
      </PopoverContent>
    </Popover>
  );
};
export { DesktopTimePicker, type DesktopTimePickerProps };
