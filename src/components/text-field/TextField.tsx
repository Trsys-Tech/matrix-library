import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const textFieldVariants = cva(
  "flex items-center w-full rounded-sm border border-input text-gray-800 bg-transparent p-0 text-xs font-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300 hover:border-primary-400 focus-within:border-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-100  disabled:cursor-not-allowed disabled:text-text-300 disabled:bg-gray-100 disabled:border-gray-100",
  {
    variants: {
      size: {
        sm: "h-7",
        md: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof textFieldVariants> {
  type?: React.HTMLInputTypeAttribute;
  suffix?: React.ReactNode;
  endButton?: React.ReactNode;
  startButton?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  defaultValue?: string | number;
  slotProps?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  };
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, slotProps, suffix, endButton, startButton, size, value, onChange, defaultValue, type, ...props }, ref) => {
    return (
      <div {...props} className={cn(textFieldVariants({ size, className }))}>
        {startButton}
        <input
          type={type}
          ref={ref}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          {...(slotProps?.inputProps ?? {})}
          className={cn(
            "focus:outline-none w-full h-full px-3 py-1 rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-300 ",
            slotProps?.inputProps?.className,
          )}
        />
        {typeof suffix === "string" || typeof suffix === "number" ? (
          <span className="inline-flex items-center px-2 text-xs font-medium text-primary bg-primary-50 m-0.5 rounded-sm">{suffix}</span>
        ) : (
          suffix
        )}
        {endButton}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export { TextField, type TextFieldProps };
