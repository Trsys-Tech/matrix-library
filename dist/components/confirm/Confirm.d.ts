import { default as React } from 'react';
import { Modal } from '../modal/Modal';
import { Button } from '../button/Button';
type ConfirmOptions = {
    title: string;
    description: string;
    confirmationText?: string;
    cancelationText?: string;
    modalProps?: React.ComponentProps<typeof Modal>;
    hideCancelButton?: boolean;
    buttonOrder?: ("confirm" | "cancel")[];
    confirmButtonProps?: React.ComponentProps<typeof Button>;
    cancelButtonProps?: React.ComponentProps<typeof Button>;
    descriptionProps?: React.ComponentProps<"p">;
};
/**
 * ConfirmProvider
 */
type ConfirmProviderProps = {
    children: React.ReactNode;
};
declare const ConfirmProvider: React.FC<ConfirmProviderProps>;
declare const useConfirm: () => (options: ConfirmOptions) => Promise<unknown>;
export { ConfirmProvider, useConfirm };
//# sourceMappingURL=Confirm.d.ts.map