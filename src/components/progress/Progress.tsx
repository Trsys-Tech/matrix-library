"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const progressVariants = tv({
  base: "",
  variants: {
    variant: {
      primary: "bg-primary",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
    },
    size: {
      sm: "h-[3px]",
      md: "h-[4px]",
      lg: "h-[5px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  variant?: VariantProps<typeof progressVariants>["variant"];
  size?: VariantProps<typeof progressVariants>["size"];
};

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant, size, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn(progressVariants({ size }), "relative w-full overflow-hidden bg-gray-300", className)} {...props}>
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", progressVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, type ProgressProps };
