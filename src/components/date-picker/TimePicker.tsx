"use client";

import React from "react";

import { Time } from "./TimePickerContent";
import { useIsMobile } from "../../lib/hooks/use-mobile";
import { MobileTimePicker, MobileTimePickerProps } from "./MobileTimePicker";
import { DesktopTimePicker, DesktopTimePickerProps } from "./DesktopTimePicker";

/**
 * Props for the responsive time picker.
 *
 * Accepts the same public API as the desktop and mobile time pickers.
 * The controlled value is a Time object and onTimeChange receives the same shape.
 */
type TimePickerProps = DesktopTimePickerProps & {};

/**
 * Responsive time picker.
 *
 * Renders the mobile drawer picker on mobile screens and the desktop popover picker
 * on larger screens.
 *
 * @example
 * const [meetingTime, setMeetingTime] = React.useState<Time | undefined>({ hour: 9, minute: 30, ampm: "AM" });
 *
 * <TimePicker time={meetingTime} onTimeChange={setMeetingTime} />
 *
 * @example
 * const [twentyFourHourTime, setTwentyFourHourTime] = React.useState<Time | undefined>({ hour: 14, minute: 30 });
 *
 * <TimePicker time={twentyFourHourTime} onTimeChange={setTwentyFourHourTime} is24HourMode />
 */
const TimePicker: React.FC<TimePickerProps> = props => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileTimePicker {...props} /> : <DesktopTimePicker {...props} />;
};

export { TimePicker, DesktopTimePicker, type DesktopTimePickerProps, MobileTimePicker, type MobileTimePickerProps, type TimePickerProps, type Time };
