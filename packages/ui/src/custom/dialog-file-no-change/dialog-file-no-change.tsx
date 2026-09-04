"use client";

import { useState, type ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormInput,
} from "../..";
import { FileNoChangeSchema, FileNoChangeFormValues } from "@repo/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileData, FileYear } from "@repo/types";
import { toFileDbKey } from "@repo/core";
import { changeFileNo } from "@repo/firebase";

export function DialogFileNoChange({
  children,
  files,
  year,
}: {
  children: ReactElement;
  files?: FileYear | Record<string, FileData>;
  year: number | string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FileNoChangeFormValues>({
    resolver: zodResolver(FileNoChangeSchema),
    defaultValues: {
      fileNo1: undefined,
      fileNo2: undefined,
    },
  });

  const onSubmit = async (data: FileNoChangeFormValues) => {
    clearErrors(["fileNo1", "fileNo2"]);

    const filesMap = files ? (files as Record<string, FileData>) : {};
    const currentFileNo = String(data.fileNo1);
    const newFileNo = String(data.fileNo2);
    const hasFileNo = (fileNo: string) =>
      Boolean(filesMap[fileNo] ?? filesMap[toFileDbKey(fileNo)]);

    if (!hasFileNo(currentFileNo)) {
      setError("fileNo1", {
        type: "manual",
        message: "Current file number does not exist.",
      });
      return;
    }

    const newFileVal = hasFileNo(newFileNo)
      ? (filesMap[newFileNo] ?? filesMap[toFileDbKey(newFileNo)])
      : undefined;

    await changeFileNo(
      currentFileNo,
      newFileNo,
      year,
      filesMap[currentFileNo] ?? filesMap[toFileDbKey(currentFileNo)],
      newFileVal,
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>Change File No</DialogTitle>
          <DialogDescription>
            This only updates the file information and does not update other
            related records such as requisitions, importer transactions if
            referenced.
          </DialogDescription>
        </DialogHeader>
        <form className="h-fit flex gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="fileNo1"
            control={control}
            label="Current File No"
            type="number"
            placeholder="Enter current file number"
            required
            disabled={isSubmitting}
          />
          <FormInput
            name="fileNo2"
            control={control}
            label="New File No/Swap with File No"
            type="number"
            placeholder="Enter new file number"
            required
            disabled={isSubmitting}
          />
        </form>
        <DialogFooter>
          <Button
            variant="primary"
            label="Change"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
