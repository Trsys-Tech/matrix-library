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
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80", className)} {...props} />
));
SwipableDrawerOverlay.displayName = "SwipableDrawerOverlay";

const SwipableDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SwipableDrawerPortal>
    <SwipableDrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "mtx-fixed mtx-inset-x-0 mtx-bottom-0 mtx-z-50 mtx-mt-24 mtx-flex mtx-h-auto mtx-flex-col mtx-rounded-t-[10px] mtx-border mtx-bg-background",
        className,
      )}
      {...props}
    >
      <div className="mtx-mx-auto mtx-my-2 mtx-h-1.5 mtx-w-[100px] mtx-rounded-full mtx-bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </SwipableDrawerPortal>
));
SwipableDrawerContent.displayName = "SwipableDrawerContent";
type SwipableDrawerContentProps = React.ComponentProps<typeof SwipableDrawerContent>;

const SwipableDrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-grid mtx-gap-1.5 mtx-p-4 mtx-text-center sm:mtx-text-left", className)} {...props} />
);
SwipableDrawerHeader.displayName = "SwipableDrawerHeader";
type SwipableDrawerHeaderProps = React.ComponentProps<typeof SwipableDrawerHeader>;

const SwipableDrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-mt-auto mtx-flex mtx-flex-col mtx-gap-2 mtx-p-4", className)} {...props} />
);
SwipableDrawerFooter.displayName = "SwipableDrawerFooter";
type SwipableDrawerFooterProps = React.ComponentProps<typeof SwipableDrawerFooter>;

const SwipableDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cn("mtx-text-lg mtx-font-semibold mtx-leading-none mtx-tracking-tight", className)} {...props} />
));
SwipableDrawerTitle.displayName = "SwipableDrawerTitle";
type SwipableDrawerTitleProps = React.ComponentProps<typeof SwipableDrawerTitle>;

const SwipableDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("mtx-text-sm mtx-text-muted-foreground", className)} {...props} />
));
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
