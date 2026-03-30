"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";
import { XMark } from "@trsys-tech/matrix-icons";

const chipVariants = tv({
  base: "mtx-inline-flex mtx-items-center mtx-justify-center mtx-gap-2 mtx-whitespace-nowrap mtx-rounded-full mtx-text-xs mtx-font-medium",
  variants: {
    variant: {
      primary: "mtx-bg-primary-100 mtx-text-primary-700 mtx-border mtx-border-primary",
      neutral: "mtx-bg-gray-50 mtx-text-text-400 mtx-border mtx-border-gray-400",
      "table-primary": "mtx-bg-primary-25 mtx-text-primary mtx-font-bold",
      "table-neutral": "mtx-bg-gray-50 mtx-text-text-400 mtx-font-medium",
    },
    size: {
      sm: "mtx-px-2 mtx-h-6",
      md: "mtx-px-4 mtx-h-8",
      lg: "mtx-px-6 mtx-h-10 mtx-text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ChipProps extends React.ButtonHTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {
  asChild?: boolean;
  onClose?: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(({ className, variant, asChild = false, children, onClose, size, ...props }, ref) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp className={cn(chipVariants({ variant, size, className }))} ref={ref} {...props}>
      {children}
      {onClose ? (
        <button
          onClick={onClose}
          className={cn(
            { "-mtx-me-3 [&>svg]:mtx-w-5 [&>svg]:mtx-h-5": size === "lg" },
            { "-mtx-me-2 [&>svg]:mtx-w-4.5 [&>svg]:mtx-h-4.5": size === "md" || size === undefined },
            { "-mtx-me-1 [&>svg]:mtx-w-4 [&>svg]:mtx-h-4": size === "sm" },
          )}
        >
          <XMark />
        </button>
      ) : null}
    </Comp>
  );
});
Chip.displayName = "Chip";

export { Chip, type ChipProps };
