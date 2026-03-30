"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "../../lib/utils";
import { ChevronDown } from "@trsys-tech/matrix-icons";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("mtx-border-b", className)} {...props} />);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="mtx-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "mtx-flex mtx-flex-1 mtx-items-center mtx-justify-between mtx-py-4 mtx-text-sm mtx-font-medium mtx-transition-all hover:mtx-underline mtx-text-left [&[data-state=open]>svg]:mtx-rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="mtx-h-4 mtx-w-4 mtx-shrink-0 mtx-text-muted-foreground mtx-transition-transform mtx-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="mtx-overflow-hidden mtx-text-sm data-[state=closed]:mtx-animate-accordion-up data-[state=open]:mtx-animate-accordion-down"
    {...props}
  >
    <div className={cn("mtx-pb-4 mtx-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
