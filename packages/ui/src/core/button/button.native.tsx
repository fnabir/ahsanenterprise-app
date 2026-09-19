import { Text, TouchableOpacity, View } from "react-native";
import type { ButtonProps } from "./types";

export function Button({
  onClick,
  loading,
  loadingLabel,
  label,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onClick} disabled={disabled}>
      <View className="flex-row items-center justify-center bg-primary rounded-lg px-2 py-1 my-2">
        <Text className="font-sans-semibold text-foreground">
          {loading && loadingLabel ? loadingLabel : label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
