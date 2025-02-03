"use client";

import React from "react";
import { DesktopDatePicker, DesktopDatePickerProps } from "./DesktopDatePicker";
import { MobileDatePicker, MobileDatePickerProps } from "./MobileDatePicker";
import { useIsMobile } from "../../lib/hooks/use-mobile";

type DatePickerProps = DesktopDatePickerProps & MobileDatePickerProps & {};

const DatePicker: React.FC<DatePickerProps> = props => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileDatePicker {...props} /> : <DesktopDatePicker {...props} />;
};

export { DatePicker, DesktopDatePicker, MobileDatePicker, type DatePickerProps, type DesktopDatePickerProps, type MobileDatePickerProps };
