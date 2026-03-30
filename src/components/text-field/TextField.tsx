"use client";

import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";

const textFieldVariants = tv({
  base: [
    "mtx-flex mtx-items-center mtx-w-full mtx-rounded-sm mtx-border mtx-border-input mtx-text-text mtx-bg-transparent mtx-p-0 mtx-text-xs [&_input]:mtx-text-xs mtx-font-medium mtx-transition-colors file:mtx-border-0 file:mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground",
    "placeholder:mtx-text-text-300 hover:mtx-border-primary-400 focus-within:mtx-border-primary-400 focus-within:mtx-outline-none focus-within:mtx-ring focus-within:mtx-ring-primary-100",
    "aria-disabled:mtx-text-text-300 aria-disabled:mtx-bg-gray-100 aria-disabled:mtx-border-gray-100",
  ],
  variants: {
    size: {
      sm: "mtx-h-7",
      md: "mtx-h-8",
      lg: "mtx-h-11",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof textFieldVariants> {
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  suffix?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  defaultValue?: string | number;
  slotProps?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  };
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      slotProps,
      suffix,
      endAdornment,
      startAdornment,
      size,
      value,
      onChange,
      defaultValue,
      type,
      disabled,
      onWheel,
      id,
      "aria-describedby": ariaDescribedby,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
      if (type === "number") {
        // Prevents the number input from changing value when scrolling
        (event.target as HTMLInputElement).blur();
      }
      if (onWheel) {
        onWheel(event);
      }
    };

    return (
      <div {...props} className={cn(textFieldVariants({ size, className }))} aria-disabled={disabled}>
        {startAdornment}
        <input
          type={type}
          onWheel={handleWheel}
          ref={ref}
          id={id}
          aria-describedby={ariaDescribedby}
          aria-invalid={ariaInvalid}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          {...(slotProps?.inputProps ?? {})}
          className={cn(
            "focus:mtx-outline-none mtx-w-full mtx-h-full mtx-py-1 mtx-rounded-sm file:mtx-border-0 mtx-bg-transparent file:mtx-text-sm file:mtx-font-medium file:mtx-text-foreground placeholder:mtx-text-text-300",
            !startAdornment ? "mtx-px-3" : "mtx-ps-1 mtx-pe-3",
            slotProps?.inputProps?.className,
          )}
        />
        {typeof suffix === "string" || typeof suffix === "number" ? (
          <span className="mtx-inline-flex mtx-items-center mtx-px-2 mtx-text-xs mtx-font-medium mtx-text-primary mtx-bg-primary-50 mtx-m-0.5 mtx-rounded-sm">
            {suffix}
          </span>
        ) : (
          suffix
        )}
        {endAdornment}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export { TextField, type TextFieldProps };
