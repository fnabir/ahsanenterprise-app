"use client";

import { AnimatePresence, Motion } from "../motion";
import { type NumberProps } from "./types";
import { useAnimatedNumber } from "./useAnimatedNumber";

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
  const { formattedValue, sign } = useAnimatedNumber({
    value,
    valueType,
    fractionDigits,
    locale,
    signMode,
  });

  return (
    <div className={`flex items-center gap-1 lg:gap-2 ${className}`}>
      {valueType === "currency" && (
        <span className={currencyClassName}>
          {sign}
          {currency ?? " ৳"}
        </span>
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        <Motion.pre
          initial={{ scale: 0.94 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.98 }}
          transition={{ type: "spring", damping: 16, stiffness: 240 }}
          className={`inline-block tabular-nums ${valueClassName}`}
        >
          {formattedValue}
        </Motion.pre>
      </AnimatePresence>
    </div>
  );
}
