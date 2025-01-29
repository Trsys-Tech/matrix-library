import { HTMLAttributes, useState } from "react";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Time, TimePickerContent } from "./TimePickerContent";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

type DesktopTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
  time: Time | undefined;
  onTimeChange: (time: Time | undefined) => void;
  slotsProps?: {
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

const DesktopTimePicker: React.FC<DesktopTimePickerProps> = ({ time, onTimeChange, className, slotsProps, ...restProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full border-gray-300 text-text focus:ring-0 active:ring-transparent justify-start", className)}
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
