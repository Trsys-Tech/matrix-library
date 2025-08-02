import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

type Time = { hour: number; minute: number; ampm: "AM" | "PM" };

type TimePickerContentProps = {
  time: Time | undefined;
  isOpen: boolean;
  onTimeChange: (time: Time | undefined) => void;
  slotsProps?: {
    content?: HTMLAttributes<HTMLDivElement>;
  };
};

const getNow = (): Time => {
  return { hour: new Date().getHours() % 12, minute: new Date().getMinutes(), ampm: new Date().getHours() < 12 ? "AM" : "PM" };
};

const TimePickerContent: React.FC<TimePickerContentProps> = ({ isOpen, time, onTimeChange, slotsProps }) => {
  const [selectedtime, setSelectedTime] = useState<Time>(time ?? getNow());
  const selectedTimeRef = useRef<Time>(selectedtime);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const itemHeight = 32; // Assuming each item height is 40px
  const marginBetweenItems = 8; // Assuming margin between each item is 8px

  // Function to scroll to a specific hour
  const scrollToHour = (index: number) => {
    hourRef?.current?.scrollTo({
      top: index * (itemHeight + marginBetweenItems),
      behavior: "smooth",
    });
  };

  // Function to scroll to a specific minute
  const scrollToMinute = (index: number) => {
    minuteRef?.current?.scrollTo({
      top: index * (itemHeight + marginBetweenItems),
      behavior: "smooth",
    });
  };

  const handleSethour = (hour: number) => {
    selectedTimeRef.current = { ...selectedtime, hour };
    setSelectedTime(selectedTimeRef.current);
    onTimeChange(selectedTimeRef.current);
  };

  const handleSetMinute = (minute: number) => {
    selectedTimeRef.current = { ...selectedtime, minute };
    setSelectedTime(selectedTimeRef.current);
    onTimeChange(selectedTimeRef.current);
  };

  const handleSetAMPM = (ampm: "AM" | "PM") => {
    selectedTimeRef.current = { ...selectedtime, ampm };
    setSelectedTime(selectedTimeRef.current);
    onTimeChange(selectedTimeRef.current);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedTime(time ?? getNow());
    }
  }, [isOpen, time]);

  useEffect(() => {
    // Center the selected hour/minute on mount
    if (isOpen) {
      setTimeout(() => {
        scrollToHour(selectedTimeRef.current.hour - 1);
        scrollToMinute(selectedTimeRef.current.minute);
      });
    }
  }, [isOpen]);

  return (
    <div {...(slotsProps?.content ?? {})} className={cn("py-2 px-0 h-52 w-full flex justify-center gap-1", slotsProps?.content?.className)}>
      {/* Hour Selector */}
      <div className="w-24 px-2 h-full relative overflow-auto thin-scrollbar" ref={hourRef}>
        {Array.from({ length: 12 }, (_, i) => i).map(hour => (
          <button
            style={{ height: itemHeight, marginBottom: marginBetweenItems }}
            className={cn(
              "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
              hour + 1 === selectedtime.hour && "bg-secondary",
            )}
            key={hour + 1}
            onClick={() => handleSethour(hour + 1)}
          >
            {(hour + 1).toString().padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Minute Selector */}
      <div className="h-full w-24 px-2 relative overflow-auto thin-scrollbar" ref={minuteRef}>
        {Array.from({ length: 60 }, (_, i) => i).map(minute => (
          <button
            style={{ height: itemHeight, marginBottom: marginBetweenItems }}
            className={cn(
              "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
              minute === selectedtime.minute && "bg-secondary",
            )}
            key={minute}
            onClick={() => handleSetMinute(minute)}
          >
            {minute.toString().padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* AM/PM Selector */}
      <div className="h-full w-24 px-2 relative overflow-auto thin-scrollbar">
        {["AM", "PM"].map(ampm => (
          <button
            style={{ height: itemHeight, marginBottom: marginBetweenItems }}
            className={cn(
              "w-full flex justify-center items-center rounded-full text-xs font-bold text-text-400",
              ampm === selectedtime.ampm && "bg-secondary",
            )}
            key={ampm}
            onClick={() => handleSetAMPM(ampm as "AM" | "PM")}
          >
            {ampm}
          </button>
        ))}
      </div>
    </div>
  );
};
export { TimePickerContent, type TimePickerContentProps, type Time };
