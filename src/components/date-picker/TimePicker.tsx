import React from "react";

import { Time } from "./TimePickerContent";
import { useIsMobile } from "../../lib/hooks/use-mobile";
import { MobileTimePicker, MobileTimePickerProps } from "./MobileTimePicker";
import { DesktopTimePicker, DesktopTimePickerProps } from "./DesktopTimePicker";

type TimePickerProps = DesktopTimePickerProps & {};

const TimePicker: React.FC<TimePickerProps> = props => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileTimePicker {...props} /> : <DesktopTimePicker {...props} />;
};

export { TimePicker, DesktopTimePicker, type DesktopTimePickerProps, MobileTimePicker, type MobileTimePickerProps, type TimePickerProps, type Time };
