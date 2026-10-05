import { Card } from "../../core/card";
import { cn } from "@repo/core";
import { getCurrentYear } from "@repo/core";
import { AnimatedNumber } from "../../animation/number";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export function CardFilesTotal({
  year,
  count,
  onPress,
  disabled,
}: {
  year: string;
  count: number;
  onPress?: () => void;
  disabled?: boolean;
}) {
  const router = useRouter();
  const isCurrentYear = Number(year) === getCurrentYear();
  const href = isCurrentYear ? `/files` : `/files?year=${year}`;

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        if (onPress) {
          onPress();
          return;
        }
        router.push(href);
      }}
    >
      <Card
        className={cn(
          "flex-row justify-between",
          isCurrentYear ? "border-primary" : "border-border",
        )}
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-foreground font-sans text-sm">YEAR</Text>
          <Text className="text-foreground font-mono-bold text-2xl">{year}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <AnimatedNumber value={count} valueClassName="text-2xl" />
          <Text className="text-foreground font-sans text-sm">FILES</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
