"use client";

import { useState, useEffect, type ReactElement } from "react";
import { TransactionSchema, TransactionFormValues } from "@repo/validators";
import { fromISODate, TRANSACTION_PAYMENT_OPTIONS } from "@repo/core";
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
  FormSelect,
} from "../..";
import { TransactionData } from "@repo/types";
import { updateTransaction } from "@repo/firebase";

export function DialogTransaction({
  children,
  data,
  id,
  type,
  transactionType,
}: {
  children: ReactElement;
  data?: TransactionData;
  id: string;
  type: "staff" | "importer";
  transactionType: "bill" | "payment";
}) {
  const [open, setOpen] = useState(false);
  const [detailsLabel, setDetailsLabel] = useState<string>("Details");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: data ?? {},
  });

  const title = watch("title");

  useEffect(() => {
    if (transactionType === "bill") return;

    switch (title) {
      case "Cash":
        setDetailsLabel("Receiver");
        setValue("details", "");
        break;
      case "Cheque":
      case "Bank Transfer":
        setDetailsLabel("Bank Name, Branch");
        setValue("details", "");
        break;
      case "Account Transfer":
      case "CellFin (Account)":
        setDetailsLabel("Account Number");
        setValue("details", "Acc No.**");
        break;
      case "CellFin (Phone)":
        setDetailsLabel("Phone Number");
        setValue("details", "");
        break;
      case "bKash":
        setDetailsLabel("bKash Number");
        setValue("details", "");
        break;
      default:
        setDetailsLabel("Details");
        setValue("details", "");
        break;
    }
  }, [title]);

  useEffect(() => {
    if (open) {
      reset(data ?? {});
    }
  }, [open]);

  const onSubmit = async (FormData: TransactionFormValues) => {
    if (data !== FormData) {
      await updateTransaction(id, type, transactionType, FormData);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {data ? "Update" : "Add New"} {transactionType} Transaction
          </DialogTitle>
          <DialogDescription>
            {data
              ? `Update the information for this ${transactionType} transaction.`
              : `Fill in the details for the new ${transactionType} transaction.`}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          {transactionType === "payment" ? (
            <FormSelect<TransactionFormValues>
              name="title"
              control={control}
              label="Transaction Type"
              options={TRANSACTION_PAYMENT_OPTIONS}
              placeholder="Select Payment Type"
              disabled={isSubmitting}
              required
            />
          ) : (
            <FormInput<TransactionFormValues>
              name="title"
              control={control}
              label="Title"
              placeholder="Enter Bill Title"
              disabled={isSubmitting}
              required
            />
          )}
          <FormInput<TransactionFormValues>
            name="details"
            control={control}
            label={detailsLabel}
            placeholder={`Enter ${detailsLabel}`}
            disabled={isSubmitting}
          />
          <FormInput<TransactionFormValues>
            name="value"
            control={control}
            label="Amount"
            type="number"
            placeholder="Enter Amount"
            disabled={isSubmitting}
            startAdornment="৳"
            required
          />
          <FormInput<TransactionFormValues>
            name="date"
            control={control}
            type="date"
            placeholder="Date"
            disabled={isSubmitting}
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
