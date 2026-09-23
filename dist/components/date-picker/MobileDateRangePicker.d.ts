import { PropsBase, PropsRange, Matcher } from 'react-day-picker';
import { DateOnlyRange, DateRangeValue } from './dateValue';
import * as React from "react";
/**
 * Props for the mobile-only date-range picker.
 *
 * Inherits the range calendar props from react-day-picker, but accepts Date
 * objects or YYYY-MM-DD strings and emits { from, to } values in YYYY-MM-DD format.
 */
type MobileDateRangePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsRange, "mode" | "disabled" | "selected" | "onSelect"> & {
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
    /** Separator between the start and end date in the trigger. default: ": " */
    labelSeparator?: string;
    /** Separator between the start and end date in the trigger. default: "" */
    fromToSeparator?: string;
};
/**
 * Mobile-only date-range picker rendered in a full-screen dialog.
 * Use this component when you want mobile interaction regardless of screen size.
 */
declare const MobileDateRangePicker: React.FC<MobileDateRangePickerProps>;
export { MobileDateRangePicker, type MobileDateRangePickerProps };
//# sourceMappingURL=MobileDateRangePicker.d.ts.map