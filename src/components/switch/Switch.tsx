"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "../../lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const switchVariants = tv({
  base: "mtx-peer mtx-inline-flex mtx-h-4 mtx-w-7 mtx-shrink-0 mtx-cursor-pointer mtx-items-center mtx-rounded-full mtx-border-2 mtx-border-transparent mtx-shadow-sm mtx-transition-colors focus-visible:mtx-outline-none focus-visible:mtx-ring-2 focus-visible:mtx-ring-ring focus-visible:mtx-ring-offset-2 focus-visible:mtx-ring-offset-background disabled:mtx-cursor-not-allowed disabled:mtx-opacity-50 data-[state=checked]:mtx-bg-primary data-[state=unchecked]:mtx-bg-input",
  variants: {
    size: {
      sm: "mtx-h-4 mtx-w-7 [&>span]:mtx-h-3 [&>span]:mtx-w-3 [&>span]:data-[state=checked]:mtx-translate-x-3",
      md: "mtx-h-5 mtx-w-9 [&>span]:mtx-h-4 [&>span]:mtx-w-4 [&>span]:data-[state=checked]:mtx-translate-x-4",
      lg: "mtx-h-6 mtx-w-11 [&>span]:mtx-h-5 [&>span]:mtx-w-5 [&>span]:data-[state=checked]:mtx-translate-x-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SwitchProps extends SwitchPrimitives.SwitchProps, VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root className={cn(switchVariants({ size, className }))} {...props} ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "mtx-pointer-events-none mtx-block mtx-rounded-full mtx-bg-background mtx-shadow-lg mtx-ring-0 mtx-transition-transform data-[state=unchecked]:mtx-translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };
