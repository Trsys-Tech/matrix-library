import { PropsBase, PropsSingle, Matcher } from 'react-day-picker';
import { DateOnlyString, DateValue } from './dateValue';
import * as React from "react";
/**
 * Props for the desktop-only single-date picker.
 *
 * Inherits the single-date calendar props from react-day-picker, but normalizes
 * the public value contract to Date | YYYY-MM-DD on input and YYYY-MM-DD on output.
 */
type DesktopDatePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsSingle, "mode" | "disabled" | "selected" | "onSelect"> & {
    /** Display format used in the trigger and accessibility label. */
    formatStr?: string;
    /** Placeholder shown when no date is selected. */
    placeholder?: string;
    /** Class name forwarded to the calendar content. */
    calendarClassName?: string;
    /** Current value as a native Date or a YYYY-MM-DD string. */
    selected?: DateValue;
    /** Called with a YYYY-MM-DD string when the user selects a date. */
    onSelect?: (date: DateOnlyString | undefined) => void;
    /** Prevents clearing the selection when true. */
    required?: boolean;
    /** Closes the popover immediately after a day is picked. */
    closeOnSelect?: boolean;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Dates disabled in the calendar. */
    disabledDates?: Matcher | Matcher[];
};
/**
 * Desktop-only single-date picker rendered in a popover.
 * Use this component when you want the desktop experience regardless of screen size.
 */
declare const DesktopDatePicker: React.FC<DesktopDatePickerProps>;
export { DesktopDatePicker, type DesktopDatePickerProps };
//# sourceMappingURL=DesktopDatePicker.d.ts.map