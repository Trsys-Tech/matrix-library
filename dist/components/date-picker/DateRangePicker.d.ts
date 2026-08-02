import { default as React } from 'react';
import { MobileDateRangePicker, MobileDateRangePickerProps } from './MobileDateRangePicker';
import { DesktopDateRangePicker, DesktopDateRangePickerProps } from './DesktopDateRangePicker';
import { DateOnlyRange, DateRangeValue } from './dateValue';
/**
 * Props for the responsive date-range picker.
 *
 * Inherits the desktop and mobile range picker props and keeps the same public
 * value contract: pass Date objects or YYYY-MM-DD strings and receive a
 * { from, to } object with YYYY-MM-DD values from onSelect.
 */
type DateRangePickerProps = DesktopDateRangePickerProps & MobileDateRangePickerProps & {};
/**
 * Responsive date-range picker.
 *
 * Renders the mobile dialog picker on mobile screens and the desktop popover
 * picker on larger screens.
 *
 * @example
 * const [billingRange, setBillingRange] = React.useState<{ from?: string; to?: string } | undefined>({
 *   from: "2025-12-01",
 *   to: "2025-12-31",
 * });
 *
 * <DateRangePicker selected={billingRange} onSelect={setBillingRange} />
 */
declare const DateRangePicker: React.FC<DateRangePickerProps>;
export { DateRangePicker, DesktopDateRangePicker, MobileDateRangePicker, type DateRangePickerProps, type DesktopDateRangePickerProps, type MobileDateRangePickerProps, type DateOnlyRange, type DateRangeValue, };
//# sourceMappingURL=DateRangePicker.d.ts.map