import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { cn } from "@repo/core";
import { CardProps } from "./types";

const Card = ({ children, className, clickable, href }: CardProps) => {
  const router = useRouter();

  const body = (
    <View
      className={cn(
        "bg-surface-raised px-4 py-2 border border-border-strong rounded-lg",
        className ?? "",
      )}
    >
      {children}
    </View>
  );

  if (href || clickable) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => (href ? router.push(href) : undefined)}
      >
        {body}
      </TouchableOpacity>
    );
  }

  return body;
};

export { Card };
