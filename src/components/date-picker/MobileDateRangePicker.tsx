"use client";

import * as React from "react";
import { format } from "date-fns";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar as CalendarIcon } from "@trsys-tech/matrix-icons";
import { PropsBase, PropsRange, DateRange, DayEventHandler, Matcher } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { DateOnlyRange, DateRangeValue, toCalendarDateRangeFromKeys, toDateOnlyRange } from "./dateValue";
import { Button } from "../button/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../dialog/Dialog";

/**
 * Props for the mobile-only date-range picker.
 *
 * Inherits the range calendar props from react-day-picker, but accepts Date
 * objects or YYYY-MM-DD strings and emits { from, to } values in YYYY-MM-DD format.
 */
type MobileDateRangePickerProps = Omit<PropsBase, "disabled"> &
  Omit<PropsRange, "mode" | "disabled" | "selected" | "onSelect"> & {
    /** Display format used in the trigger and dialog header. */
    formatStr?: string;
    /** Placeholder shown when no range is selected. */
    placeholder?: string;
    /** Class name forwarded to the calendar content. */
    calendarClassName?: string;
    /** Current value as Date objects or YYYY-MM-DD strings. */
    selected?: DateRangeValue;
    /** Prevents clearing the selection when true. */
    required?: boolean;
    /** Label for the cancel button. */
    cancelText?: string;
    /** Label for the apply button. */
    applyText?: string;
    /** Called with YYYY-MM-DD range values when the user confirms the selection. */
    onSelect?: (date: DateOnlyRange | undefined) => void;
    /** Label shown before the start date in the trigger. */
    fromText?: string;
    /** Label shown before the end date in the trigger. */
    toText?: string;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Dates disabled in the calendar. */
    disabledDates?: Matcher | Matcher[];
  };

/**
 * Mobile-only date-range picker rendered in a full-screen dialog.
 * Use this component when you want mobile interaction regardless of screen size.
 */
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
  disabledDates,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedFromKey = selected?.from instanceof Date ? selected.from.getTime() : selected?.from;
  const selectedToKey = selected?.to instanceof Date ? selected.to.getTime() : selected?.to;
  const selectedRange = React.useMemo(() => toCalendarDateRangeFromKeys(selectedFromKey, selectedToKey), [selectedFromKey, selectedToKey]);
  const [range, setRange] = React.useState<DateRange | undefined>(selectedRange);
  const hasSelectedRange = Boolean(selectedRange?.from || selectedRange?.to);

  React.useEffect(() => {
    setRange(selectedRange);
  }, [selectedRange]);

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
    setRange(selectedRange);
  };

  const handleApply = () => {
    onSelect?.(toDateOnlyRange(range));
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
        data-placeholder={!hasSelectedRange ? "" : undefined}
        onClick={() => setIsOpen(true)}
        aria-label={
          hasSelectedRange
            ? `Selected date: ${selectedRange?.from ? format(selectedRange.from, formatStr ?? "yyyy/MM/dd") : ""} - ${selectedRange?.to ? format(selectedRange.to, formatStr ?? "yyyy/MM/dd") : ""}`
            : placeholder
        }
        disabled={disabled}
        type="button"
      >
        {hasSelectedRange ? (
          <div className="mtx-grid mtx-grid-cols-2 mtx-flex-1 mtx-justify-items-start">
            <span>
              {fromText ?? "From"}: {selectedRange?.from ? format(selectedRange.from, formatStr ?? "yyyy/MM/dd") : "-"}
            </span>{" "}
            <span>
              {toText ?? "To"}: {selectedRange?.to ? format(selectedRange.to, formatStr ?? "yyyy/MM/dd") : "-"}
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
              defaultMonth={range?.from}
              startMonth={new Date(2000, 0, 1)}
              endMonth={new Date(new Date().getFullYear() + 2, 11, 31)}
              {...props}
              mode="range"
              selected={range}
              onDayClick={handleDayClick}
              className={cn("mtx-p-0", calendarClassName)}
              disabled={disabledDates}
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

export { MobileDateRangePicker, type MobileDateRangePickerProps };
