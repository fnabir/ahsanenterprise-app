"use client";

import type { ButtonProps } from "./types";
import { AnimatePresence, motion } from "framer-motion";

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
}: ButtonProps & { Icon?: React.ReactNode }) {
  const variantStyle = {
    default: "bg-foreground text-background hover:bg-foreground/85",
    primary: "bg-primary text-background hover:bg-primary/85",
    danger: "bg-danger text-white hover:bg-danger/85",
    outline: "border text-foreground hover:bg-card hover:border-muted",
    transparent: "bg-transparent text-primary hover:bg-background/10",
    custom: "",
  };

  const style = `flex items-center justify-center gap-1 group
                px-2 py-1 text-sm font-medium rounded-lg
                transition-colors ease-in-out duration-200
                ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${variantStyle[variant]} ${className}`;

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
            className="size-5 animate-spin rounded-full border-2 border-t-transparent border-white"
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
