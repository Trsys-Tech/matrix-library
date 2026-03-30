"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type {
  DialogContentProps,
  DialogTriggerProps,
  DialogProps,
  DialogCloseProps,
  DialogTitleProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogDescriptionProps,
} from "@radix-ui/react-dialog";
import { XMark } from "@trsys-tech/matrix-icons";

import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80  data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "mtx-fixed mtx-left-[50%] mtx-top-[50%] mtx-z-50 mtx-grid mtx-w-full mtx-max-w-lg mtx-translate-x-[-50%] mtx-translate-y-[-50%] mtx-gap-4 mtx-border mtx-bg-background mtx-p-6 mtx-shadow-lg mtx-duration-200 data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[state=closed]:mtx-slide-out-to-left-1/2 data-[state=closed]:mtx-slide-out-to-top-[48%] data-[state=open]:mtx-slide-in-from-left-1/2 data-[state=open]:mtx-slide-in-from-top-[48%] sm:mtx-rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="mtx-absolute mtx-right-4 mtx-top-4 mtx-rounded-sm disabled:mtx-pointer-events-none data-[state=open]:mtx-bg-accent data-[state=open]:mtx-text-muted-foreground">
        <XMark className="mtx-h-5 mtx-w-5" />
        <span className="mtx-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-flex mtx-flex-col mtx-space-y-1.5 mtx-text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-flex mtx-flex-col-reverse sm:mtx-flex-row sm:mtx-justify-end sm:mtx-space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={cn("mtx-text-lg mtx-font-semibold mtx-leading-none mtx-tracking-tight", className)} {...props} />
  ),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("mtx-text-sm mtx-text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
export type {
  DialogContentProps,
  DialogTriggerProps,
  DialogProps,
  DialogCloseProps,
  DialogTitleProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogDescriptionProps,
};
