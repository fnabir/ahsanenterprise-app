"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import { FILE_STATUS_OPTIONS, toISODate } from "@repo/core";
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
import { getFullFileNo } from "@repo/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileDetailsSchema,
  FileDetailsFormInput,
  FileDetailsFormOutput,
} from "@repo/validators";
import { updateFile } from "@repo/firebase";

export function DialogFileDetails({
  children,
  year,
  fileNo,
  data,
}: {
  children: ReactElement;
  year: string;
  fileNo: string;
  files?: FileYear | Record<string, FileData>;
  data?: FileData;
}) {
  const [open, setOpen] = useState(false);

  const defaultValues = useMemo(() => {
    return {
      importer: data?.importer,
      itemCount: data?.itemCount != null ? String(data?.itemCount) : "",
      itemPackage: data?.itemPackage ?? "",
      itemName: data?.itemName ?? "",
      lc: data?.lc ? String(data?.lc) : "",
      bl: data?.bl ?? "",
      vessel: data?.vessel ?? "",
      rotNo: data?.rotNo ?? "",
      cnfValue: data?.cnfValue != null ? String(data?.cnfValue) : "",
      assessableValue:
        data?.assessableValue != null ? String(data?.assessableValue) : "",
      be: data?.be != null ? String(data?.be) : "",
      beDate: data?.beDate ? toISODate("dd/MM/yyyy", data.beDate) : "",
      assessmentDate: data?.assessmentDate
        ? toISODate("dd/MM/yy", data.assessmentDate)
        : "",
      dutyPaymentDate: data?.dutyPaymentDate
        ? toISODate("dd/MM/yy", data.dutyPaymentDate)
        : "",
      deliveryDate: data?.deliveryDate
        ? toISODate("dd/MM/yy", data.deliveryDate)
        : "",
      status: data?.status ?? "New",
    };
  }, [data]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FileDetailsFormInput, any, FileDetailsFormOutput>({
    resolver: zodResolver(FileDetailsSchema),
    defaultValues,
  });

  const onSubmit = async (FormData: FileDetailsFormOutput) => {
    await updateFile(fileNo, year, FormData);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>{getFullFileNo(fileNo, year)}</DialogTitle>
          <DialogDescription>
            Update the details for this file.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <FormInput
                name="itemPackage"
                control={control}
                label="Package Details"
                placeholder="Package details"
                disabled={isSubmitting}
                required
              />
              <FormInput
                name="itemCount"
                control={control}
                label="Item Count"
                placeholder="Number of Items"
                disabled={isSubmitting}
                required
                className="max-w-1/3 w-full"
              />
            </div>
            <FormInput
              name="itemName"
              control={control}
              label="Item Name"
              placeholder="Item name"
              disabled={isSubmitting}
              required
            />

            <div className="flex gap-2">
              <FormInput
                name="bl"
                control={control}
                label="B/L No"
                placeholder="B/L number"
                disabled={isSubmitting}
              />
              <FormInput
                name="lc"
                control={control}
                label="LC No"
                placeholder="LC number"
                type="text"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2">
              <FormInput
                name="vessel"
                control={control}
                label="Vessel Name"
                placeholder="Vessel name"
                disabled={isSubmitting}
              />
              <FormInput
                name="rotNo"
                control={control}
                label="ROT No"
                placeholder="ROT number"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2">
              <FormInput
                name="cnfValue"
                control={control}
                label="C&F Value"
                startAdornment="$"
                placeholder="C&F value"
                allowDecimal
                disabled={isSubmitting}
              />
              <FormInput
                name="assessableValue"
                control={control}
                label="Assessable Value"
                startAdornment="৳"
                placeholder="Assessable value"
                type="number"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2">
              <FormInput
                name="be"
                control={control}
                label="B/E No"
                startAdornment="C-"
                placeholder="B/E number"
                disabled={isSubmitting}
              />
              <FormInput
                name="beDate"
                control={control}
                label="B/E Date"
                type="date"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-2">
              <FormInput
                name="assessmentDate"
                control={control}
                label="Assessment Date"
                type="date"
                disabled={isSubmitting}
              />
              <FormInput
                name="dutyPaymentDate"
                control={control}
                label="Duty Payment Date"
                type="date"
                disabled={isSubmitting}
              />
              <FormInput
                name="deliveryDate"
                control={control}
                label="Delivery Date"
                type="date"
                disabled={isSubmitting}
              />
            </div>
            <FormSelect
              name="status"
              control={control}
              label="Status"
              options={FILE_STATUS_OPTIONS}
              placeholder="Select Status"
              disabled={isSubmitting}
              required
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            variant="primary"
            label={data ? "Update" : "Add"}
            onClick={handleSubmit(onSubmit)}
            className="max-w-22 w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
