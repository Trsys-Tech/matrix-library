import { Matcher, PropsBase, PropsSingle } from 'react-day-picker';
import { DateOnlyString, DateValue } from './dateValue';
import * as React from "react";
/**
 * Props for the mobile-only single-date picker.
 *
 * Inherits the single-date calendar props from react-day-picker, but accepts
 * Date | YYYY-MM-DD on input and emits YYYY-MM-DD on apply.
 */
type MobileDatePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsSingle, "mode" | "disabled" | "selected" | "onSelect"> & {
    /** Display format used in the trigger and dialog header. */
    formatStr?: string;
    /** Placeholder shown when no date is selected. */
    placeholder?: string;
    /** Class name forwarded to the calendar content. */
    calendarClassName?: string;
    /** Current value as a native Date or a YYYY-MM-DD string. */
    selected?: DateValue;
    /** Prevents clearing the selection when true. */
    required?: boolean;
    /** Label for the cancel button. */
    cancelText?: string;
    /** Label for the apply button. */
    applyText?: string;
    /** Called with a YYYY-MM-DD string when the user confirms the selection. */
    onSelect?: (date: DateOnlyString | undefined) => void;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Dates disabled in the calendar. */
    disabledDates?: Matcher | Matcher[];
};
/**
 * Mobile-only single-date picker rendered in a full-screen dialog.
 * Use this component when you want mobile interaction regardless of screen size.
 */
declare const MobileDatePicker: React.FC<MobileDatePickerProps>;
export { MobileDatePicker, type MobileDatePickerProps };
//# sourceMappingURL=MobileDatePicker.d.ts.map