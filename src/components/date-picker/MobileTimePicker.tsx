"use client";

import { HTMLAttributes, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Time, TimePickerContent } from "./TimePickerContent";
import {
  SwipableDrawer,
  SwipableDrawerContent,
  SwipableDrawerDescription,
  SwipableDrawerHeader,
  SwipableDrawerTitle,
} from "../drawer/SwipableDrawer";

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
 * Props for the mobile-only time picker.
 *
 * In 12-hour mode, the time value should include ampm.
 * In 24-hour mode, the time value should omit ampm and use hour values from 0-23.
 */
type MobileTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
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
  /** Props forwarded to the drawer content. */
  slotsProps?: {
    /** Props forwarded to the time picker content container. */
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

/**
 * Mobile-only time picker rendered in a swipeable drawer.
 * Use this component when you want the mobile interaction regardless of screen size.
 */
const MobileTimePicker: React.FC<MobileTimePickerProps> = ({
  time,
  onTimeChange,
  className,
  slotsProps,
  is24HourMode = false,
  placeholder = "Pick a time",
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SwipableDrawer open={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        variant="text"
        className={cn(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          className,
        )}
        data-placeholder={!time ? "" : undefined}
        onClick={() => setIsOpen(true)}
        aria-label={time ? `Selected time: ${formatTimeLabel(time, is24HourMode)}` : placeholder}
        {...restProps}
      >
        {time ? formatTimeLabel(time, is24HourMode) : "-- : --"}
      </Button>
      <SwipableDrawerContent>
        <SwipableDrawerHeader className="p-0">
          <VisuallyHidden>
            <SwipableDrawerTitle className="text-primary text-lg font-bold text-start"> </SwipableDrawerTitle>
            <SwipableDrawerDescription> </SwipableDrawerDescription>
          </VisuallyHidden>
        </SwipableDrawerHeader>
        <TimePickerContent isOpen={isOpen} is24HourMode={is24HourMode} onTimeChange={onTimeChange} time={time} slotsProps={slotsProps} />
      </SwipableDrawerContent>
    </SwipableDrawer>
  );
};
export { MobileTimePicker, type MobileTimePickerProps };
