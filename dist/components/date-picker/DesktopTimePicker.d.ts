import { HTMLAttributes } from 'react';
import { Time } from './TimePickerContent';
/**
 * Props for the desktop-only time picker.
 *
 * In 12-hour mode, the time value should include ampm.
 * In 24-hour mode, the time value should omit ampm and use hour values from 0-23.
 */
type DesktopTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
    /** Current time value. */
    time: Time | undefined;
    /** Called whenever the selected time changes. */
    onTimeChange: (time: Time | undefined) => void;
    /** Enables 24-hour mode and hides the AM/PM column when true. */
    is24HourMode?: boolean;
    /** Accessible label and trigger fallback when no time is selected. */
    placeholder?: string;
    /** Disables the trigger button. */
    disabled?: boolean;
    /** Props forwarded to the popover content. */
    slotsProps?: {
        /** Props forwarded to the time picker content container. */
        content?: HTMLAttributes<HTMLDivElement>;
    };
};
/**
 * Desktop-only time picker rendered in a popover.
 * Use this component when you want the desktop interaction regardless of screen size.
 */
declare const DesktopTimePicker: React.FC<DesktopTimePickerProps>;
export { DesktopTimePicker, type DesktopTimePickerProps };
//# sourceMappingURL=DesktopTimePicker.d.ts.map