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
          "mtx-flex mtx-h-8 mtx-w-full mtx-items-center mtx-justify-between mtx-whitespace-nowrap mtx-rounded-sm mtx-border mtx-border-input mtx-bg-transparent mtx-ps-3 mtx-pe-1 mtx-py-1.5 mtx-text-xs mtx-ring-offset-background data-[placeholder]:mtx-text-muted-foreground hover:mtx-border hover:mtx-border-primary hover:mtx-bg-transparent focus:mtx-border focus:mtx-border-primary focus:mtx-outline-none focus:mtx-ring focus:mtx-ring-primary-100 disabled:mtx-cursor-not-allowed disabled:mtx-bg-gray-100 disabled:mtx-text-text-300 disabled:mtx-border-gray-100 [&>span]:mtx-line-clamp-1 [&_svg]:disabled:mtx-text-text-300",
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
          <div className="mtx-grid mtx-grid-cols-2 mtx-flex-1 mtx-justify-items-start">
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
        <CalendarIcon className="mtx-mr-2 mtx-h-5 mtx-w-4 mtx-ms-auto" />
      </Button>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="mtx-h-dscreen mtx-w-screen mtx-p-0 mtx-flex mtx-flex-col mtx-gap-0 data-[state=open]:mtx-animate-slide-from-bottom data-[state=closed]:mtx-animate-slide-to-bottom mtx-overflow-auto mtx-max-w-screen-2xl sm:mtx-rounded-none">
          <DialogHeader>
            <DialogTitle asChild>
              <div className="mtx-grid mtx-grid-cols-2 mtx-border-b mtx-border-b-gray-200 mtx-mt-3">
                <div className="mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-border-e mtx-border-e-gray-200 mtx-p-4">
                  <h5 className="mtx-text-text-300 mtx-font-medium mtx-text-xs">From</h5>
                  <h6 className="">{range?.from ? format(range.from, formatStr ?? "eee, MMM dd") : <pre> </pre>}</h6>
                </div>
                <div className="mtx-text-sm mtx-font-bold mtx-space-y-1 mtx-p-4 mtx-flex mtx-flex-col mtx-justify-center">
                  <h5 className="mtx-text-text-300 mtx-font-medium mtx-text-xs">To</h5>
                  <h6 className="">{range?.to ? format(range.to, formatStr ?? "eee, MMM dd") : <pre> </pre>}</h6>
                </div>
              </div>
            </DialogTitle>
            <VisuallyHidden>
              <DialogDescription>{"Date Picker"}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <div className="mtx-flex-1 mtx-flex mtx-flex-col mtx-items-center mtx-p-4">
            <Calendar
              defaultMonth={selected?.from}
              startMonth={new Date(2000, 0, 1)}
              endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
              {...props}
              mode="range"
              selected={selected}
              onDayClick={handleDayClick}
              className={cn("mtx-p-0", calendarClassName)}
            />

            <div className="mtx-flex mtx-justify-center mtx-items-center mtx-gap-4 mtx-mt-auto mtx-w-full">
              <Button variant="text" className="mtx-flex-1 mtx-h-10" onClick={handleCancel}>
                {cancelText ?? "Cancel"}
              </Button>
              <Button variant="primary" className="mtx-flex-1 mtx-h-10" onClick={handleApply}>
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
