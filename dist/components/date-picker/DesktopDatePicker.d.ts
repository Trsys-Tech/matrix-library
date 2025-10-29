import { PropsBase, PropsSingle } from 'react-day-picker';
import * as React from "react";
type DesktopDatePickerProps = PropsBase & Omit<PropsSingle, "mode"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: Date;
    required?: boolean;
    closeOnSelect?: boolean;
    disabled?: boolean;
};
declare const DesktopDatePicker: React.FC<DesktopDatePickerProps>;
export { DesktopDatePicker, type DesktopDatePickerProps };
//# sourceMappingURL=DesktopDatePicker.d.ts.map