import { Toast as Root, ToastClose, ToastTitle } from './toast-components';
import { ToastProviderProps, ToastViewportProps } from '@radix-ui/react-toast';
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
declare function Toast({ limit, duration, slotProps }: ToastProps): import("react/jsx-runtime").JSX.Element;
declare namespace Toast {
    var displayName: string;
}
export { Toast, type ToastProps };
//# sourceMappingURL=Toast.d.ts.map