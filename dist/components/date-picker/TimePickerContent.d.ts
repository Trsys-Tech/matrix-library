import { HTMLAttributes } from 'react';
type Time = {
    hour: number;
    minute: number;
    ampm: "AM" | "PM";
};
type TimePickerContentProps = {
    time: Time | undefined;
    isOpen: boolean;
    onTimeChange: (time: Time | undefined) => void;
    slotsProps?: {
        content?: HTMLAttributes<HTMLDivElement>;
    };
};
declare const TimePickerContent: React.FC<TimePickerContentProps>;
export { TimePickerContent, type TimePickerContentProps, type Time };
//# sourceMappingURL=TimePickerContent.d.ts.map