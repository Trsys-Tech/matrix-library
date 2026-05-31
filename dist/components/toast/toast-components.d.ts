import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config.js';
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const toastVariants: TVReturnType<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, undefined, "mtx-group mtx-pointer-events-auto mtx-relative mtx-flex mtx-w-full mtx-items-center mtx-justify-between mtx-space-x-2 mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-p-4 mtx-shadow-lg mtx-transition-all data-[swipe=cancel]:mtx-translate-x-0 data-[swipe=end]:mtx-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mtx-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mtx-transition-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[swipe=end]:mtx-animate-out data-[state=closed]:mtx-fade-out-80 data-[state=closed]:mtx-slide-out-to-right-full data-[state=open]:mtx-slide-in-from-top-full", TVConfig<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, {
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}>, {
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, undefined, TVReturnType<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, undefined, "mtx-group mtx-pointer-events-auto mtx-relative mtx-flex mtx-w-full mtx-items-center mtx-justify-between mtx-space-x-2 mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-p-4 mtx-shadow-lg mtx-transition-all data-[swipe=cancel]:mtx-translate-x-0 data-[swipe=end]:mtx-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mtx-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mtx-transition-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[swipe=end]:mtx-animate-out data-[state=closed]:mtx-fade-out-80 data-[state=closed]:mtx-slide-out-to-right-full data-[state=open]:mtx-slide-in-from-top-full", TVConfig<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, {
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}>, unknown, unknown, undefined>>;
type ToastVariant = VariantProps<typeof toastVariants>["variant"];
declare const Toast: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & VariantProps< TVReturnType<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, undefined, "mtx-group mtx-pointer-events-auto mtx-relative mtx-flex mtx-w-full mtx-items-center mtx-justify-between mtx-space-x-2 mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-p-4 mtx-shadow-lg mtx-transition-all data-[swipe=cancel]:mtx-translate-x-0 data-[swipe=end]:mtx-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mtx-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mtx-transition-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[swipe=end]:mtx-animate-out data-[state=closed]:mtx-fade-out-80 data-[state=closed]:mtx-slide-out-to-right-full data-[state=open]:mtx-slide-in-from-top-full", TVConfig<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, {
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}>, {
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, undefined, TVReturnType<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, undefined, "mtx-group mtx-pointer-events-auto mtx-relative mtx-flex mtx-w-full mtx-items-center mtx-justify-between mtx-space-x-2 mtx-overflow-hidden mtx-rounded-lg mtx-border mtx-p-4 mtx-shadow-lg mtx-transition-all data-[swipe=cancel]:mtx-translate-x-0 data-[swipe=end]:mtx-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mtx-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mtx-transition-none data-[state=open]:mtx-animate-in data-[state=closed]:mtx-animate-out data-[swipe=end]:mtx-animate-out data-[state=closed]:mtx-fade-out-80 data-[state=closed]:mtx-slide-out-to-right-full data-[state=open]:mtx-slide-in-from-top-full", TVConfig<{
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}, {
    variant: {
        default: string;
        danger: string;
        success: string;
        warning: string;
        info: string;
    };
}>, unknown, unknown, undefined>>> & React.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;
export { type ToastProps, type ToastActionElement, type ToastVariant, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction, };
//# sourceMappingURL=toast-components.d.ts.map