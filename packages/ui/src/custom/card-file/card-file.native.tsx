import { fromFileDbKey, getFullFileNo } from "@repo/core";
import { FileData } from "@repo/types";
import { Card } from "../../core/card";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { BadgeFileStatus } from "../badge-file-status";
import { ThemedIcon } from "../../../../../apps/mobile/src/components/ThemedIcon";
import { Button } from "../../core/button";
import { CopyText } from "../copy-text";
import { DialogDelete } from "../dialog-delete/dialog-delete.native";
import { deleteFile } from "@repo/firebase";

const CardFile = ({
  year,
  fileKey,
  data,
}: {
  year: number | string;
  fileKey: string;
  data: FileData;
}) => {
  const fileNo = Number(fromFileDbKey(fileKey));
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onDeleteFile = async () => {
    await deleteFile(fileNo, year);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="flex-col mb-2">
      <View className="w-full flex-row items-center justify-between gap-2">
        <View className="flex-row items-center gap-2">
          <Text className="w-12 text-center text-primary bg-primary-subtle border-primary border rounded-lg p-0.5">
            #{fileNo}
          </Text>
          <BadgeFileStatus status={data.status} />
        </View>
        <ThemedIcon name="pencil-outline" color="textSecondary" />
      </View>
      <View className="border-y border-border-strong my-2 py-2">
        <Text className="text-foreground font-sans-bold">{data.importer}</Text>
        <Text className="text-muted font-sans-semibold">
          {data.itemName} • {data.itemPackage}
        </Text>
      </View>
      {(data.bl || data.be || data.lc) && (
        <View className="flex-col gap-1 space-y-1 border-b border-border-strong pb-2">
          <CopyText label="B/L" text={data.bl} />
          <CopyText label="B.E." text={data.be?.toString()} />
          <CopyText label="LC" text={data.lc} />
          <CopyText label="ROT" text={data.rotNo} />
        </View>
      )}
      <View className="mt-2 flex-row justify-end gap-2">
        <Button
          variant="default"
          label="View"
          Icon={<ThemedIcon name="eye-outline" color="foreground" />}
          onClick={() => {
            router.push(`/files/${year}-${fileNo}`);
          }}
        />
        <Button
          variant="danger"
          label="Delete"
          Icon={<ThemedIcon name="delete-outline" color="foreground" />}
          onClick={() => {
            setIsDeleteDialogOpen(true);
          }}
        />
      </View>
      <DialogDelete
        title="Delete File"
        onDelete={onDeleteFile}
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
      >
        <Text className="text-foreground font-sans text-base">
          Are you sure you want to delete file{" "}
          <Text className="text-primary bg-primary-subtle font-sans-semibold">
            {` ${getFullFileNo(Number(fileNo), Number(year))} `}
          </Text>
          ? This action cannot be undone.
        </Text>
      </DialogDelete>
    </Card>
  );
};

export { CardFile };
