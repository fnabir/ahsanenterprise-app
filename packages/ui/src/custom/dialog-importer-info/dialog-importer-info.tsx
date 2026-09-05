"use client";

import { useState, useEffect, type ReactElement } from "react";
import { ImporterInfoSchema, ImporterInfoFormValues } from "@repo/validators";
import type { ImporterData } from "@repo/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { updateImporterInfo } from "@repo/firebase";

export function DialogImporterInfo({
  children,
  data,
  importer,
}: {
  children: ReactElement;
  data?: ImporterData;
  importer?: string;
}) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ImporterInfoFormValues>({
    resolver: zodResolver(ImporterInfoSchema),
    defaultValues: {
      name: importer ?? "",
      address1: data?.address1 ?? "",
      address2: data?.address2 ?? "",
      address3: data?.address3 ?? "",
      commission: data?.commission ?? 0,
      minCommission: data?.minCommission ?? 0,
      miscExpense: data?.miscExpense ?? 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: importer ?? "",
        address1: data?.address1 ?? "",
        address2: data?.address2 ?? "",
        address3: data?.address3 ?? "",
        commission: data?.commission ?? 0,
        minCommission: data?.minCommission ?? 0,
        miscExpense: data?.miscExpense ?? 0,
      });
    }
  }, [open]);

  const onSubmit = async (FormData: ImporterInfoFormValues) => {
    const { name, commission, minCommission, miscExpense, ...payload } =
      FormData;
    const formattedData = {
      ...payload,
      commission: !commission || commission === 0 ? null : commission,
      minCommission:
        !minCommission || minCommission === 0 ? null : minCommission,
      miscExpense: !miscExpense || miscExpense === 0 ? null : miscExpense,
    };

    if (data !== FormData) {
      await updateImporterInfo(name, formattedData);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {data ? "Update" : "Add New"} Importer Information
          </DialogTitle>
          <DialogDescription>
            {data
              ? `Update the information of ${importer}.`
              : `Fill in the details for the new importer.`}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          <FormInput<ImporterInfoFormValues>
            name="name"
            control={control}
            label="Importer Name"
            placeholder="Enter Importer Name"
            disabled={(importer ? true : false) || isSubmitting}
            helperText="Importer name cannot be changed once set."
            required
          />
          <FormInput<ImporterInfoFormValues>
            name="address1"
            control={control}
            label="Address 1"
            placeholder="Enter Address 1"
            disabled={isSubmitting}
            required
          />
          <FormInput<ImporterInfoFormValues>
            name="address2"
            control={control}
            label="Address 2"
            placeholder="Enter Address 2"
            disabled={isSubmitting}
          />
          <FormInput<ImporterInfoFormValues>
            name="address3"
            control={control}
            label="Address 3"
            placeholder="Enter Address 3"
            disabled={isSubmitting}
          />
          <FormInput<ImporterInfoFormValues>
            name="commission"
            control={control}
            label="Percentage of Commission per File"
            type="number"
            allowDecimal={true}
            placeholder="Enter Commission Percentage"
            disabled={isSubmitting}
            endAdornment="%"
          />
          <FormInput<ImporterInfoFormValues>
            name="minCommission"
            control={control}
            label="Minimum Commission per File"
            type="number"
            placeholder="Enter Minimum Commission Amount"
            disabled={isSubmitting}
            startAdornment="৳"
          />
          <FormInput<ImporterInfoFormValues>
            name="miscExpense"
            control={control}
            label="Miscellaneous Expense per File"
            type="number"
            placeholder="Enter Miscellaneous Expense Amount"
            disabled={isSubmitting}
            startAdornment="৳"
          />
        </form>
        <DialogFooter>
          <Button
            variant="primary"
            label={data ? "Update" : "Add"}
            onClick={handleSubmit(onSubmit)}
            className="min-w-22"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
