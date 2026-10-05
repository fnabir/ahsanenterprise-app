import { AnimatedNumber } from "../../animation/number";
import { View, Text } from "react-native";
import { cn } from "../../../../core/utils";

export function RowData({
  label,
  value,
  valueType = "number",
  currency,
  className,
}: {
  label?: string;
  value?: string | number | null;
  valueType?: "currency" | "number";
  currency?: string;
  className?: { main?: string; label?: string; value?: string } | string;
}) {
  if (!label || value === null || value === undefined || value === "")
    return null;

  const isStringClassName = typeof className === "string";
  const mainClassName = isStringClassName ? className : (className?.main ?? "");
  const labelClassName = isStringClassName ? "" : (className?.label ?? "");
  const valueClassName = isStringClassName ? "" : (className?.value ?? "");

  return (
    <View
      className={cn(
        "w-full flex-row gap-2 items-center justify-between",
        mainClassName ?? "",
      )}
    >
      <Text className={cn("text-muted", labelClassName)}>{label}</Text>
      {valueType === "currency" && typeof value === "number" ? (
        <AnimatedNumber
          value={value}
          fractionDigits={2}
          valueType="currency"
          currency={currency}
          currencyClassName={cn("text-md font-mono", valueClassName)}
          valueClassName={cn("text-md font-mono", valueClassName)}
        />
      ) : (
        <Text className={cn("text-foreground", valueClassName)}>{value}</Text>
      )}
    </View>
  );
}
