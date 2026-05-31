import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

type Time = { hour: number; minute: number; ampm?: "AM" | "PM" };

type TimePickerContentProps = {
  time: Time | undefined;
  isOpen: boolean;
  is24HourMode?: boolean;
  onTimeChange: (time: Time | undefined) => void;
  slotsProps?: {
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

const getNow = (): Time => {
  const now = new Date();
  const hour = now.getHours();

  return { hour: hour % 12 || 12, minute: now.getMinutes(), ampm: hour < 12 ? "AM" : "PM" };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getDefaultTime = (is24HourMode: boolean): Time => {
  return is24HourMode ? { hour: 0, minute: 0 } : getNow();
};

const normalizeTime = (time: Time | undefined, is24HourMode: boolean): Time => {
  if (!time) {
    return getDefaultTime(is24HourMode);
  }

  const minute = clamp(time.minute, 0, 59);
  const hourFromAmpm = time.ampm ? (time.hour % 12) + (time.ampm === "PM" ? 12 : 0) : time.hour;

  if (is24HourMode) {
    return { hour: clamp(hourFromAmpm, 0, 23), minute };
  }

  const hour = hourFromAmpm % 12 || 12;

  return {
    hour,
    minute,
    ampm: time.ampm ?? (hourFromAmpm >= 12 ? "PM" : "AM"),
  };
};

const TimePickerContent: React.FC<TimePickerContentProps> = ({ isOpen, time, is24HourMode = false, onTimeChange, slotsProps }) => {
  const [selectedTime, setSelectedTime] = useState<Time>(() => normalizeTime(time, is24HourMode));
  const selectedTimeRef = useRef<Time>(selectedTime);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const itemHeight = 32;
  const marginBetweenItems = 8;

  const hourOptions = is24HourMode ? Array.from({ length: 24 }, (_, index) => index) : Array.from({ length: 12 }, (_, index) => index + 1);

  const scrollToHour = (index: number) => {
    hourRef?.current?.scrollTo({
      top: index * (itemHeight + marginBetweenItems),
      behavior: "smooth",
    });
  };

  const scrollToMinute = (index: number) => {
    minuteRef?.current?.scrollTo({
      top: index * (itemHeight + marginBetweenItems),
      behavior: "smooth",
    });
  };

  const updateSelectedTime = (nextTime: Time) => {
    const normalizedTime = normalizeTime(nextTime, is24HourMode);
    selectedTimeRef.current = normalizedTime;
    setSelectedTime(normalizedTime);
    onTimeChange(normalizedTime);
  };

  const handleSetHour = (hour: number) => {
    updateSelectedTime({ ...selectedTimeRef.current, hour });
  };

  const handleSetMinute = (minute: number) => {
    updateSelectedTime({ ...selectedTimeRef.current, minute });
  };

  const handleSetAMPM = (ampm: "AM" | "PM") => {
    updateSelectedTime({ ...selectedTimeRef.current, ampm });
  };

  useEffect(() => {
    if (isOpen) {
      const nextTime = normalizeTime(time, is24HourMode);
      selectedTimeRef.current = nextTime;
      setSelectedTime(nextTime);
    }
  }, [isOpen, time, is24HourMode]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToHour(is24HourMode ? selectedTimeRef.current.hour : selectedTimeRef.current.hour - 1);
      scrollToMinute(selectedTimeRef.current.minute);
    });

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, is24HourMode]);

  return (
    <div {...(slotsProps?.content ?? {})} className={cn("py-2 px-0 h-52 w-full flex justify-center gap-1", slotsProps?.content?.className)}>
      <div className="w-24 px-2 h-full relative overflow-auto thin-scrollbar" ref={hourRef}>
        {hourOptions.map(hour => (
          <button
            style={{ height: itemHeight, marginBottom: marginBetweenItems }}
            className={cn(
              "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
              hour === selectedTime.hour && "bg-secondary",
            )}
            key={hour}
            onClick={() => handleSetHour(hour)}
          >
            {hour.toString().padStart(2, "0")}
          </button>
        ))}
      </div>

      <div className="h-full w-24 px-2 relative overflow-auto thin-scrollbar" ref={minuteRef}>
        {Array.from({ length: 60 }, (_, i) => i).map(minute => (
          <button
            style={{ height: itemHeight, marginBottom: marginBetweenItems }}
            className={cn(
              "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
              minute === selectedTime.minute && "bg-secondary",
            )}
            key={minute}
            onClick={() => handleSetMinute(minute)}
          >
            {minute.toString().padStart(2, "0")}
          </button>
        ))}
      </div>

      {!is24HourMode && (
        <div className="h-full w-24 px-2 relative overflow-auto thin-scrollbar">
          {["AM", "PM"].map(ampm => (
            <button
              style={{ height: itemHeight, marginBottom: marginBetweenItems }}
              className={cn(
                "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
                ampm === selectedTime.ampm && "bg-secondary",
              )}
              key={ampm}
              onClick={() => handleSetAMPM(ampm as "AM" | "PM")}
            >
              {ampm}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export { TimePickerContent, type TimePickerContentProps, type Time };
