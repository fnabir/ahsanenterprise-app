"use client";

import { AnimatePresence, motion, useTransform } from "framer-motion";
import { type NumberProps } from "./types";
import { useAnimatedNumber } from "./useAnimatedNumber";

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

export function Number({
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
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const animated = useAnimatedNumber(absValue);
  const formattedValue = useTransform(animated, (v) =>
    formatAmount(v, fractionDigits, locale, valueType),
  );

  const showNegativeSign = isNegative && signMode.includes("-");
  const showPositiveSign = !isNegative && signMode.includes("-+");
  const sign = showNegativeSign ? "-" : showPositiveSign ? "+" : "";

  return (
    <div className={`flex items-center gap-1 lg:gap-2 ${className}`}>
      {valueType === "currency" && (
        <span className={currencyClassName}>
          {value !== 0 ? sign : null}
          {currency ?? " ৳"}
        </span>
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.pre
          initial={{ scale: 0.94 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.98 }}
          transition={{ type: "spring", damping: 16, stiffness: 240 }}
          className={`inline-block tabular-nums ${valueClassName}`}
        >
          {formattedValue}
        </motion.pre>
      </AnimatePresence>
    </div>
  );
}
