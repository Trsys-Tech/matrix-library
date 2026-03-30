"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../lib/utils";
import { XMark } from "@trsys-tech/matrix-icons";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "mtx-fixed mtx-z-[100] mtx-flex mtx-flex-col-reverse mtx-gap-3 mtx-max-h-dscreen mtx-w-full mtx-p-4 mtx-top-0 mtx-right-0 md:mtx-max-w-[420px] ",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = tv({
  base: "mtx-group mtx-pointer-events-auto mtx-relative mtx-flex mtx-w-full mtx-items-center mtx-justify-between mtx-space-x-2 mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-p-4 mtx-shadow-lg mtx-transition-all data-[swipe=cancel]:mtx-translate-x-0 data-[swipe=end]:mtx-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mtx-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mtx-transition-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[swipe=end]:mtx-animate-out data-[state=closed]:mtx-fade-out-80 data-[state=closed]:mtx-slide-out-to-right-full data-[state=open]:mtx-slide-in-from-top-full", // data-[state=open]:sm:slide-in-from-bottom-full
  variants: {
    variant: {
      default: "mtx-border mtx-bg-background mtx-text-foreground",
      danger: "mtx-danger mtx-group mtx-border-danger mtx-bg-danger-400 mtx-text-danger-800",
      success: "mtx-success mtx-group mtx-border-success mtx-bg-success-400 mtx-text-success-800",
      warning: "mtx-warning mtx-group mtx-border-warning mtx-bg-warning-400 mtx-text-warning-800",
      info: "mtx-info mtx-group mtx-border-info mtx-bg-info-400 mtx-text-info-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ToastVariant = VariantProps<typeof toastVariants>["variant"];

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Action>, React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>>(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        "mtx-inline-flex mtx-h-8 mtx-shrink-0 mtx-items-center mtx-justify-center mtx-rounded-md mtx-border mtx-bg-transparent mtx-px-3 mtx-text-sm mtx-font-medium mtx-transition-colors hover:mtx-bg-secondary focus:mtx-outline-none focus:mtx-ring-1 focus:mtx-ring-ring disabled:mtx-pointer-events-none disabled:mtx-opacity-50 group-[.danger]:mtx-border-muted/40 group-[.danger]:hover:mtx-border-danger/30 group-[.danger]:hover:mtx-bg-danger group-[.danger]:hover:mtx-text-danger-foreground group-[.danger]:focus:mtx-ring-danger",
        className,
      )}
      {...props}
    />
  ),
);
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Close>, React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>>(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Close ref={ref} className={cn("focus:mtx-outline-none focus:mtx-ring-none", className)} toast-close="" {...props}>
      <XMark className="mtx-h-5 mtx-w-5" />
    </ToastPrimitives.Close>
  ),
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Title>, React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>>(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Title ref={ref} className={cn("mtx-text-xs mtx-font-semibold mtx-leading-5 [&+div]:mtx-text-xs", className)} {...props} />
  ),
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => <ToastPrimitives.Description ref={ref} className={cn("mtx-text-sm mtx-opacity-90", className)} {...props} />);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  type ToastVariant,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
