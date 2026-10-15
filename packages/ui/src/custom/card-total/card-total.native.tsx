import { Card } from "../../core/card";
import { AnimatedNumber } from "../../animation/number";
import { View, Text } from "react-native";
import { cn } from "../../../../core/utils";

function getTotalBalanceAttributes(
  calculatedBalance: number,
  type?: "importer" | "staff" | "other",
) {
  if (
    (type === "importer" && calculatedBalance > 0) ||
    (type === "staff" && calculatedBalance < 0)
  ) {
    return {
      note: "Outstanding Balance",
      noteClassName: "text-danger",
      className: "bg-danger-subtle border-danger",
    };
  } else if (
    (type === "importer" && calculatedBalance < 0) ||
    (type === "staff" && calculatedBalance > 0)
  ) {
    return {
      note: type === "importer" ? "Overpaid" : "Payable to Staff",
      noteClassName: "text-warning",
      className: "bg-warning-subtle border-warning",
    };
  } else if (calculatedBalance === 0) {
    return {
      className: "bg-success-subtle border-success",
    };
  } else {
    return {
      className: "bg-primary-subtle border-primary",
    };
  }
}

export function CardTotal({
  label,
  value,
  date,
  type,
  className,
}: {
  label?: string;
  value?: number;
  date?: string;
  type?: "importer" | "staff" | "other";
  className?: string;
}) {
  const totalBalanceAttributes = getTotalBalanceAttributes(value || 0, type);
  return (
    <Card
      className={cn(
        "max-w-full min-w-full flex-row justify-between gap-2 border-0 border-t pb-safe rounded-none",
        totalBalanceAttributes.className,
        className,
      )}
    >
      <View>
        <Text className="text-foreground text-xl font-sans-semibold">
          {label ?? "Total Balance"}
        </Text>
        {date && <Text className="text-muted">{date}</Text>}
      </View>
      <View className="flex-col items-end">
        <AnimatedNumber
          value={value || 0}
          valueType="currency"
          signMode={type === "staff" ? "" : "-"}
        />
        {totalBalanceAttributes.note && (
          <Text
            className={cn(
              "text-foreground font-semibold text-right",
              totalBalanceAttributes.noteClassName,
            )}
          >
            {totalBalanceAttributes.note}
          </Text>
        )}
      </View>
    </Card>
  );
}
