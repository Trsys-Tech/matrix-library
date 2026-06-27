"use client";

import React from "react";
import { DesktopDatePicker, DesktopDatePickerProps } from "./DesktopDatePicker";
import { MobileDatePicker, MobileDatePickerProps } from "./MobileDatePicker";
import { type DateOnlyString, type DateValue } from "./dateValue";
import { useIsMobile } from "../../lib/hooks/use-mobile";

/**
 * Props for the responsive single-date picker.
 *
 * Inherits the desktop and mobile single-date picker props and keeps the same
 * public value contract: pass a Date or a YYYY-MM-DD string to selected and
 * receive a YYYY-MM-DD string from onSelect.
 */
type DatePickerProps = DesktopDatePickerProps & MobileDatePickerProps & {};

/**
 * Responsive single-date picker.
 *
 * Renders the mobile dialog picker on mobile screens and the desktop popover
 * picker on larger screens.
 *
 * @example
 * const [invoiceDate, setInvoiceDate] = React.useState<string | undefined>("2025-12-24");
 *
 * <DatePicker
 *   selected={invoiceDate}
 *   onSelect={setInvoiceDate}
 *   placeholder="Pick an invoice date"
 * />
 */
const DatePicker: React.FC<DatePickerProps> = props => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileDatePicker {...props} /> : <DesktopDatePicker {...props} />;
};

export {
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
  type DatePickerProps,
  type DesktopDatePickerProps,
  type MobileDatePickerProps,
  type DateOnlyString,
  type DateValue,
};
