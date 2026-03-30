"use client";

import React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import type { CollapsibleProps, CollapsibleContentProps, CollapsibleTriggerProps } from "@radix-ui/react-collapsible";

import { cn } from "../../lib/utils";

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root ref={ref} className={cn("mtx-rounded-lg mtx-bg-card mtx-text-card-foreground mtx-shadow-card", className)} {...props} />
));
Collapsible.displayName = "Collapsible";

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className="mtx-overflow-hidden data-[state=closed]:mtx-animate-collapsible-up data-[state=open]:mtx-animate-collapsible-down mtx-rounded-b-lg"
    {...props}
  >
    <div className={cn("mtx-p-4 mtx-pt-0", className)}>{children}</div>
  </CollapsiblePrimitive.CollapsibleContent>
));
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger ref={ref} className={cn("mtx-p-4", className)} {...props}>
    {children}
  </CollapsiblePrimitive.CollapsibleTrigger>
));
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent, type CollapsibleProps, type CollapsibleContentProps, type CollapsibleTriggerProps };
