"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[state=open]:mtx-bg-accent data-[state=open]:mtx-text-accent-foreground",
      inset && "mtx-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="mtx-ml-auto mtx-h-4 mtx-w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "mtx-z-50 mtx-min-w-[8rem] mtx-overflow-hidden mtx-rounded-md mtx-border mtx-bg-popover mtx-p-1 mtx-text-popover-foreground mtx-shadow-lg data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "mtx-z-50 mtx-min-w-[8rem] mtx-overflow-hidden mtx-rounded-md mtx-border mtx-bg-popover mtx-p-1 mtx-text-popover-foreground mtx-shadow-md data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[side=bottom]:mtx-slide-in-from-top-2 data-[side=left]:mtx-slide-in-from-right-2 data-[side=right]:mtx-slide-in-from-left-2 data-[side=top]:mtx-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "mtx-relative mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
      inset && "mtx-pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "mtx-relative mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-py-1.5 mtx-pl-8 mtx-pr-2 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="mtx-absolute mtx-left-2 mtx-flex mtx-h-3.5 mtx-w-3.5 mtx-items-center mtx-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="mtx-h-4 mtx-w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "mtx-relative mtx-flex mtx-cursor-default mtx-select-none mtx-items-center mtx-rounded-sm mtx-py-1.5 mtx-pl-8 mtx-pr-2 mtx-text-sm mtx-outline-none focus:mtx-bg-accent focus:mtx-text-accent-foreground data-[disabled]:mtx-pointer-events-none data-[disabled]:mtx-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="mtx-absolute mtx-left-2 mtx-flex mtx-h-3.5 mtx-w-3.5 mtx-items-center mtx-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="mtx-h-4 mtx-w-4 mtx-fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("mtx-px-2 mtx-py-1.5 mtx-text-sm mtx-font-semibold mtx-text-foreground", inset && "mtx-pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mtx-1 mtx-my-1 mtx-h-px mtx-bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("mtx-ml-auto mtx-text-xs mtx-tracking-widest mtx-text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
