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
  const validatedSelectedDate = selected ? new Date(selected) : undefined;
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(validatedSelectedDate);

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedDate(validatedSelectedDate);
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
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
          className,
        )}
        data-placeholder={!validatedSelectedDate ? "" : undefined}
        onClick={() => setIsOpen(true)}
        aria-label={validatedSelectedDate ? `Selected date: ${format(validatedSelectedDate, formatStr ?? "yyyy/MM/dd")}` : "Pick a date"}
        disabled={disabled}
        type="button"
      >
        {validatedSelectedDate ? format(validatedSelectedDate, formatStr ?? "eee, MMM dd") : <span>{placeholder ?? "Pick a date"}</span>}
        <CalendarIcon className="mtx-mr-2 mtx-h-5 mtx-w-5 mtx-ms-auto" />
      </Button>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none">
          <DialogHeader className="mtx-p-4 mtx-border-b mtx-border-b-gray-200">
            <DialogTitle asChild>
              <div className="mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-mt-3">
                <h5 className="mtx-text-text-300">{selectedDate ? selectedDate.getFullYear() : <pre> </pre>}</h5>
                <h6 className="">{selectedDate ? format(selectedDate, formatStr ?? "eee, MMM dd") : <pre> </pre>}</h6>
              </div>
            </DialogTitle>
            <VisuallyHidden>
              <DialogDescription>{"Date Picker"}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <div className="mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4">
            <Calendar
              defaultMonth={validatedSelectedDate}
              startMonth={new Date(2000, 0, 1)}
              endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
              {...props}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className={cn("mtx-p-0", calendarClassName)}
            />
            <div className="mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full">
              <Button variant="text" className="mtx-flex-1 mtx-h-10" onClick={handleCancel} type="button">
                {cancelText ?? "Cancel"}
              </Button>
              <Button variant="primary" className="mtx-flex-1 mtx-h-10" onClick={handleApply} type="button">
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
