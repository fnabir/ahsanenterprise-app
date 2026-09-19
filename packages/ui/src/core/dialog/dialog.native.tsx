import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import { ThemedIcon } from "../../../../../apps/mobile/src/components/ThemedIcon";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
};

export function Dialog({ open, onOpenChange, children, title }: Props) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        onPress={() => onOpenChange(false)}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View className="bg-card p-4 border border-accent rounded-xl gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-primary text-lg font-semibold capitalize">
                {title}
              </Text>
              <Pressable onPress={() => onOpenChange(false)} hitSlop={8}>
                <ThemedIcon name="close" size={24} />
              </Pressable>
            </View>
            {/* Content */}
            <View>{children}</View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
