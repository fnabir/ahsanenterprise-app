"use client";

import { useEffect, useState } from "react";
import { toastStore } from "./store";
import { ToastProps } from "./types";
import { Toast } from "./toast";

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => toastStore.subscribe(setToasts), []);

  return (
    <div className="fixed top-4 left-1/2 z-99 space-y-2 -translate-x-1/2 w-full max-w-[calc(100%-2rem)] sm:max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => toastStore.close(toast.id)}
        />
      ))}
    </div>
  );
}
