import { useCallback, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { cn } from "@repo/core";
import { CardProps } from "./types";

const Card = ({ children, className, clickable, href }: CardProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsNavigating(false);
    }, []),
  );

  const body = (
    <View
      className={cn(
        "bg-surface-raised px-4 py-2 border border-border-strong rounded-lg shadow-md",
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
        disabled={isNavigating}
        onPress={() => {
          if (isNavigating || !href) return;

          setIsNavigating(true);
          router.push(href);
        }}
      >
        {body}
      </TouchableOpacity>
    );
  }

  return body;
};

export { Card };
