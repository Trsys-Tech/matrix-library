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

/**
 * Props for the desktop-only time picker.
 *
 * In 12-hour mode, the time value should include ampm.
 * In 24-hour mode, the time value should omit ampm and use hour values from 0-23.
 */
type DesktopTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
  /** Current time value. */
  time: Time | undefined;
  /** Called whenever the selected time changes. */
  onTimeChange: (time: Time | undefined) => void;
  /** Enables 24-hour mode and hides the AM/PM column when true. */
  is24HourMode?: boolean;
  /** Accessible label and trigger fallback when no time is selected. */
  placeholder?: string;
  /** Disables the trigger button. */
  disabled?: boolean;
  /** Props forwarded to the popover content. */
  slotsProps?: {
    /** Props forwarded to the time picker content container. */
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

/**
 * Desktop-only time picker rendered in a popover.
 * Use this component when you want the desktop interaction regardless of screen size.
 */
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
          variant="text"
          className={cn(
            "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
            className,
          )}
          data-placeholder={!time ? "" : undefined}
          aria-label={time ? `Selected time: ${formatTimeLabel(time, is24HourMode)}` : placeholder}
          {...restProps}
          type="button"
        >
          {time ? formatTimeLabel(time, is24HourMode) : "-- : --"}
        </Button>
      </PopoverTrigger>
      <PopoverContent {...(slotsProps?.content ?? {})} className={cn("mtx-w-auto mtx-p-0", slotsProps?.content?.className)}>
        <TimePickerContent isOpen={isOpen} is24HourMode={is24HourMode} onTimeChange={onTimeChange} time={time} slotsProps={slotsProps} />
      </PopoverContent>
    </Popover>
  );
};
export { DesktopTimePicker, type DesktopTimePickerProps };
