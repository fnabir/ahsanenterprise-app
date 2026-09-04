import { toastStore } from "./store";
import { ToastProps, ToastVariant } from "./types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createToast(variant: ToastVariant) {
  return (
    title: string,
    description?: string,
    actionLabel?: string,
    action?: () => void,
  ) => {
    return toastStore.show({
      id: generateId(),
      title,
      description,
      actionLabel,
      action,
      variant,
    });
  };
}

type AddToastOptions = Omit<ToastProps, "id" | "variant"> & {
  variant?: ToastVariant;
  type?: ToastVariant;
};

function add(options: AddToastOptions) {
  const { variant, type, ...rest } = options;

  return toastStore.show({
    id: generateId(),
    variant: variant ?? type ?? "info",
    ...rest,
  });
}

function dismiss(id?: string) {
  toastStore.dismiss(id);
}

function close(id?: string) {
  toastStore.close(id);
}

export const toast = {
  success: createToast("success"),
  error: createToast("error"),
  info: createToast("info"),
  warning: createToast("warning"),
  add,
  close,
  dismiss,
};
