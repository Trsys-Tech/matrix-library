import { HTMLAttributes } from 'react';
/**
 * Public value used by the time pickers.
 *
 * In 12-hour mode, provide hour values from 1-12 and include ampm.
 * In 24-hour mode, provide hour values from 0-23 and omit ampm.
 */
type Time = {
    /** Hour segment of the time value. */
    hour: number;
    /** Minute segment of the time value. */
    minute: number;
    /** Optional meridiem used in 12-hour mode. */
    ampm?: "AM" | "PM";
};
/**
 * Props for the shared time picker content.
 *
 * This is the scrollable selector used by both the desktop and mobile wrappers.
 */
type TimePickerContentProps = {
    /** Current time value. */
    time: Time | undefined;
    /** Indicates whether the surrounding popover or drawer is open. */
    isOpen: boolean;
    /** Enables 24-hour mode and hides the AM/PM column when true. */
    is24HourMode?: boolean;
    /** Called whenever the user changes the selected time. */
    onTimeChange: (time: Time | undefined) => void;
    /** Props forwarded to the content container. */
    slotsProps?: {
        /** Props forwarded to the main content element. */
        content?: HTMLAttributes<HTMLDivElement>;
    };
};
/**
 * Shared time picker content used by the desktop popover and mobile drawer variants.
 * It normalizes values based on 12-hour or 24-hour mode and emits updates as the user picks segments.
 */
declare const TimePickerContent: React.FC<TimePickerContentProps>;
export { TimePickerContent, type TimePickerContentProps, type Time };
//# sourceMappingURL=TimePickerContent.d.ts.map