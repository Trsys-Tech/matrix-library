import { ToastVariant } from './toast-components';
declare const toastParams: {
    limit: number;
};
type ToastInfo = {
    message: string;
    variant: ToastVariant;
};
type ToastFunction = {
    (message: string): void;
    success: (message: string) => void;
    danger: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
};
declare const toast: ToastFunction;
declare const useToasts: () => {
    toast: ToastFunction;
    toasts: Map<string, ToastInfo>;
    addToast: (toast: ToastInfo) => Map<string, ToastInfo>;
    removeToast: (id: string) => void;
};
export { toast, useToasts, toastParams };
//# sourceMappingURL=use-toast.d.ts.map