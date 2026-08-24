"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Message({
  message,
  type = "info",
  variant = "outline",
  className = "",
}: {
  message: string;
  type?: "info" | "success" | "error" | "warning";
  variant?: "soft" | "outline";
  className?: string;
}) {
  const typeStyle = {
    info: "bg-primary-subtle text-primary border-primary",
    success: "bg-success-subtle text-success border-success",
    error: "bg-danger-subtle text-danger border-danger",
    warning: "bg-warning-subtle text-warning border-warning",
  };

  const variantStyle = {
    soft: "",
    outline: "!bg-transparent border",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          layout
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <motion.div
            layout
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors duration-200 ${typeStyle[type]} ${variantStyle[variant]} ${className}`}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
