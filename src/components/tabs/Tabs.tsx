"use client";

import * as React from "react";
import { Content, List, Root, TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps, Trigger } from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = Root;

const TabsList = React.forwardRef<React.ElementRef<typeof List>, React.ComponentPropsWithoutRef<typeof List>>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "mtx-inline-flex mtx-h-12 mtx-w-full mtx-overflow-auto mtx-thin-scrollbar mtx-items-center mtx-justify-start mtx-bg-background mtx-p-0 mtx-text-muted-foreground md:mtx-[box-shadow:inset_0_-oklch(var(--gray-300))]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof Trigger>, React.ComponentPropsWithoutRef<typeof Trigger>>(
  ({ className, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={cn(
        "mtx-inline-flex mtx-items-center mtx-justify-center mtx-whitespace-nowrap mtx-h-full mtx-px-3 mtx-py-1 mtx-text-sm mtx-font-medium disabled:mtx-pointer-events-none disabled:mtx-opacity-50 data-[state=active]:mtx-text-foreground data-[state=active]:mtx-font-bold data-[state=active]:mtx-border-b-2 data-[state=active]:mtx-border-primary",
        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof Content>, React.ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => <Content ref={ref} className={cn("mtx-mt-2", className)} {...props} />,
);
TabsContent.displayName = Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps, type TabsListProps, type TabsTriggerProps, type TabsContentProps };
