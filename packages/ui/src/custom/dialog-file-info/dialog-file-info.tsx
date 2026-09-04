"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import { FILE_STATUS_OPTIONS, useImporterList } from "@repo/core";
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
  FormSelect,
} from "../..";
import { FileData, FileYear } from "@repo/types";
import { fromFileDbKey, getFullFileNo } from "@repo/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInfoSchema, FileInfoFormValues } from "@repo/validators";
import { Input } from "../../core/input";
import { addNewFile, updateFile } from "@repo/firebase";

export function DialogFileInfo({
  children,
  year,
  fileNo,
  files,
  data,
}: {
  children: ReactElement;
  year: number;
  fileNo?: number;
  files?: FileYear | Record<string, FileData>;
  data?: FileData;
}) {
  const [open, setOpen] = useState(false);
  const [newFileNo, setNewFileNo] = useState<number | undefined>(undefined);
  const [newFileNoText, setNewFileNoText] = useState("");
  const importerList = useImporterList();
  const activeFileNo = fileNo ?? newFileNo;

  const existingFileNos = useMemo(() => {
    if (!files) return new Set<number>();

    return new Set(
      Object.keys(files)
        .map((key) => Number(fromFileDbKey(key)))
        .filter((n) => Number.isInteger(n) && n > 0),
    );
  }, [files]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FileInfoFormValues>({
    resolver: zodResolver(FileInfoSchema),
    defaultValues: {
      importer: data?.importer ?? "",
      itemPackage: data?.itemPackage ?? "",
      itemName: data?.itemName ?? "",
      lc: String(data?.lc ?? ""),
      be: data?.be ?? 0,
      bl: data?.bl ?? "",
      rotNo: data?.rotNo ?? "",
      status: data?.status ?? "New",
    },
  });

  const availableFileNumber = useMemo(() => {
    let next = 1;
    while (existingFileNos.has(next)) {
      next += 1;
    }

    return next;
  }, [existingFileNos]);

  const handleFileCheck = () => {
    const parsedFileNo = Number(newFileNoText);
    if (!parsedFileNo || Number.isNaN(parsedFileNo)) {
      alert("Please enter a valid file number.");
      return;
    }

    if (!files) {
      setNewFileNo(parsedFileNo);
      return;
    }

    const fileExists = existingFileNos.has(parsedFileNo);

    if (fileExists) {
      alert("File number already exists.");
    } else {
      setNewFileNo(parsedFileNo);
    }
  };

  const onSubmit = async (FormData: FileInfoFormValues) => {
    if (!activeFileNo) {
      alert("Please enter a valid file number.");
      return;
    }

    const fileData: FileData = {
      importer: FormData.importer,
      itemPackage: FormData.itemPackage,
      itemName: FormData.itemName,
      lc: FormData.lc ?? null,
      be: FormData.be ?? null,
      bl: FormData.bl ?? null,
      rotNo: FormData.rotNo ?? null,
      status: FormData.status,
    };

    if (!data) await addNewFile(activeFileNo, year, fileData);
    else await updateFile(activeFileNo, year, fileData);

    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setNewFileNo(undefined);
      setNewFileNoText("");
    }
    reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>
            {activeFileNo ? getFullFileNo(activeFileNo, year) : "Add New File"}
          </DialogTitle>
          <DialogDescription>
            {activeFileNo && data
              ? "Update the information for this file."
              : "Fill in the details for the new file."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          {!activeFileNo ? (
            <div className="flex gap-2 items-end">
              <Input
                label="File No"
                placeholder="Enter file number"
                value={newFileNoText}
                onChangeText={(text) => {
                  setNewFileNo(undefined);
                  setNewFileNoText(text.replace(/\D/g, ""));
                }}
                type="number"
                allowDecimal={false}
                className="flex-1"
                startAdornment={
                  <span className="text-sm text-muted">AE/IMP/</span>
                }
                endAdornment={
                  <span className="text-sm text-muted">/{year}</span>
                }
              />
              <Button
                label={`Suggestion: ${getFullFileNo(availableFileNumber, year)}`}
                variant="subtle"
                onClick={() => {
                  setNewFileNo(availableFileNumber);
                  setNewFileNoText(String(availableFileNumber));
                }}
                className="text-xs h-9"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <FormSelect<FileInfoFormValues>
                name="importer"
                control={control}
                label="Importer"
                options={importerList}
                placeholder="Select Importer Name"
                disabled={isSubmitting}
                required
              />
              <FormInput<FileInfoFormValues>
                name="itemPackage"
                control={control}
                label="Package Details"
                placeholder="Package details"
                disabled={isSubmitting}
              />
              <FormInput<FileInfoFormValues>
                name="itemName"
                control={control}
                label="Item Name"
                placeholder="Item name"
                disabled={isSubmitting}
              />

              <div className="flex gap-2">
                <FormInput<FileInfoFormValues>
                  name="bl"
                  control={control}
                  label="B/L No"
                  placeholder="B/L number"
                  disabled={isSubmitting}
                />
                <FormInput<FileInfoFormValues>
                  name="lc"
                  control={control}
                  label="LC No"
                  placeholder="LC number"
                  type="text"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-2">
                <FormInput<FileInfoFormValues>
                  name="be"
                  control={control}
                  label="B/E No"
                  startAdornment={<span className="text-sm">C-</span>}
                  placeholder="B/E number"
                  disabled={isSubmitting}
                />
                <FormInput<FileInfoFormValues>
                  name="rotNo"
                  control={control}
                  label="ROT No"
                  placeholder="ROT number"
                  disabled={isSubmitting}
                />
              </div>
              <FormSelect<FileInfoFormValues>
                name="status"
                control={control}
                label="Status"
                options={FILE_STATUS_OPTIONS}
                placeholder="Select Status"
                disabled={isSubmitting}
                required
              />
            </div>
          )}
        </form>

        <DialogFooter>
          {activeFileNo ? (
            <Button
              variant="primary"
              label={data ? "Update" : "Add"}
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            />
          ) : (
            <Button
              variant="primary"
              label="Check the File Number"
              onClick={handleFileCheck}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
