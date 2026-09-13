"use client";

import { useState, useEffect, type ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormInput,
} from "../..";
import {
  FileNoChangeSchema,
  FileNoChangeFormInput,
  FileNoChangeFormOutput,
} from "@repo/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileData, FileYear } from "@repo/types";
import { toFileDbKey } from "@repo/core";
import { changeFileNo } from "@repo/firebase";
import { Checkbox } from "../../core/checkbox";

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
  const [copyFileNo, setCopyFileNo] = useState<boolean>(false);

  const {
    control,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FileNoChangeFormInput, any, FileNoChangeFormOutput>({
    resolver: zodResolver(FileNoChangeSchema),
    defaultValues: {
      fileNo1: "",
      fileNo2: "",
    },
  });

  const onSubmit = async (data: FileNoChangeFormOutput) => {
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
      copyFileNo,
    );
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>{copyFileNo ? "Copy" : "Change"} File No</DialogTitle>
          <DialogDescription>
            This only updates the file information, but does not update other
            related records such as requisitions, importer transactions if
            referenced.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Checkbox
            label="Copy File No"
            value={copyFileNo}
            onChange={(e) => setCopyFileNo(e)}
            helperText="If checked, the file details from copy from file no will be copied to the current file number."
          />
          <div className="flex items-center gap-2">
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
              label={
                copyFileNo
                  ? "Copy from File No"
                  : "New File No/Swap with File No"
              }
              type="number"
              placeholder="Enter new file number"
              required
              disabled={isSubmitting}
            />
          </div>
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
