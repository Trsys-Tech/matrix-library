import { VariantProps, TVReturnType } from 'tailwind-variants';
import { TVConfig } from 'tailwind-variants/dist/config';
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
}, undefined, "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full", TVConfig<{
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
}, undefined, "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full", TVConfig<{
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
}, undefined, "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full", TVConfig<{
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
}, undefined, "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full", TVConfig<{
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