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
            "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
            className,
          )}
          data-placeholder={!time ? "" : undefined}
          aria-label={time?.hour ? `Selected time: ${time.hour}:${time.minute} ${time.ampm}` : placeholder}
          {...restProps}
        >
          {`${time?.hour?.toString()?.padStart(2, "0") ?? "--"} : ${time?.minute?.toString()?.padStart(2, "0") ?? "--"} ${time?.ampm ?? "--"}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent {...(slotsProps?.content ?? {})} className={cn("w-auto p-0", slotsProps?.content?.className)}>
        <TimePickerContent isOpen={isOpen} onTimeChange={onTimeChange} time={time} slotsProps={slotsProps} />
      </PopoverContent>
    </Popover>
  );
};
export { DesktopTimePicker, type DesktopTimePickerProps };
