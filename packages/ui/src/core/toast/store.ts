import { ToastProps } from "./types";

type Listener = (toasts: ToastProps[]) => void;

let toasts: ToastProps[] = [];
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l(toasts));
}

const ANIMATION_MS = 300;

export const toastStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    listener(toasts);
    return () => {
      listeners.delete(listener);
    };
  },

  show(toast: ToastProps) {
    toasts = [...toasts, { ...toast, closing: false }];
    notify();

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        toastStore.close(toast.id);
      }, toast.duration ?? 4000);
    }

    return toast.id;
  },

  close(id?: string) {
    if (!id) {
      toasts = toasts.map((t) => ({ ...t, closing: true }));
      notify();

      setTimeout(() => {
        toastStore.dismiss();
      }, ANIMATION_MS);
      return;
    }

    toasts = toasts.map((t) => (t.id === id ? { ...t, closing: true } : t));
    notify();

    setTimeout(() => {
      toastStore.dismiss(id);
    }, ANIMATION_MS);
  },

  dismiss(id?: string) {
    if (!id) {
      toasts = [];
      notify();
      return;
    }

    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};
