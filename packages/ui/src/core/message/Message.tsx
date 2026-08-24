"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Message({
  message,
  type = "info",
  variant = "outline",
}: {
  message: string;
  type?: "info" | "success" | "error" | "warning";
  variant?: "soft" | "outline";
}) {
  const typeStyle = {
    info: "bg-blue-900/50 text-blue-600 dark:text-blue-400 border-blue-500",
    success:
      "bg-green-900/50 text-green-600 dark:text-green-400 border-green-500",
    error: "bg-red-900/50 text-red-600 dark:text-red-400 border-red-500",
    warning:
      "bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 border-yellow-500",
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
            className={`px-3 py-1.5 rounded-lg border transition-colors duration-200 ${typeStyle[type]} ${variantStyle[variant]}`}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
