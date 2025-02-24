"use client";

import * as React from "react";
import { Root, SeparatorProps } from "@radix-ui/react-separator";

import { cn } from "../../lib/utils";

const Separator = React.forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
      {...props}
    />
  ),
);
Separator.displayName = Root.displayName;

export { Separator, type SeparatorProps };
