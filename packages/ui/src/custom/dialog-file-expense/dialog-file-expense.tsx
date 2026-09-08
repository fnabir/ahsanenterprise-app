"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  FileExpenseSchema,
  FileExpenseFormInput,
  FileExpenseFormOutput,
  expensesRecordToArray,
  expensesArrayToRecord,
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
  Label,
} from "../..";
import { FileData } from "@repo/types";
import { getFullFileNo } from "@repo/core";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFileExpense } from "@repo/firebase";
import { FaPlus, FaTimes } from "react-icons/fa";

export function DialogFileExpense({
  children,
  year,
  fileNo,
  data,
  expenseType,
}: {
  children: ReactElement;
  year: string;
  fileNo: string;
  data?: FileData;
  expenseType: "port" | "custom" | "delivery" | "other";
}) {
  const [open, setOpen] = useState(false);
  const expenseRecord = data?.[expenseType] || {};

  const defaultValues: FileExpenseFormInput = {
    expenses: expensesRecordToArray(expenseRecord),
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FileExpenseFormInput, any, FileExpenseFormOutput>({
    resolver: zodResolver(FileExpenseSchema),
    defaultValues,
  });

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "expenses",
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open]);

  const onSubmit = async (formData: FileExpenseFormOutput) => {
    await updateFileExpense(
      fileNo,
      year,
      expenseType,
      expensesArrayToRecord(formData.expenses),
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>{getFullFileNo(fileNo, year)}</DialogTitle>
          <DialogDescription>
            Update the expenses for this file.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {fields.length > 0 && (
            <div className="flex gap-2 px-1">
              <Label text="Label" className="grow" />
              <Label text="Amount" className="max-w-1/4" />
              <div className="w-24" />
            </div>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <FormInput
                name={`expenses.${index}.details`}
                control={control}
                placeholder="Expense label"
                disabled={isSubmitting}
                className="grow"
              />
              <FormInput
                name={`expenses.${index}.value`}
                control={control}
                type="number"
                allowDecimal
                placeholder="Amount"
                disabled={isSubmitting}
                className="max-w-1/4"
                startAdornment="৳"
              />
              <div className="flex gap-1 pt-2">
                <button
                  type="button"
                  onClick={() => insert(index, { details: "", value: "" })}
                  disabled={isSubmitting}
                  className="text-muted hover:text-primary"
                  aria-label="Insert expense below this row"
                >
                  <FaPlus size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={isSubmitting}
                  className="text-muted hover:text-danger"
                  aria-label="Discard this expense"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="subtle"
            label="Add"
            Icon={<FaPlus />}
            onClick={() => append({ details: "", value: "" })}
            disabled={isSubmitting}
            className="max-w-22 w-full mb-2 mx-auto"
          />
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
