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
          "peer h-4 w-4 shrink-0 rounded-sm border border-gray-400 hover:border-primary hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground disabled:bg-muted disabled:border-muted disabled:data-[state=checked]:border-muted disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:text-muted-foreground disabled:data-[state=indeterminate]:border-muted disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current group")}>
          <Check className="w-full h-full group-data-[state=indeterminate]:hidden" />
          <Minus className="w-full h-full group-data-[state=checked]:hidden" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
type CheckboxProps = React.ComponentProps<typeof Checkbox>;

export { Checkbox, type CheckboxProps };
