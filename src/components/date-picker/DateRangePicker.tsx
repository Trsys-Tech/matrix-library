"use client";

import React from "react";

import { useIsMobile } from "../../lib/hooks/use-mobile";
import { MobileDateRangePicker, MobileDateRangePickerProps } from "./MobileDateRangePicker";
import { DesktopDateRangePicker, DesktopDateRangePickerProps } from "./DesktopDateRangePicker";
import { type DateOnlyRange, type DateRangeValue } from "./dateValue";

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
const DateRangePicker: React.FC<DateRangePickerProps> = props => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileDateRangePicker {...props} /> : <DesktopDateRangePicker {...props} />;
};

export {
  DateRangePicker,
  DesktopDateRangePicker,
  MobileDateRangePicker,
  type DateRangePickerProps,
  type DesktopDateRangePickerProps,
  type MobileDateRangePickerProps,
  type DateOnlyRange,
  type DateRangeValue,
};
