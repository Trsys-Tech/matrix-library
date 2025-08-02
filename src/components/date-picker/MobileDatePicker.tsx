"use client";

import * as React from "react";
import { format } from "date-fns";
import { PropsBase, PropsSingle } from "react-day-picker";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Button } from "../button/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../dialog/Dialog";

type MobileDatePickerProps = PropsBase &
  Omit<PropsSingle, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: Date;
    required?: boolean;
    cancelText?: string;
    applyText?: string;
    onSelect?: (date: Date | undefined) => void;
    disabled?: boolean;
  };

const MobileDatePicker: React.FC<MobileDatePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  calendarClassName,
  cancelText,
  applyText,
  onSelect,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(selected);

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedDate(selected);
  };

  const handleApply = () => {
    onSelect?.(selectedDate);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        className={cn(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          className,
        )}
        data-placeholder={!selected ? "" : undefined}
        onClick={() => setIsOpen(true)}
        aria-label={selected ? `Selected date: ${format(selected, formatStr ?? "yyyy/MM/dd")}` : "Pick a date"}
        disabled={disabled}
      >
        {selected ? format(selected, formatStr ?? "eee, MMM dd") : <span>{placeholder ?? "Pick a date"}</span>}
        <CalendarIcon className="mr-2 h-5 w-5 ms-auto" />
      </Button>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="h-dscreen w-screen p-0 flex flex-col gap-0 data-[state=open]:animate-slide-from-bottom data-[state=closed]:animate-slide-to-bottom overflow-auto max-w-screen-2xl sm:rounded-none">
          <DialogHeader className="p-4 border-b border-b-gray-200">
            <DialogTitle asChild>
              <div className="text-sm font-bold space-y-1 mt-3">
                <h5 className="text-text-300">{selectedDate?.getFullYear() ?? <pre> </pre>}</h5>
                <h6 className="">{selectedDate ? format(selectedDate, formatStr ?? "eee, MMM dd") : <pre> </pre>}</h6>
              </div>
            </DialogTitle>
            <VisuallyHidden>
              <DialogDescription>{"Date Picker"}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <div className="flex-1 flex flex-col items-center p-4">
            <Calendar
              defaultMonth={selected}
              startMonth={new Date(2000, 0, 1)}
              endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
              {...props}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className={cn("p-0", calendarClassName)}
            />
            <div className="flex justify-center items-center gap-4 mt-auto w-full">
              <Button variant="text" className="flex-1 h-10" onClick={handleCancel}>
                {cancelText ?? "Cancel"}
              </Button>
              <Button variant="primary" className="flex-1 h-10" onClick={handleApply}>
                {applyText ?? "Apply"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { MobileDatePicker, type MobileDatePickerProps };
