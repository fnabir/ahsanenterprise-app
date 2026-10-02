import type { GroupedFileItem } from "@repo/types";
import { useState, useEffect } from "react";
import { updateFileStatus } from "@repo/firebase";
import { FILE_STATUS_OPTIONS } from "@repo/core";
import { View, Text } from "react-native";
import { Button } from "../../core/button";
import { ThemedIcon } from "../../../../../apps/mobile/src/components/ThemedIcon";

const CardFileStatusList = ({ file }: { file: GroupedFileItem }) => {
  return (
    <View
      className="border-muted -mx-4 h-[66px] flex-row items-center justify-between border-t px-4"
      key={file.fileNo}
    >
      <View>
        <Text className="text-foreground bg-muted-subtle w-14 rounded-lg px-2 py-px text-center font-mono text-sm">
          #{file.fileNo}
        </Text>
        <Text className="text-foreground font-sans-bold rounded-lg px-2 py-px text-sm">
          {file.data.importer}
        </Text>
        <Text className="text-foreground rounded-lg px-2 py-px font-sans text-sm">
          {file.data.itemName}
        </Text>
      </View>
      <Button Icon={<ThemedIcon name="dots-vertical" />} />
    </View>
  );
};

export { CardFileStatusList };
