import { useEffect } from "react";
import {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

function formatAmount(
  value: number,
  fractionDigits: number,
  locale: string,
  valueType: "number" | "currency",
) {
  "worklet";
  // Requires Hermes' Intl support (on by default in modern Expo/RN).
  return new Intl.NumberFormat(locale, {
    useGrouping: valueType === "currency" ? true : false,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

type UseAnimatedNumberOptions = {
  value: number;
  valueType?: "number" | "currency";
  fractionDigits?: number;
  locale?: string;
  signMode?: "-" | "-+" | "+-" | "";
};

export function useAnimatedNumber({
  value,
  valueType = "number",
  fractionDigits = 0,
  locale = "en-IN",
  signMode = "-",
}: UseAnimatedNumberOptions) {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const progress = useSharedValue(absValue);

  useEffect(() => {
    progress.value = withSpring(absValue, {
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    });
  }, [absValue, progress]);

  const animatedProps = useAnimatedProps(() => {
    const formatted = formatAmount(
      progress.value,
      fractionDigits,
      locale,
      valueType,
    );
    return {
      text: formatted,
      defaultValue: formatted,
    };
  });

  const showNegativeSign = isNegative && signMode.includes("-");
  const showPositiveSign = !isNegative && signMode.includes("+");
  const sign =
    value !== 0 ? (showNegativeSign ? "-" : showPositiveSign ? "+" : "") : "";

  return { animatedProps, sign, isNegative };
}
