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
      className={cn("mtx-shrink-0 mtx-bg-border", orientation === "horizontal" ? "mtx-h-[1px] mtx-w-full" : "mtx-h-full mtx-w-[1px]", className)}
      {...props}
    />
  ),
);
Separator.displayName = Root.displayName;

export { Separator, type SeparatorProps };
