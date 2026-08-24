import { Number } from "@repo/ui";

export default function DataRow({
  label,
  value,
  valueType = "number",
  currency,
  className,
}: {
  label: string;
  value: string | number | undefined;
  valueType?: "currency" | "number";
  currency?: string;
  className?: { main?: string; label?: string; value?: string };
}) {
  if (value === undefined) return null;
  return (
    <div
      className={`flex gap-2 justify-between items-center py-1 ${className?.main ?? ""}`}
    >
      <div className={`text-muted ${className?.label ?? ""}`}>{label}</div>
      {valueType === "currency" && typeof value === "number" ? (
        <Number
          value={value}
          fractionDigits={2}
          valueType="currency"
          currency={currency}
          className={className?.value ?? ""}
        />
      ) : (
        <div className={className?.value ?? ""}>{value}</div>
      )}
    </div>
  );
}
