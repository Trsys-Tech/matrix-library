"use client";

import * as React from "react";
import { Content, List, Root, TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps, Trigger } from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = Root;

const TabsList = React.forwardRef<React.ElementRef<typeof List>, React.ComponentPropsWithoutRef<typeof List>>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "inline-flex h-12 w-full overflow-auto thin-scrollbar items-center justify-start bg-background p-0 text-muted-foreground md:[box-shadow:inset_0_-1px_0_hsl(var(--gray-300))]",
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
        "inline-flex items-center justify-center whitespace-nowrap h-full px-3 py-1 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary",
        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof Content>, React.ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => <Content ref={ref} className={cn("mt-2", className)} {...props} />,
);
TabsContent.displayName = Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps, type TabsListProps, type TabsTriggerProps, type TabsContentProps };
