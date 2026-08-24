import { Text, View } from "react-native";
import { Motion } from "../../motion/Motion.native";
import type { AmountProps } from "./types";

function formatAmount(value: number, fractionDigits: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function Amount({
  value,
  currency = "৳",
  fractionDigits = 0,
  locale = "en-IN",
  className = "",
  currencyClassName = "text-sm",
  valueClassName = "tabular-nums",
}: AmountProps) {
  const formattedValue = formatAmount(value, fractionDigits, locale);

  return (
    <View className={className}>
      <Text className={currencyClassName}>{currency} </Text>
      <Motion.Text
        key={formattedValue}
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 16, stiffness: 240 }}
        className={valueClassName}
      >
        {formattedValue}
      </Motion.Text>
    </View>
  );
}
