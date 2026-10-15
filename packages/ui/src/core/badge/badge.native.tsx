import { styleVariant, borderVariant } from "./styles";
import type { BadgeProps } from "./types";
import { Text } from "react-native";

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <Text
      className={`border rounded-full px-2 ${styleVariant[variant]} ${borderVariant[variant]} ${className ?? ""}`}
    >
      {label}
    </Text>
  );
}
