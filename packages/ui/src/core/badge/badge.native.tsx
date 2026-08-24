import type { BadgeProps } from "./types";
import { Text } from "react-native";

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <Text className={`badge badge-${variant} ${className ?? ""}`}>{label}</Text>
  );
}
