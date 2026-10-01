import { AnimatedNumber } from "../../animation/number";
import { Card } from "../../core/card";
import { Text } from "react-native";
import { cn } from "@repo/core";
import { capitalize } from "@repo/core";

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
    <Card href={href ?? `/${id}-balance`} className={className}>
      <Text className="text-foreground font-sans-bold">{capitalize(id)}</Text>
      <AnimatedNumber value={Math.abs(value)} valueType="currency" />
      {note ? (
        <Text
          className={cn("text-foreground font-semibold text-sm", noteClassName)}
        >
          {note}
        </Text>
      ) : value > 0 ? (
        <Text className="text-danger font-semibold text-sm">
          Outstanding Balance
        </Text>
      ) : null}
      {date && <Text className="text-muted text-sm mt-1">Updated {date}</Text>}
    </Card>
  );
}
