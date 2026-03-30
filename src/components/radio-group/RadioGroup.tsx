"use client";

import * as React from "react";
import { Circle } from "@trsys-tech/matrix-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { RadioGroupProps, RadioGroupItemProps } from "@radix-ui/react-radio-group";

import { cn } from "../../lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("mtx-grid mtx-gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "mtx-aspect-square mtx-h-4 mtx-w-4 mtx-rounded-full mtx-border mtx-border-gray-400 data-[state=checked]:mtx-border-primary hover:mtx-border-primary mtx-text-primary mtx-shadow focus:mtx-outline-none focus-visible:mtx-ring-1 focus-visible:mtx-ring-ring disabled:mtx-cursor-not-allowed disabled:mtx-bg-muted disabled:mtx-border-muted",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="mtx-flex mtx-items-center mtx-justify-center">
        <Circle className="mtx-h-2.5 mtx-w-2.5 mtx-fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps };
