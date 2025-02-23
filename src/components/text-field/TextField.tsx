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
  ({ className, slotProps, suffix, endAdornment, startAdornment, size, value, onChange, defaultValue, type, disabled, ...props }, ref) => {
    return (
      <div {...props} className={cn(textFieldVariants({ size, className }))} aria-disabled={disabled}>
        {startAdornment}
        <input
          type={type}
          ref={ref}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          {...(slotProps?.inputProps ?? {})}
          className={cn(
            "focus:outline-none w-full h-full py-1 rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300",
            !startAdornment ? "px-3" : "ps-1 pe-3",
            slotProps?.inputProps?.className,
          )}
        />
        {typeof suffix === "string" || typeof suffix === "number" ? (
          <span className="inline-flex items-center px-2 text-xs font-medium text-primary bg-primary-50 m-0.5 rounded-sm">{suffix}</span>
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
