import { PropsBase, PropsRange, Matcher } from 'react-day-picker';
import { DateOnlyRange, DateRangeValue } from './dateValue';
import * as React from "react";
/**
 * Props for the desktop-only date-range picker.
 *
 * Inherits the range calendar props from react-day-picker, but normalizes the
 * public value contract to Date | YYYY-MM-DD on input and { from, to } strings on output.
 */
type DesktopDateRangePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsRange, "mode" | "disabled" | "selected" | "onSelect"> & {
    /** Display format used in the trigger and accessibility label. */
    formatStr?: string;
    /** Placeholder shown when no range is selected. */
    placeholder?: string;
    /** Class name forwarded to the calendar content. */
    calendarClassName?: string;
    /** Current value as Date objects or YYYY-MM-DD strings. */
    selected?: DateRangeValue;
    /** Called with YYYY-MM-DD range values when the user selects a range. */
    onSelect?: (date: DateOnlyRange | undefined) => void;
    /** Prevents clearing the selection when true. */
    required?: boolean;
    /** Label shown before the start date in the trigger. */
    fromText?: string;
    /** Label shown before the end date in the trigger. */
    toText?: string;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Dates disabled in the calendar. */
    disabledDates?: Matcher | Matcher[];
    /** Separator between the start and end date in the trigger. default: ": " */
    labelSeparator?: string;
    /** Separator between the start and end date in the trigger. default: "" */
    fromToSeparator?: string;
};
/**
 * Desktop-only date-range picker rendered in a popover.
 * Use this component when you want the desktop experience regardless of screen size.
 */
declare const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps>;
export { DesktopDateRangePicker, type DesktopDateRangePickerProps };
//# sourceMappingURL=DesktopDateRangePicker.d.ts.map