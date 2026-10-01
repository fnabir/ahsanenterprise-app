import { useState } from "react";
import { Clipboard, Text, TouchableOpacity } from "react-native";
import { Motion } from "@legendapp/motion";
import { ThemedIcon } from "../../../../../apps/mobile/src/components/ThemedIcon";

export function CopyText({
  label,
  text,
}: {
  label?: string;
  text?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  if (!text || text === "0") return null;

  const onCopyText = async () => {
    try {
      await Clipboard.setString(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onCopyText}
      className={`flex-row h-8 items-center py-1 px-2 rounded-md border font-mono bg-muted-subtle
        ${copied ? "border-success" : "border-muted-foreground"}
      `}
    >
      <Text className="w-16 text-[13px] text-muted">{label}</Text>
      <Text className="flex-1 text-[13px] text-foreground">{text}</Text>

      <Motion.View
        key={copied ? "tick" : "copy"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? (
          <ThemedIcon name="check" size={18} color="success" />
        ) : (
          <ThemedIcon name="content-copy" size={18} color="textSecondary" />
        )}
      </Motion.View>

      {copied && (
        <Motion.View
          key="copied-wrapper"
          className="overflow-hidden ml-1"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Motion.Text
            className="text-success font-semibold"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
          >
            Copied
          </Motion.Text>
        </Motion.View>
      )}
    </TouchableOpacity>
  );
}
