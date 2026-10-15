import { AnimatedNumber } from "../../animation/number";
import { Card } from "../../core/card";
import { Text, View } from "react-native";
import { cn, capitalize } from "@repo/core";

export function CardBalanceTotal({
  id,
  href,
  value,
  date,
  className = "",
  note,
  noteClassName = "",
}: {
  id: string;
  href?: string;
  value: number;
  date?: string;
  className?: string;
  note?: string;
  noteClassName?: string;
}) {
  return (
    <Card
      href={href ?? `/${id}-balance`}
      className={cn("flex-row justify-between gap-2", className)}
    >
      <View>
        <Text className="text-foreground text-lg font-sans-semibold">
          {capitalize(id)}
        </Text>
        {date && <Text className="text-muted">{date}</Text>}
      </View>
      <View>
        <AnimatedNumber
          value={Math.abs(value)}
          valueType="currency"
          className="justify-end"
          valueClassName="text-xl"
          currencyClassName="text-xl"
        />
        {note ? (
          <Text
            className={cn(
              "text-foreground font-semibold text-right",
              noteClassName,
            )}
          >
            {note}
          </Text>
        ) : value > 0 ? (
          <Text className="text-danger font-semibold text-right">
            Outstanding Balance
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
