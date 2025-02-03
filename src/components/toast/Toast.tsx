"use client";

import { useEffect } from "react";
import { Toast as Root, ToastClose, ToastProvider, ToastTitle, ToastViewport } from "./toast-components";

import { useToasts, toastParams } from "./use-toast";
import { InfoCircleIcon } from "../Icons/InfoCircleIcon";
import { SuccessCircleIcon } from "../Icons/SuccessCircleIcon";
import { WarningCircleIcon } from "../Icons/WarningCircleIcon";
import { DangerCircleIcon } from "../Icons/DangerCircleIcon";
import { ToastProviderProps, ToastViewportProps } from "@radix-ui/react-toast";

type ToastProps = {
  limit?: number;
  duration?: number;
  slotProps?: {
    providerProps?: ToastProviderProps;
    viewportProps?: ToastViewportProps;
    itemProps?: React.ComponentProps<typeof Root>;
    closeProps?: React.ComponentProps<typeof ToastClose>;
    titleProps?: React.ComponentProps<typeof ToastTitle>;
  };
};

function Toast({ limit = 3, duration = 5000, slotProps }: ToastProps) {
  const { toasts, removeToast } = useToasts();

  useEffect(() => {
    if (limit !== undefined) {
      toastParams.limit = limit;
    }
  }, [limit]);

  return (
    <ToastProvider duration={duration} {...(slotProps?.providerProps ?? {})}>
      {Array.from(toasts).map(([key, { message, variant }]) => {
        return (
          <Root
            key={key}
            variant={variant}
            onOpenChange={open => {
              if (!open) {
                setTimeout(() => removeToast(key), 100); // let the animation finish then remove the toast
              }
            }}
            {...(slotProps?.itemProps ?? {})}
          >
            <div className="flex gap-2 items-center">
              <div>
                {variant === "danger" && <DangerCircleIcon className="w-5 h-5" />}
                {variant === "success" && <SuccessCircleIcon className="w-5 h-5" />}
                {variant === "info" && <InfoCircleIcon className="w-5 h-5" />}
                {variant === "warning" && <WarningCircleIcon className="w-5 h-5" />}
              </div>
              {message && <ToastTitle {...(slotProps?.titleProps ?? {})}>{message}</ToastTitle>}
            </div>
            <ToastClose {...(slotProps?.closeProps ?? {})} />
            {/* {action} */}
          </Root>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
Toast.displayName = "Toast";

export { Toast, type ToastProps };
