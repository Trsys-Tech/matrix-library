"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const progressVariants = tv({
  base: "",
  variants: {
    variant: {
      primary: "mtx-bg-primary",
      info: "mtx-bg-info",
      success: "mtx-bg-success",
      warning: "mtx-bg-warning",
      danger: "mtx-bg-danger",
    },
    size: {
      sm: "mtx-h-[3px]",
      md: "mtx-h-[4px]",
      lg: "mtx-h-[5px]",
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
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size }), "mtx-relative mtx-w-full mtx-overflow-hidden mtx-bg-gray-300", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("mtx-h-full mtx-w-full mtx-flex-1 mtx-transition-all", progressVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, type ProgressProps };
