"use client";

import React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";
import { Spinner } from "@trsys-tech/matrix-icons";

const iconButtonVariants = tv({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-1 mtx-p-2 mtx-rounded-sm mtx-text-xs mtx-font-normal mtx-transition-colors focus-visible:mtx-outline-none disabled:mtx-pointer-events-none disabled:mtx-bg-muted disabled:mtx-text-gray-500",
  variants: {
    variant: {
      table: "mtx-text-text hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700",
      toolbar:
        "mtx-text-primary hover:mtx-bg-primary-50 focus:mtx-bg-transparent focus:mtx-ring active:mtx-bg-primary-50 active:mtx-text-primary-700",
      form: "mtx-border mtx-border-gray-300 mtx-text-primary hover:mtx-border-none hover:mtx-bg-primary-50 focus:mtx-border-none focus:mtx-bg-transparent focus:mtx-ring active:mtx-border-none active:mtx-bg-primary-50 active:mtx-text-primary-700 disabled:mtx-border-none",
      danger: "mtx-text-danger hover:mtx-bg-danger-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-danger-400 active:mtx-bg-danger-300",
      warning:
        "mtx-text-warning hover:mtx-bg-warning-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-warning-400 active:mtx-bg-warning-300",
      success:
        "mtx-text-success hover:mtx-bg-success-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-success-400 active:mtx-bg-success-300",
      info: "mtx-text-info hover:mtx-bg-info-200 focus:mtx-bg-transparent focus:mtx-ring focus:mtx-ring-info-400 active:mtx-bg-info-300",
    },
    size: {
      md: "mtx-h-8 mtx-w-8.5",
      sm: "mtx-h-6 mtx-w-6 mtx-p-1 [&>svg]:mtx-h-4 [&>svg]:mtx-w-4",
      lg: "mtx-h-10 mtx-w-10 [&>svg]:mtx-h-6 [&>svg]:mtx-w-6",
    },
  },
  defaultVariants: {
    variant: "table",
    size: "md",
  },
});

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ asChild, children, className, disabled, loading, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(iconButtonVariants({ variant, size, className }))} disabled={disabled || loading} ref={ref} {...props}>
        {loading ? <Spinner /> : null}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);

export { IconButton, type IconButtonProps };
