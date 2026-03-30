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
        "mtx-z-50 mtx-rounded-sm mtx-bg-primary-900 mtx-px-3 mtx-py-1.5 mtx-text-xs mtx-text-primary-foreground mtx-animate-in mtx-fade-in-0 mtx-zoom-in-95 data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=closed]:mtx-zoom-out-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow data-role="arrow" className="mtx-w-2 mtx-h-1.5" />
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
