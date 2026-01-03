import { PropsBase, PropsRange, DateRange } from 'react-day-picker';
import * as React from "react";
type MobileDateRangePickerProps = PropsBase & Omit<PropsRange, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: DateRange;
    required?: boolean;
    cancelText?: string;
    applyText?: string;
    onSelect?: (date: DateRange | undefined) => void;
    fromText?: string;
    toText?: string;
    disabled?: boolean;
};
declare const MobileDateRangePicker: React.FC<MobileDateRangePickerProps>;
export { MobileDateRangePicker, type MobileDateRangePickerProps };
//# sourceMappingURL=MobileDateRangePicker.d.ts.map