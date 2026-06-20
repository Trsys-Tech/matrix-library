import { HTMLAttributes } from 'react';
import { Time } from './TimePickerContent';
type DesktopTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
    time: Time | undefined;
    onTimeChange: (time: Time | undefined) => void;
    is24HourMode?: boolean;
    placeholder?: string;
    disabled?: boolean;
    slotsProps?: {
        content?: HTMLAttributes<HTMLDivElement>;
    };
};
declare const DesktopTimePicker: React.FC<DesktopTimePickerProps>;
export { DesktopTimePicker, type DesktopTimePickerProps };
//# sourceMappingURL=DesktopTimePicker.d.ts.map