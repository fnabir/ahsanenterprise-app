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
import { getFullFileNo } from "@repo/core";
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

  const defaultValues = useMemo(() => {
    return {
      paid: data?.paid != null ? String(data.paid) : "",
      remarks: data?.remarks ?? "",
    };
  }, [data]);

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
