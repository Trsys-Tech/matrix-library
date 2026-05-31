import { PropsBase, PropsRange, DateRange, Matcher } from 'react-day-picker';
import * as React from "react";
type DesktopDateRangePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsRange, "mode" | "disabled"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: DateRange;
    required?: boolean;
    fromText?: string;
    toText?: string;
    disabled?: boolean;
    disabledDates?: Matcher | Matcher[];
};
declare const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps>;
export { DesktopDateRangePicker, type DesktopDateRangePickerProps };
//# sourceMappingURL=DesktopDateRangePicker.d.ts.map