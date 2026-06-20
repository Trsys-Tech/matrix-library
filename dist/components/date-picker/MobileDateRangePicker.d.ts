import { PropsBase, PropsRange, DateRange, Matcher } from 'react-day-picker';
import * as React from "react";
type MobileDateRangePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsRange, "mode" | "disabled"> & {
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
    disabledDates?: Matcher | Matcher[];
};
declare const MobileDateRangePicker: React.FC<MobileDateRangePickerProps>;
export { MobileDateRangePicker, type MobileDateRangePickerProps };
//# sourceMappingURL=MobileDateRangePicker.d.ts.map