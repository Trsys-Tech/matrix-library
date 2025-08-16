import { PropsBase, PropsRange, DateRange } from 'react-day-picker';
import * as React from "react";
type DesktopDateRangePickerProps = PropsBase & Omit<PropsRange, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: DateRange;
    required?: boolean;
    fromText?: string;
    toText?: string;
    disabled?: boolean;
};
declare const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps>;
export { DesktopDateRangePicker, type DesktopDateRangePickerProps };
//# sourceMappingURL=DesktopDateRangePicker.d.ts.map