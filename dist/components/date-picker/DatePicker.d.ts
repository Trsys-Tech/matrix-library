import { default as React } from 'react';
import { DesktopDatePicker, DesktopDatePickerProps } from './DesktopDatePicker';
import { MobileDatePicker, MobileDatePickerProps } from './MobileDatePicker';
type DatePickerProps = DesktopDatePickerProps & MobileDatePickerProps & {};
declare const DatePicker: React.FC<DatePickerProps>;
export { DatePicker, DesktopDatePicker, MobileDatePicker, type DatePickerProps, type DesktopDatePickerProps, type MobileDatePickerProps };
//# sourceMappingURL=DatePicker.d.ts.map