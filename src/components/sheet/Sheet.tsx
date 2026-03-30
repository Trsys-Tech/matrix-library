"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import type {
  DialogProps as SheetProps,
  DialogTriggerProps as SheetTriggerProps,
  DialogCloseProps as SheetCloseProps,
  DialogPortalProps as SheetPortalProps,
  DialogOverlayProps as SheetOverlayProps,
  DialogDescriptionProps as SheetDescriptionProps,
  DialogTitleProps as SheetTitleProps,
} from "@radix-ui/react-dialog";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";
import { XMark } from "@trsys-tech/matrix-icons";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
      className={cn(
        "mtx-fixed mtx-inset-0 mtx-z-50 mtx-bg-black/80  data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0",
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = tv({
  base: "mtx-fixed mtx-z-50 mtx-gap-4 mtx-bg-background mtx-p-6 mtx-shadow-lg mtx-transition mtx-ease-in-out data-[state=closed]:mtx-duration-300 data-[state=open]:mtx-duration-500 data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out",
  variants: {
    side: {
      top: "mtx-inset-x-0 mtx-top-0 mtx-border-b data-[state=closed]:mtx-slide-out-to-top data-[state=open]:mtx-slide-in-from-top",
      bottom: "mtx-inset-x-0 mtx-bottom-0 mtx-border-t data-[state=closed]:mtx-slide-out-to-bottom data-[state=open]:mtx-slide-in-from-bottom",
      left: "mtx-inset-y-0 mtx-left-0 mtx-h-full mtx-w-3/4 mtx-border-r data-[state=closed]:mtx-slide-out-to-left data-[state=open]:mtx-slide-in-from-left sm:mtx-max-w-sm",
      right:
        "mtx-inset-y-0 mtx-right-0 mtx-h-full mtx-w-3/4 mtx-border-l data-[state=closed]:mtx-slide-out-to-right data-[state=open]:mtx-slide-in-from-right sm:mtx-max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        <SheetPrimitive.Close className="mtx-absolute mtx-right-4 mtx-top-4 mtx-rounded-sm mtx-opacity-70 mtx-ring-offset-background mtx-transition-opacity hover:mtx-opacity-100 focus:mtx-outline-none focus:mtx-ring-2 focus:mtx-ring-ring focus:mtx-ring-offset-2 disabled:mtx-pointer-events-none data-[state=open]:mtx-bg-secondary">
          <XMark className="mtx-h-4 mtx-w-4" />
          <span className="mtx-sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-flex mtx-flex-col mtx-space-y-2 mtx-text-center sm:mtx-text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";
type SheetHeaderProps = React.ComponentProps<typeof SheetHeader>;

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-flex mtx-flex-col-reverse sm:mtx-flex-row sm:mtx-justify-end sm:mtx-space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";
type SheetFooterProps = React.ComponentProps<typeof SheetFooter>;

const SheetTitle = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Title>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Title ref={ref} className={cn("mtx-text-lg mtx-font-semibold mtx-text-foreground", className)} {...props} />
  ),
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("mtx-text-sm mtx-text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetProps,
  type SheetPortalProps,
  type SheetOverlayProps,
  type SheetTriggerProps,
  type SheetCloseProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
};
