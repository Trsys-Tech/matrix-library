import React, { useCallback, useEffect } from "react";
import { Modal, ModalFooter } from "../modal/Modal";
import { Button } from "../button/Button";
import { cn } from "../../lib/utils";

let confirmId = 0;

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
type ConfirmState = { resolve: (value: unknown) => void; reject: (reason?: any) => void; parentId: ParentId } | null;
type ParentId = string;

type ConfirmContext = {
  confirmBase: (parentId: ParentId, options: ConfirmOptions) => Promise<unknown>;
  closeOnParentUnmount: (parentId: ParentId) => void;
} | null;
const ConfirmContext = React.createContext<ConfirmContext>(null);

/**
 * ConfirmProvider
 */
type ConfirmProviderProps = {
  children: React.ReactNode;
};
const ConfirmProvider: React.FC<ConfirmProviderProps> = ({ children }) => {
  const [state, setState] = React.useState<ConfirmState>(null);
  const [options, setOptions] = React.useState<ConfirmOptions>({
    buttonOrder: ["cancel", "confirm"],
    description: "",
    title: "Are you sure?",
  });
  const [key, setKey] = React.useState(0);

  const confirmBase = useCallback((parentId: ParentId, options: ConfirmOptions) => {
    return new Promise((resolve, reject) => {
      setKey(key => key + 1);
      setOptions(options);
      setState({ resolve, reject, parentId });
    });
  }, []);

  const closeOnParentUnmount = useCallback((parentId: ParentId) => {
    setState(state => {
      if (state?.parentId === parentId) {
        return null;
      } else {
        return state;
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setState(state => {
      state?.reject();
      return null;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setState(state => {
      state?.resolve(null);
      return null;
    });
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirmBase, closeOnParentUnmount }}>
      {children}
      <ConfirmModal key={key} open={state !== null} options={options} onCancel={handleClose} onConfirm={handleConfirm} />
    </ConfirmContext.Provider>
  );
};

const useConfirmId = () => {
  const id = React.useMemo(() => {
    return confirmId++;
  }, []);

  return `confirm-${id}`;
};

const useConfirm = () => {
  const parentId = useConfirmId();
  const context = React.useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  const { confirmBase, closeOnParentUnmount } = context;

  const confirm = useCallback(
    (options: ConfirmOptions) => {
      return confirmBase(parentId, options);
    },
    [parentId, confirmBase],
  );

  useEffect(() => {
    return () => {
      closeOnParentUnmount(parentId);
    };
  }, [parentId, closeOnParentUnmount]);

  return confirm;
};

type ConfirmModalProps = {
  open: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
  options: ConfirmOptions;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, open, options, onCancel }) => {
  const {
    buttonOrder = ["cancel", "confirm"],
    description,
    title,
    cancelationText,
    confirmationText,
    hideCancelButton,
    modalProps,
    cancelButtonProps,
    confirmButtonProps,
    descriptionProps,
  } = options;

  const actions = React.useMemo(
    () =>
      buttonOrder.map(action => {
        const { className: confirmClassName, ...restConfirmButtonProps } = confirmButtonProps ?? {};
        const { className: cancelClassName, ...restCancelButtonProps } = cancelButtonProps ?? {};
        if (action === "confirm") {
          return (
            <Button key="confirm-button" onClick={onConfirm} variant="primary" className={cn("w-28", confirmClassName)} {...restConfirmButtonProps}>
              {confirmationText || "Confirm"}
            </Button>
          );
        }
        if (action === "cancel" && !hideCancelButton) {
          return (
            <Button key="cancel-button" onClick={onCancel} variant="text" className={cn("w-28", cancelClassName)} {...restCancelButtonProps}>
              {cancelationText || "Cancel"}
            </Button>
          );
        }
      }),
    [hideCancelButton, buttonOrder, confirmationText, cancelationText, confirmButtonProps, cancelButtonProps, onConfirm, onCancel],
  );

  return (
    <Modal open={open} title={title} {...modalProps}>
      <p {...descriptionProps}>{description}</p>
      <ModalFooter>{actions}</ModalFooter>
    </Modal>
  );
};

export { ConfirmProvider, useConfirm };
