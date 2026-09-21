"use client";

import { RequisitionExpense } from "@repo/types";
import { requisitionFileExpense } from "@repo/firebase";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../core/dialog";
import { Button } from "../../core/button";
import {
  RequisitionExpenseFormInput,
  RequisitionExpenseFormOutput,
  RequisitionExpenseFormSchema,
} from "@repo/validators";
import { FormInput } from "../../form-field";

export function DialogRequisitionExpense({
  year,
  requisitionNo,
  fileNo,
  itemName,
  expense,
}: {
  year: string;
  requisitionNo: string;
  fileNo: string;
  itemName: string;
  expense?: RequisitionExpense;
}) {
  const [open, setOpen] = useState(false);

  const defaultValues = useMemo(() => {
    return {
      port: expense?.port ? expense.port.toString() : "",
      noc: expense?.noc ? expense.noc.toString() : "",
      examine: expense?.examine ? expense.examine.toString() : "",
      section: expense?.section ? expense.section.toString() : "",
      labour: expense?.labour ? expense.labour.toString() : "",
      truck: expense?.truck ? expense.truck.toString() : "",
      assessment: expense?.assessment ? expense.assessment.toString() : "",
    };
  }, [expense]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RequisitionExpenseFormInput, any, RequisitionExpenseFormOutput>({
    resolver: zodResolver(RequisitionExpenseFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: RequisitionExpenseFormOutput) => {
    await requisitionFileExpense(year, requisitionNo, fileNo, formData);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="subtle"
            Icon="৳"
            label={itemName}
            aria-label={`Dialog for ${itemName} requisition expense`}
          />
        }
      />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>{itemName}</DialogTitle>
          <DialogDescription>
            Update the requisition expense for this item.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-2"
        >
          <FormInput
            control={control}
            name="port"
            label="Port Charge"
            type="number"
            startAdornment="৳"
          />
          <FormInput
            control={control}
            name="noc"
            label="NOC"
            type="number"
            startAdornment="৳"
          />
          <FormInput
            control={control}
            name="examine"
            label="Examine for Lab Test"
            type="number"
            startAdornment="৳"
          />
          <FormInput
            control={control}
            name="section"
            label="Section Change"
            type="number"
            startAdornment="৳"
          />
          <FormInput
            control={control}
            name="labour"
            label="Labour"
            type="number"
            startAdornment="৳"
          />
          <FormInput
            control={control}
            name="truck"
            label="Truck"
            type="number"
            startAdornment="৳"
          />
          <FormInput
            control={control}
            name="assessment"
            label="Assessment/Delivery"
            type="number"
            startAdornment="৳"
          />
        </form>

        <DialogFooter>
          <Button
            variant="primary"
            label="Update"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full max-w-22"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
