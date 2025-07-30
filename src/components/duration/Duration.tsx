"use client";

import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const textFieldVariants = tv({
  base: [
    "flex items-center w-full rounded-sm border border-input text-text bg-transparent p-0 text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100",
    "aria-disabled:text-text-300 aria-disabled:bg-gray-100 aria-disabled:border-gray-100",
  ],
  variants: {
    size: {
      sm: "h-7",
      md: "h-8",
      lg: "h-11",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface DurationProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof textFieldVariants> {
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  showSeconds?: boolean;
  slotProps?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  };
}

const Duration = React.forwardRef<HTMLInputElement, DurationProps>(
  (
    { className, slotProps, endAdornment, startAdornment, size, value: _value, onChange, defaultValue, disabled, showSeconds = false, ...props },
    ref,
  ) => {
    const getFormattedValue = React.useCallback(
      (val: string) => {
        const digits = val.replace(/\D/g, "");
        const maxLength = showSeconds ? 6 : 4;
        const limitedDigits = digits.substring(0, maxLength).padEnd(maxLength, "0");

        let hours = limitedDigits.substring(0, 2);
        let minutes = limitedDigits.substring(2, 4);
        let seconds = showSeconds ? limitedDigits.substring(4, 6) : "";

        if (parseInt(hours, 10) > 23) hours = "23";
        if (parseInt(minutes, 10) > 59) minutes = "59";
        if (showSeconds && parseInt(seconds, 10) > 59) seconds = "59";

        let formatted = hours;
        if (maxLength >= 4) formatted += `:${minutes}`;
        if (showSeconds) formatted += `:${seconds}`;

        return formatted;
      },
      [showSeconds],
    );

    const [value, setValue] = React.useState(() => getFormattedValue(defaultValue || ""));
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (_value !== undefined) {
        setValue(getFormattedValue(_value));
      }
    }, [_value, getFormattedValue]);

    const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const input = e.currentTarget;
      const { key } = e;
      const selection = input.selectionStart ?? 0;
      const nextValue = value.substring(0, selection) + key + value.substring(selection + 1);
      const formatted = getFormattedValue(nextValue);
      setValue(formatted);

      if (onChange) {
        const syntheticEvent = { ...e, target: { ...e.target, value: formatted } };
        onChange(syntheticEvent as unknown as React.ChangeEvent<HTMLInputElement>);
      }

      requestAnimationFrame(() => {
        let nextCursor = selection + 1;
        if (formatted[nextCursor] === ":") {
          nextCursor++;
        }
        input.setSelectionRange(nextCursor, nextCursor);
      });
    };

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const input = e.currentTarget;
      const selection = input.selectionStart ?? 0;
      if (selection === 0) return;

      let nextValue = "";
      let nextCursor = selection - 1;

      if (value[selection - 1] === ":") {
        nextValue = `${value.substring(0, selection - 2)}0${value.substring(selection - 1)}`;
        nextCursor = selection - 2;
      } else {
        const currentValue = value.replace(/\D/g, "");
        const cursorIndex = selection - Math.floor((selection - 1) / 3);
        const nextDigits = `${currentValue.substring(0, cursorIndex - 1)}0${currentValue.substring(cursorIndex)}`;
        nextValue = getFormattedValue(nextDigits);
      }

      const formatted = getFormattedValue(nextValue);
      setValue(formatted);

      if (onChange) {
        const syntheticEvent = { ...e, target: { ...e.target, value: formatted } };
        onChange(syntheticEvent as unknown as React.ChangeEvent<HTMLInputElement>);
      }

      requestAnimationFrame(() => {
        input.setSelectionRange(nextCursor, nextCursor);
      });
    };

    const handleArrowKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const input = e.currentTarget;
      const { key } = e;
      const increment = key === "ArrowUp" ? 1 : -1;
      const parts = value.split(":").map(Number);
      const selection = input.selectionStart ?? 0;

      if (selection <= 2) {
        // Hours
        parts[0] = (parts[0] + increment + 24) % 24;
      } else if (selection >= 3 && selection <= 5) {
        // Minutes
        const newMinutes = parts[1] + increment;
        if (newMinutes >= 60) {
          parts[0] = (parts[0] + 1) % 24;
          parts[1] = newMinutes % 60;
        } else if (newMinutes < 0) {
          parts[0] = (parts[0] - 1 + 24) % 24;
          parts[1] = 59;
        } else {
          parts[1] = newMinutes;
        }
      } else if (showSeconds && selection >= 6) {
        // Seconds
        const newSeconds = parts[2] + increment;
        if (newSeconds >= 60) {
          parts[1] += 1;
          parts[2] = newSeconds % 60;
        } else if (newSeconds < 0) {
          parts[1] -= 1;
          parts[2] = 59;
        } else {
          parts[2] = newSeconds;
        }

        if (parts[1] >= 60) {
          parts[0] = (parts[0] + 1) % 24;
          parts[1] %= 60;
        } else if (parts[1] < 0) {
          parts[0] = (parts[0] - 1 + 24) % 24;
          parts[1] = 59;
        }
      }

      const newValue = parts.map(part => String(part).padStart(2, "0")).join(":");
      setValue(newValue);
      if (onChange) {
        onChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
      }
      requestAnimationFrame(() => {
        input.setSelectionRange(selection, selection);
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key, currentTarget } = e;
      const { selectionStart, selectionEnd } = currentTarget;

      if (key.length === 1 && /\d/.test(key)) {
        handleNumericInput(e);
      } else if (key === "Backspace") {
        handleBackspace(e);
      } else if (key === "ArrowUp" || key === "ArrowDown") {
        handleArrowKey(e);
      } else if (key === "ArrowRight" || key === "ArrowLeft" || key.length > 1 || selectionStart !== selectionEnd) {
        // Allow navigation, control keys, and replacing a selection
      } else {
        e.preventDefault();
      }
    };

    return (
      <div {...props} className={cn(textFieldVariants({ size, className }))} aria-disabled={disabled}>
        {startAdornment}
        <input
          type="text"
          inputMode="numeric"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={() => {}}
          value={value}
          placeholder={showSeconds ? "HH:MM:SS" : "HH:MM"}
          disabled={disabled}
          {...(slotProps?.inputProps ?? {})}
          className={cn(
            "focus:outline-none w-full h-full py-1 rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300",
            !startAdornment ? "px-3" : "ps-1 pe-3",
            slotProps?.inputProps?.className,
          )}
        />

        {endAdornment}
      </div>
    );
  },
);
Duration.displayName = "Duration";

export { Duration, type DurationProps };
