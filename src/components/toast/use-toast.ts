import React from "react";
import { v4 as uuidv4 } from "uuid";

import { ToastVariant } from "./toast-components";

const toastParams = {
  limit: 3,
};

type ToastInfo = {
  message: string;
  variant: ToastVariant;
};

const toasts = new Map<string, ToastInfo>();
const listener: { setState: React.Dispatch<React.SetStateAction<Map<string, ToastInfo>>> } = { setState: () => {} };

const addToast = (toast: ToastInfo) => {
  if (toasts.size >= toastParams.limit) {
    toasts.delete(toasts.keys().next().value!);
  }

  toasts.set(uuidv4(), toast);

  listener.setState(new Map(toasts));

  return toasts;
};

const removeToast = (id: string) => {
  toasts.delete(id);
  listener.setState(new Map(toasts));
};

type ToastFunction = {
  (message: string): void;
  success: (message: string) => void;
  danger: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
};

const toast: ToastFunction = (message: string) => addToast({ message, variant: "default" });
toast.success = (message: string) => addToast({ message, variant: "success" });
toast.danger = (message: string) => addToast({ message, variant: "danger" });
toast.warning = (message: string) => addToast({ message, variant: "warning" });
toast.info = (message: string) => addToast({ message, variant: "info" });

const useToasts = () => {
  const [state, setState] = React.useState(toasts);

  React.useEffect(() => {
    listener.setState = setState;
    return () => {
      listener.setState = () => {};
    };
  }, [state]);

  return { toast, toasts: state, addToast, removeToast };
};

export { toast, useToasts, toastParams };
