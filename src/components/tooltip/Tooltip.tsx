"use client";

import * as React from "react";
import {
  Root,
  Provider,
  Trigger,
  Portal,
  Content,
  TooltipContentProps as ContentProps,
  Arrow,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils";

const TooltipProvider = Provider;

const Tooltip = Root;

const TooltipTrigger = Trigger;

const TooltipContent = React.forwardRef<React.ElementRef<typeof Content>, ContentProps>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-sm bg-primary-900 px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow data-role="arrow" className="w-2 h-1.5" />
    </Content>
  </Portal>
));
TooltipContent.displayName = Content.displayName;
type TooltipContentProps = ContentProps & { ref: React.Ref<React.ElementRef<typeof Content>> };

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipProps,
  type TooltipContentProps,
  type TooltipTriggerProps,
  type TooltipProviderProps,
};
