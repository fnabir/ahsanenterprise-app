"use client";

import { cn } from "../../../../core/utils";
import type { ButtonProps } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import {
  bgStyle,
  hoverStyle,
  borderStyle,
  loadingStyle,
  textStyle,
} from "./styles";

export function Button({
  label,
  variant = "default",
  type = "button",
  loading = false,
  disabled = false,
  onClick,
  ariaLabel,
  className = "",
  Icon,
}: ButtonProps) {
  const style = cn(
    "flex items-center justify-center gap-1 group",
    "px-2 py-1 text-sm font-medium rounded-lg",
    "transition-colors ease-in-out duration-200",
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    bgStyle[variant],
    hoverStyle[variant],
    borderStyle[variant],
    textStyle[variant],
    className,
  );

  return (
    <motion.button
      layout
      transition={{ duration: 0.3 }}
      type={type}
      aria-label={ariaLabel ?? label}
      disabled={disabled || loading}
      className={style}
      onClick={onClick}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {loading ? (
          <motion.div
            key="loading"
            className={`size-4 animate-spin rounded-full border-2 border-t-transparent ${loadingStyle[variant]}`}
          />
        ) : Icon ? (
          <motion.div key="icon">{Icon}</motion.div>
        ) : null}
      </AnimatePresence>
      {label && (
        <div className="grid">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="col-start-1 row-start-1"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </motion.button>
  );
}
