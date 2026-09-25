import { Text, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { cn } from "@repo/core";
import { type NumberProps } from "./types";
import { useAnimatedNumber } from "./useAnimatedNumber.native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AnimatedNumber({
  value,
  valueType = "number",
  currency,
  fractionDigits = 0,
  locale = "en-IN",
  className = "",
  currencyClassName = "",
  valueClassName = "",
  signMode = "-",
}: NumberProps) {
  const { animatedProps, sign } = useAnimatedNumber({
    value,
    valueType,
    fractionDigits,
    locale,
    signMode,
  });

  return (
    <View className={`flex-row items-center gap-1 ${className}`}>
      {valueType === "currency" && (
        <Text className={cn("font-sans text-xl", currencyClassName)}>
          {sign ?? ""}
          {currency ?? "৳"}{" "}
        </Text>
      )}
      <AnimatedTextInput
        editable={false}
        underlineColorAndroid="transparent"
        animatedProps={animatedProps}
        className={cn("text-lg font-mono-bold", valueClassName)}
        style={{
          padding: 0,
          margin: 0,
          height: undefined, // let it size to lineHeight below, not a fixed box
          includeFontPadding: false, // Android only — strips extra ascent/descent space
          textAlignVertical: "center", // Android only — vertically centers within the box
        }}
      />
    </View>
  );
}
