"use client";

import React from "react";

import { useIsMobile } from "../../lib/hooks/use-mobile";
import { MobileDateRangePicker, MobileDateRangePickerProps } from "./MobileDateRangePicker";
import { DesktopDateRangePicker, DesktopDateRangePickerProps } from "./DesktopDateRangePicker";

type DateRangePickerProps = DesktopDateRangePickerProps & MobileDateRangePickerProps & {};

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
};
