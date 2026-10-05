import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import { cn } from "../../../../core/utils";
import { ThemedIcon } from "../../../../../apps/mobile/src/components/ThemedIcon";
import { Button } from "../button/button.native";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
};

const Dialog = ({
  open,
  onOpenChange,
  children,
  title,
  subtitle,
  className,
}: Props) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 justify-center p-4"
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
        onPress={() => onOpenChange(false)}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            className={cn(
              "bg-surface-raised p-4 border border-primary rounded-xl gap-4",
              className,
            )}
          >
            <DialogHeader
              title={title}
              subtitle={subtitle}
              onClose={() => onOpenChange(false)}
            />

            <View>{children}</View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const DialogHeader = ({
  title,
  subtitle,
  onClose,
}: {
  title?: string;
  subtitle?: string;
  onClose: () => void;
}) => (
  <View className="flex-row justify-between">
    <View>
      <Text className="text-primary text-xl font-sans-semibold capitalize">
        {title}
      </Text>
      {subtitle && <Text className="text-muted">{subtitle}</Text>}
    </View>
    <Pressable onPress={onClose} hitSlop={8}>
      <ThemedIcon name="close" size={24} />
    </Pressable>
  </View>
);

const DialogFooter = ({
  children,
  onOpenChange,
  showCloseButton = true,
}: React.PropsWithChildren & {
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
}) => {
  if (!children && !showCloseButton) return null;

  return (
    <View className="flex-row justify-end gap-2 mt-4">
      {children}
      {showCloseButton && (
        <Button
          onClick={() => onOpenChange(false)}
          variant="muted"
          label="Cancel"
        />
      )}
    </View>
  );
};

export { Dialog, DialogFooter };
