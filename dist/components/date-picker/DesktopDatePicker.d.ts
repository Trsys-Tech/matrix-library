import { PropsBase, PropsSingle, Matcher } from 'react-day-picker';
import * as React from "react";
type DesktopDatePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsSingle, "mode" | "disabled"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: Date;
    required?: boolean;
    closeOnSelect?: boolean;
    disabled?: boolean;
    disabledDates?: Matcher | Matcher[];
};
declare const DesktopDatePicker: React.FC<DesktopDatePickerProps>;
export { DesktopDatePicker, type DesktopDatePickerProps };
//# sourceMappingURL=DesktopDatePicker.d.ts.map