export type NumberProps = {
  value: number;
  valueType?: "number" | "currency";
  currency?: string;
  fractionDigits?: number;
  locale?: string;
  className?: string;
  currencyClassName?: string;
  valueClassName?: string;
};
