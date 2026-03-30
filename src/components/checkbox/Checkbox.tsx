"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "../../lib/utils";
import { Check, Minus } from "@trsys-tech/matrix-icons";

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "mtx-peer mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-rounded-sm mtx-border mtx-border-gray-400 hover:mtx-border-primary hover:mtx-bg-primary-100 focus-visible:mtx-outline-none focus-visible:mtx-ring-1 focus-visible:mtx-ring-ring disabled:mtx-cursor-not-allowed data-[state=checked]:mtx-bg-primary data-[state=checked]:mtx-text-primary-foreground data-[state=checked]:mtx-border-primary data-[state=indeterminate]:mtx-border-primary data-[state=indeterminate]:mtx-bg-primary data-[state=indeterminate]:mtx-text-primary-foreground disabled:mtx-bg-muted disabled:mtx-border-muted disabled:data-[state=checked]:mtx-border-muted disabled:data-[state=checked]:mtx-bg-muted disabled:data-[state=checked]:mtx-text-muted-foreground disabled:data-[state=indeterminate]:mtx-border-muted disabled:data-[state=indeterminate]:mtx-bg-muted disabled:data-[state=indeterminate]:mtx-text-muted-foreground",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("mtx-flex mtx-items-center mtx-justify-center mtx-text-current mtx-group")}>
          <Check className="mtx-w-full mtx-h-full group-data-[state=indeterminate]:mtx-hidden" />
          <Minus className="mtx-w-full mtx-h-full group-data-[state=checked]:mtx-hidden" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
type CheckboxProps = React.ComponentProps<typeof Checkbox>;

export { Checkbox, type CheckboxProps };
