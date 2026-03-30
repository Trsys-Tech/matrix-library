"use client";

import { HTMLAttributes, useState } from "react";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Time, TimePickerContent } from "./TimePickerContent";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

type DesktopTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
  time: Time | undefined;
  onTimeChange: (time: Time | undefined) => void;
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
          aria-label={time?.hour ? `Selected time: ${time.hour}:${time.minute} ${time.ampm}` : placeholder}
          {...restProps}
        >
          {`${time?.hour?.toString()?.padStart(2, "0") ?? "--"} : ${time?.minute?.toString()?.padStart(2, "0") ?? "--"} ${time?.ampm ?? "--"}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent {...(slotsProps?.content ?? {})} className={cn("mtx-w-auto mtx-p-0", slotsProps?.content?.className)}>
        <TimePickerContent isOpen={isOpen} onTimeChange={onTimeChange} time={time} slotsProps={slotsProps} />
      </PopoverContent>
    </Popover>
  );
};
export { DesktopTimePicker, type DesktopTimePickerProps };
