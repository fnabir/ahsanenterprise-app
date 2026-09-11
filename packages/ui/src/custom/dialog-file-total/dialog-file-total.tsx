"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  FileTotalSchema,
  FileTotalInput,
  FileTotalOutput,
} from "@repo/validators";
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
  FormTextarea,
} from "../..";
import { FileData } from "@repo/types";
import { getFullFileNo, useImporterInfo } from "@repo/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFile } from "@repo/firebase";

export function DialogFileTotal({
  children,
  year,
  fileNo,
  data,
}: {
  children: ReactElement;
  year: string;
  fileNo: string;
  data?: FileData;
}) {
  const [open, setOpen] = useState(false);
  const importerInfo = useImporterInfo(data?.importer);

  const defaultValues = useMemo(() => {
    return {
      commission:
        data?.commission != null
          ? String(data.commission)
          : String(
              importerInfo?.commission && data?.assessableValue
                ? Number(
                    (importerInfo.commission * data.assessableValue) / 100,
                  ).toFixed(2)
                : "",
            ),
      miscellaneous:
        data?.miscellaneous != null
          ? String(data.miscellaneous)
          : String(importerInfo?.miscExpense ?? ""),
      paid: data?.paid != null ? String(data.paid) : "",
      remarks: data?.remarks ?? "",
    };
  }, [data, importerInfo]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FileTotalInput, any, FileTotalOutput>({
    resolver: zodResolver(FileTotalSchema),
    defaultValues,
  });

  const onSubmit = async (FormData: FileTotalOutput) => {
    FormData.commission = FormData.commission
      ? Math.ceil(Number(FormData.commission))
      : 0;
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
            Update the totals for this file.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <FormInput
              name="commission"
              control={control}
              label="Commission"
              placeholder="Commission"
              startAdornment="৳"
              disabled={isSubmitting}
              type="number"
              allowDecimal
            />
            <FormInput
              name="miscellaneous"
              control={control}
              label="Miscellaneous Expense"
              placeholder="Miscellaneous Expense Amount"
              startAdornment="৳"
              disabled={isSubmitting}
              type="number"
              allowDecimal
            />
            <FormInput
              name="paid"
              control={control}
              label="Total Paid"
              placeholder="Total Paid Amount"
              startAdornment="৳"
              disabled={isSubmitting}
              type="number"
              allowDecimal
            />
            <FormTextarea
              name="remarks"
              control={control}
              label="Remarks"
              placeholder="Remarks"
              disabled={isSubmitting}
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
