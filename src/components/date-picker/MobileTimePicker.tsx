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

type MobileTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
  time: Time | undefined;
  onTimeChange: (time: Time | undefined) => void;
  is24HourMode?: boolean;
  placeholder?: string;
  disabled?: boolean;
  slotsProps?: {
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

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
        variant="text"
        className={cn(
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          className,
        )}
        data-placeholder={!time ? "" : undefined}
        onClick={() => setIsOpen(true)}
        aria-label={time ? `Selected time: ${formatTimeLabel(time, is24HourMode)}` : placeholder}
        {...restProps}
        type="button"
      >
        {time ? formatTimeLabel(time, is24HourMode) : "-- : --"}
      </Button>
      <SwipableDrawerContent>
        <SwipableDrawerHeader className="mtx-p-0">
          <VisuallyHidden>
            <SwipableDrawerTitle className="mtx-text-primary mtx-text-lg mtx-font-bold mtx-text-start"> </SwipableDrawerTitle>
            <SwipableDrawerDescription> </SwipableDrawerDescription>
          </VisuallyHidden>
        </SwipableDrawerHeader>
        <TimePickerContent isOpen={isOpen} is24HourMode={is24HourMode} onTimeChange={onTimeChange} time={time} slotsProps={slotsProps} />
      </SwipableDrawerContent>
    </SwipableDrawer>
  );
};
export { MobileTimePicker, type MobileTimePickerProps };
