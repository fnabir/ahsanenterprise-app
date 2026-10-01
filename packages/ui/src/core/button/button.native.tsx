import {
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import type { ButtonProps } from "./types";
import { cn } from "../../../../core/utils";
import { bgStyle, textStyle } from "./styles";

export function Button({
  label,
  variant = "default",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  Icon,
}: ButtonProps) {
  const iconOnly = !label && Icon;

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Pressable
        className={cn(
          "rounded-lg",
          loading || disabled ? "opacity-70" : "",
          iconOnly
            ? "p-2"
            : "flex-row items-center justify-center px-4 py-2 gap-2",
          bgStyle[variant],
          className,
        )}
        onPress={onClick}
        disabled={loading || disabled}
      >
        {loading ? (
          <ActivityIndicator size="small" className={textStyle[variant]} />
        ) : (
          (Icon ?? null)
        )}
        {label && (
          <Text
            className={cn("font-sans-semibold text-lg", textStyle[variant])}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </TouchableOpacity>
  );
}
