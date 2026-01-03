import { HTMLAttributes } from 'react';
import { Time } from './TimePickerContent';
type MobileTimePickerProps = HTMLAttributes<HTMLButtonElement> & {
    time: Time | undefined;
    onTimeChange: (time: Time | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    slotsProps?: {
        content?: HTMLAttributes<HTMLDivElement>;
    };
};
declare const MobileTimePicker: React.FC<MobileTimePickerProps>;
export { MobileTimePicker, type MobileTimePickerProps };
//# sourceMappingURL=MobileTimePicker.d.ts.map