import { useEffect, useState } from "react";
import { ToastProps } from "./types";
import { Button } from "../button";
import { FaRegCircleCheck, FaTriangleExclamation } from "react-icons/fa6";
import { MdClose, MdOutlineInfo } from "react-icons/md";

const variantStyles = {
  success: "border-success",
  error: "border-danger",
  info: "border-info",
  warning: "border-warning",
};

const iconStyles = {
  success: "text-success",
  error: "text-danger",
  info: "text-info",
  warning: "text-warning",
};

export function Toast({
  toast,
  onClose,
}: {
  toast: ToastProps;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className={`
        w-full flex gap-2 items-center transform bg-surface
        transition-all duration-300 ease-in-out
        ${
          toast.closing || !visible
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }
        rounded-xl p-3 shadow-lg border
        ${variantStyles[toast.variant]}
      `}
    >
      <div className={`${iconStyles[toast.variant]} text-xl`}>
        {toast.variant === "success" ? (
          <FaRegCircleCheck aria-hidden="true" />
        ) : toast.variant === "error" ? (
          <MdClose
            className="border border-danger rounded-full"
            aria-hidden="true"
          />
        ) : toast.variant === "info" ? (
          <MdOutlineInfo aria-hidden="true" />
        ) : toast.variant === "warning" ? (
          <FaTriangleExclamation aria-hidden="true" />
        ) : null}
      </div>
      {/* Removed as icons are now inside the div above */}

      <div className="flex-1 space-y-px">
        {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
        {toast.description && (
          <p className="text-[13px]">{toast.description}</p>
        )}
      </div>
      {toast.action && toast.actionLabel && (
        <Button
          variant="outline"
          label={toast.actionLabel}
          onClick={toast.action}
        />
      )}
      <MdClose className="size-5 cursor-pointer" onClick={onClose} />
    </div>
  );
}
