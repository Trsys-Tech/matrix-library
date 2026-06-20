import { Matcher, PropsBase, PropsSingle } from 'react-day-picker';
import * as React from "react";
type MobileDatePickerProps = Omit<PropsBase, "disabled"> & Omit<PropsSingle, "mode" | "disabled"> & {
    formatStr?: string;
    placeholder?: string;
    calendarClassName?: string;
    selected?: Date;
    required?: boolean;
    cancelText?: string;
    applyText?: string;
    onSelect?: (date: Date | undefined) => void;
    disabled?: boolean;
    disabledDates?: Matcher | Matcher[];
};
declare const MobileDatePicker: React.FC<MobileDatePickerProps>;
export { MobileDatePicker, type MobileDatePickerProps };
//# sourceMappingURL=MobileDatePicker.d.ts.map