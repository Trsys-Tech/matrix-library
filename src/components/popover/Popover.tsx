"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { PopoverContentProps, PopoverProps, PopoverTriggerProps, PopoverAnchorProps } from "@radix-ui/react-popover";

import { cn } from "../../lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "mtx-z-50 mtx-w-72 mtx-rounded-md mtx-border mtx-bg-popover mtx-p-4 mtx-text-popover-foreground mtx-shadow-md mtx-outline-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  type PopoverProps,
  type PopoverContentProps,
  type PopoverTriggerProps,
  type PopoverAnchorProps,
};
