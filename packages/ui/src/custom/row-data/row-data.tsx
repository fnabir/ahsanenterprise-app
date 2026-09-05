import { Number } from "../..";

export function RowData({
  label,
  value,
  valueType = "number",
  currency,
  className,
}: {
  label: string;
  value?: string | number | null;
  valueType?: "currency" | "number";
  currency?: string;
  className?: { main?: string; label?: string; value?: string } | string;
}) {
  if (value === undefined) return null;

  const isStringClassName = typeof className === "string";
  const mainClassName = isStringClassName ? className : { main: className };
  const labelClassName = isStringClassName ? "" : (className?.label ?? "");
  const valueClassName = isStringClassName ? "" : (className?.value ?? "");

  return (
    <div
      className={`flex gap-2 justify-between items-center py-1 ${mainClassName ?? ""}`}
    >
      <div className={`text-muted ${labelClassName}`}>{label}</div>
      {valueType === "currency" && typeof value === "number" ? (
        <Number
          value={value}
          fractionDigits={2}
          valueType="currency"
          currency={currency}
          className={valueClassName}
        />
      ) : (
        <div className={valueClassName}>{value}</div>
      )}
    </div>
  );
}
