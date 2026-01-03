import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare const ModalHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ModalFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
type ModalFooterProps = React.ComponentProps<typeof ModalFooter>;
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
declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;
export { Modal, ModalFooter, type ModalProps, type ModalFooterProps };
//# sourceMappingURL=Modal.d.ts.map