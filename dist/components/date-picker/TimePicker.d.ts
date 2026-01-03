import { default as React } from 'react';
import { Time } from './TimePickerContent';
import { MobileTimePicker, MobileTimePickerProps } from './MobileTimePicker';
import { DesktopTimePicker, DesktopTimePickerProps } from './DesktopTimePicker';
type TimePickerProps = DesktopTimePickerProps & {};
declare const TimePicker: React.FC<TimePickerProps>;
export { TimePicker, DesktopTimePicker, type DesktopTimePickerProps, MobileTimePicker, type MobileTimePickerProps, type TimePickerProps, type Time };
//# sourceMappingURL=TimePicker.d.ts.map