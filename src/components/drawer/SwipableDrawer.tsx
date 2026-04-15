"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../lib/utils";

const SwipableDrawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
SwipableDrawer.displayName = "SwipableDrawer";
type SwipableDrawerProps = React.ComponentProps<typeof SwipableDrawer>;

const SwipableDrawerTrigger = DrawerPrimitive.Trigger;
SwipableDrawerTrigger.displayName = "SwipableDrawerTrigger";
type SwipableDrawerTriggerProps = React.ComponentProps<typeof SwipableDrawerTrigger>;

const SwipableDrawerPortal = DrawerPrimitive.Portal;

const SwipableDrawerClose = DrawerPrimitive.Close;
SwipableDrawerClose.displayName = "SwipableDrawerClose";
type SwipableDrawerCloseProps = React.ComponentProps<typeof SwipableDrawerClose>;

const SwipableDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />);
SwipableDrawerOverlay.displayName = "SwipableDrawerOverlay";

const SwipableDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SwipableDrawerPortal>
    <SwipableDrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-gray-200 bg-background", className)}
      {...props}
    >
      <div className="mx-auto my-2 h-1.5 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </SwipableDrawerPortal>
));
SwipableDrawerContent.displayName = "SwipableDrawerContent";
type SwipableDrawerContentProps = React.ComponentProps<typeof SwipableDrawerContent>;

const SwipableDrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
SwipableDrawerHeader.displayName = "SwipableDrawerHeader";
type SwipableDrawerHeaderProps = React.ComponentProps<typeof SwipableDrawerHeader>;

const SwipableDrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
SwipableDrawerFooter.displayName = "SwipableDrawerFooter";
type SwipableDrawerFooterProps = React.ComponentProps<typeof SwipableDrawerFooter>;

const SwipableDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
SwipableDrawerTitle.displayName = "SwipableDrawerTitle";
type SwipableDrawerTitleProps = React.ComponentProps<typeof SwipableDrawerTitle>;

const SwipableDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />);
SwipableDrawerDescription.displayName = "SwipableDrawerDescription";
type SwipableDrawerDescriptionProps = React.ComponentProps<typeof SwipableDrawerDescription>;

export {
  SwipableDrawer,
  SwipableDrawerTrigger,
  SwipableDrawerClose,
  SwipableDrawerContent,
  SwipableDrawerHeader,
  SwipableDrawerFooter,
  SwipableDrawerTitle,
  SwipableDrawerDescription,
  type SwipableDrawerProps,
  type SwipableDrawerTriggerProps,
  type SwipableDrawerCloseProps,
  type SwipableDrawerContentProps,
  type SwipableDrawerHeaderProps,
  type SwipableDrawerFooterProps,
  type SwipableDrawerTitleProps,
  type SwipableDrawerDescriptionProps,
};
