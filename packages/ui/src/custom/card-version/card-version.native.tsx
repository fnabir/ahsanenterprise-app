"use client";

import { Badge } from "../../core/badge/badge.native";
import { Card } from "../../core/card";
import { changelog } from "@repo/core";
import packageJson from "../../../../../package.json";
import { useAuth } from "../../contexts/AuthContext";
import { Text, View } from "react-native";
import { ThemedIcon } from "../../../../../apps/mobile/src/components/ThemedIcon";

const currentVersion = packageJson.version;

export function CardVersion({
  version = currentVersion,
  showCurrentVersion = false,
}: {
  version?: string;
  showCurrentVersion?: boolean;
}) {
  const log = changelog[version] ?? null;
  const date = log?.date;

  const { isAdmin } = useAuth();

  const filteredDetails =
    log?.details.filter((detail) => {
      return detail.startsWith("[ADMIN]") ? isAdmin : true;
    }) ?? [];

  function renderDetail(detail: string, index: number) {
    const cleanDetail = detail.replace("[ADMIN]", "").trim();

    const tagMatch = cleanDetail.match(/^\[(.*?)\]/);
    const tag = tagMatch ? tagMatch[1] : null;

    const message = tagMatch
      ? cleanDetail.replace(tagMatch[0], "").trim()
      : cleanDetail;

    const tagColor = tag
      ? tag === "FEATURE"
        ? "success"
        : tag === "UPDATE"
          ? "primary"
          : tag === "FIX"
            ? "danger"
            : "text"
      : "text";

    return (
      <View key={index} className="w-full flex-row py-0.5 gap-2">
        <View className="translate-y-1.75">
          {tag && <ThemedIcon name="arrow-right" color={tagColor} size={12} />}
        </View>

        <Text className="text-foreground text-lg font-sans">{message}</Text>
      </View>
    );
  }

  return (
    <Card className="flex-col items-center">
      <View className="flex-col items-center gap-1">
        {showCurrentVersion && (
          <Text className=" font-sans-semibold text-foreground">
            AHSAN ENTERPRISE
          </Text>
        )}
        <Text className="text-3xl font-mono text-primary">{version}</Text>
        {showCurrentVersion && <Badge variant="success" label="Current" />}
        <Text className="text-muted text-center font-sans text-lg">
          {date
            ? new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "Beta Version"}
        </Text>
      </View>

      <View className="w-full h-px bg-muted my-3" />
      {filteredDetails.length > 0 ? (
        filteredDetails.map((detail, index) => renderDetail(detail, index))
      ) : (
        <View className="py-1">
          <Text>No changelog available for this version.</Text>
        </View>
      )}
    </Card>
  );
}
