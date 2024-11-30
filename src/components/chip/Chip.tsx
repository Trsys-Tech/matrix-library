import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { CloseIcon } from "../Icons/CloseIcon";

const chipVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-medium", {
  variants: {
    variant: {
      primary: "bg-primary-100 text-primary-700 border border-primary",
      neutral: "bg-gray-50 text-text-400 border border-gray-400",
    },
    size: {
      sm: "px-2 h-6",
      md: "px-4 h-8",
      lg: "px-6 h-10 text-sm",
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
          className={cn(
            { "-me-3 [&>svg]:w-5 [&>svg]:h-5": size === "lg" },
            { "-me-2 [&>svg]:w-4.5 [&>svg]:h-4.5": size === "md" || size === undefined },
            { "-me-1 [&>svg]:w-4 [&>svg]:h-4": size === "sm" },
          )}
        >
          <CloseIcon />
        </button>
      ) : null}
    </Comp>
  );
});
Chip.displayName = "Chip";

export { Chip, type ChipProps };
