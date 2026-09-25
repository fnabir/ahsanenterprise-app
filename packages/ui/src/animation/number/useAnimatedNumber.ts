"use client";

import { useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function formatAmount(
  value: number,
  fractionDigits: number,
  locale: string,
  valueType: "number" | "currency",
) {
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

  const spring = useSpring(absValue, {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    spring.set(absValue);
  }, [spring, absValue]);

  const formattedValue = useTransform(spring, (v) =>
    formatAmount(v, fractionDigits, locale, valueType),
  );

  const showNegativeSign = isNegative && signMode.includes("-");
  const showPositiveSign = !isNegative && signMode.includes("+");
  const sign =
    value !== 0 ? (showNegativeSign ? "-" : showPositiveSign ? "+" : "") : "";

  return { formattedValue, sign, isNegative };
}
