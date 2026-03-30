"use client";

import * as React from "react";
import { XMark } from "@trsys-tech/matrix-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
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
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-flex mtx-flex-row mtx-justify-between", className)} {...props} />
);
ModalHeader.displayName = "DialogHeader";

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mtx-flex mtx-flex-row mtx-justify-end mtx-gap-2", className)} {...props} />
);
ModalFooter.displayName = "DialogFooter";
type ModalFooterProps = React.ComponentProps<typeof ModalFooter>;

const ModalTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={cn("mtx-text-lg mtx-font-semibold mtx-leading-none mtx-tracking-tight", className)} {...props} />
  ),
);
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("mtx-text-sm mtx-text-muted-foreground", className)} {...props} />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

interface ModalProps extends DialogPrimitive.DialogProps, Omit<DialogPrimitive.DialogContentProps, "title"> {
  title: React.ReactNode;
  fullScreen?: boolean;
  slotProps?: {
    title?: DialogPrimitive.DialogTitleProps;
    close?: DialogPrimitive.DialogCloseProps;
    header?: React.ComponentProps<typeof ModalHeader>;
    portal?: DialogPrimitive.DialogPortalProps;
    divider?: React.ComponentProps<"hr">;
  };
}

const Modal = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ModalProps>((props, ref) => {
  const { title, className, children, fullScreen, open, onOpenChange, defaultOpen, modal, slotProps, ...restProps } = props;

  return (
    <DialogPrimitive.Root defaultOpen={defaultOpen} modal={modal} open={open} onOpenChange={onOpenChange}>
      <ModalPortal {...(slotProps?.portal ?? {})}>
        <ModalOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "mtx-fixed mtx-left-1/2 mtx-top-1/2 -mtx-translate-x-1/2 -mtx-translate-y-1/2 mtx-z-50 mtx-flex mtx-flex-col mtx-gap-2 mtx-w-full mtx-max-w-lg mtx-p-4 mtx-border mtx-bg-background mtx-shadow-lg mtx-duration-200 data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[state=closed]:mtx-fade-out-0 data-[state=open]:mtx-fade-in-0 data-[state=closed]:mtx-zoom-out-95 data-[state=open]:mtx-zoom-in-95 data-[state=closed]:mtx-slide-out-to-left-1/2 data-[state=closed]:mtx-slide-out-to-top-[48%] data-[state=open]:mtx-slide-in-from-left-1/2 data-[state=open]:mtx-slide-in-from-top-[48%] sm:mtx-rounded-lg",
            fullScreen ? "mtx-w-screen mtx-h-screen" : "mtx-max-w-lg",
            className,
          )}
          {...restProps}
          aria-describedby={undefined}
        >
          <ModalHeader {...(slotProps?.header ?? {})}>
            <ModalTitle {...(slotProps?.title ?? {})}>{title}</ModalTitle>
            <ModalClose
              {...(slotProps?.close ?? {})}
              className={cn(
                "mtx-rounded-sm hover:mtx-bg-primary-50 hover:mtx-ring-2 hover:mtx-ring-primary-50 disabled:mtx-pointer-events-none data-[state=open]:mtx-bg-accent data-[state=open]:mtx-text-muted-foreground mtx-mt-0",
                slotProps?.close?.className,
              )}
            >
              <XMark className="mtx-h-5 mtx-w-5" />
              <span className="mtx-sr-only">Close</span>
            </ModalClose>
          </ModalHeader>
          {/* Divider: the padding and margin is because of a bug in chrome causes the border to be shown with more height than expected */}
          <hr
            {...(slotProps?.divider ?? {})}
            className={cn(
              "mtx-w-full mtx-border-muted -mtx-mt-[1px] mtx-pb-2",
              fullScreen && "mtx-w-screen -mtx-mx-4",
              slotProps?.divider?.className,
            )}
          />
          {children}
        </DialogPrimitive.Content>
      </ModalPortal>
    </DialogPrimitive.Root>
  );
});

export { Modal, ModalFooter, type ModalProps, type ModalFooterProps };
