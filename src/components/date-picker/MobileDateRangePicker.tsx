"use client";

import * as React from "react";
import { format } from "date-fns";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";
import { PropsBase, PropsRange, DateRange, DayEventHandler } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Button } from "../button/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../dialog/Dialog";

type MobileDateRangePickerProps = PropsBase &
  Omit<PropsRange, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: DateRange;
    required?: boolean;
    cancelText?: string;
    applyText?: string;
    onSelect?: (date: DateRange | undefined) => void;
    fromText?: string;
    toText?: string;
    disabled?: boolean;
  };

const MobileDateRangePicker: React.FC<MobileDateRangePickerProps> = ({
  formatStr,
  selected,
  placeholder,
  className,
  calendarClassName,
  onDayClick,
  cancelText,
  applyText,
  onSelect,
  fromText,
  toText,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(selected);

  const handleDayClick: DayEventHandler<React.MouseEvent<Element, MouseEvent>> = (date, modifiers, e) => {
    onDayClick?.(date, modifiers, e);
    if (!range || !range.from) {
      setRange({ from: date, to: undefined });
    } else if (date < range.from) {
      if (!range.to) {
        setRange({ from: date, to: range.from });
      } else {
        setRange({ from: date, to: range.to });
      }
    } else if (range?.from?.getTime() === date?.getTime() && (range?.from?.getTime() === range?.to?.getTime() || !range.to)) {
      setRange(undefined);
    } else if (
      range?.from?.getTime() !== range?.to?.getTime() &&
      (range.from?.getTime() === date?.getTime() || range?.to?.getTime() === date?.getTime())
    ) {
      setRange({ from: date, to: date });
    } else {
      setRange({ ...range, to: date });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setRange(selected);
  };

  const handleApply = () => {
    onSelect?.(range);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        className={cn(
          "flex h-8 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent ps-3 pe-1 py-1.5 text-sm ring-offset-background data-[placeholder]:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-gray-100 [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300",
          className,
        )}
        data-placeholder={!selected ? "" : undefined}
        onClick={() => setIsOpen(true)}
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
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="h-dscreen w-screen p-0 flex flex-col gap-0 data-[state=open]:animate-slide-from-bottom data-[state=closed]:animate-slide-to-bottom overflow-auto max-w-screen-2xl sm:rounded-none">
          <DialogHeader>
            <DialogTitle asChild>
              <div className="grid grid-cols-2 border-b border-b-gray-200 mt-3">
                <div className="text-sm font-bold space-y-1 border-e border-e-gray-200 p-4">
                  <h5 className="text-text-300 font-medium text-xs">From</h5>
                  <h6 className="">{range?.from ? format(range.from, formatStr ?? "eee, MMM dd") : <pre> </pre>}</h6>
                </div>
                <div className="text-sm font-bold space-y-1 p-4 flex flex-col justify-center">
                  <h5 className="text-text-300 font-medium text-xs">To</h5>
                  <h6 className="">{range?.to ? format(range.to, formatStr ?? "eee, MMM dd") : <pre> </pre>}</h6>
                </div>
              </div>
            </DialogTitle>
            <VisuallyHidden>
              <DialogDescription>{"Date Picker"}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <div className="flex-1 flex flex-col items-center p-4">
            <Calendar
              defaultMonth={selected?.from}
              startMonth={new Date(2000, 0, 1)}
              endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
              {...props}
              mode="range"
              selected={selected}
              onDayClick={handleDayClick}
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

export { MobileDateRangePicker, type MobileDateRangePickerProps };
