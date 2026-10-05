"use client";

import type { MessageProps } from "./types";
import { Text } from "react-native";
import { cn } from "../../../../core/utils";

export function Message({
  message,
  type = "info",
  variant = "outline",
  className = "",
}: MessageProps) {
  if (!message) return null;

  const bgStyle = {
    info: "bg-primary-subtle",
    success: "bg-success-subtle",
    error: "bg-danger-subtle",
    warning: "bg-warning-subtle",
  };

  const borderStyle = {
    info: "border border-primary",
    success: "border border-success",
    error: "border border-danger",
    warning: "border border-warning",
  };

  const textStyle = {
    info: "text-primary",
    success: "text-success",
    error: "text-danger",
    warning: "text-warning",
  };

  return (
    <Text
      className={cn(
        "px-4 py-2 text-center rounded-lg font-sans-semibold",
        variant === "soft" ? "" : bgStyle[type],
        variant === "soft" ? "" : borderStyle[type],
        textStyle[type],
      )}
    >
      {message}
    </Text>
  );
}
