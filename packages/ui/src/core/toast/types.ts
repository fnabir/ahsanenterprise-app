export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  action?: () => void;
  variant: ToastVariant;
  duration?: number;
  closing?: boolean;
}
