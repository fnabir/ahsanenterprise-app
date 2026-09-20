import { z } from "zod";
import { numberField, optionalNonNegativeNumberField } from "./helpers";

export const RequisitionInfoFormSchema = z.object({
  ref: numberField("Reference"),
  files: z
    .array(z.string().nonempty("Required"))
    .min(1, "Select at least one file")
    .max(4, "Maximum 4 files"),
  letter: z.string().nonempty("Date is required"),
  arrival: z.string().nonempty("Arrival date is required"),
  delivery: z.string().nonempty("Delivery date is required"),
});

export type RequisitionInfoFormInput = z.input<
  typeof RequisitionInfoFormSchema
>;
export type RequisitionInfoFormOutput = z.output<
  typeof RequisitionInfoFormSchema
>;

export const RequisitionChargeFormSchema = z.object({
  port: optionalNonNegativeNumberField("Port Expense"),
  noc: optionalNonNegativeNumberField("NOC Expense"),
  examine: optionalNonNegativeNumberField("Examine Expense"),
  section: optionalNonNegativeNumberField("Section Expense"),
  labour: optionalNonNegativeNumberField("Labour Expense"),
  truck: optionalNonNegativeNumberField("Truck Expense"),
  assessment: optionalNonNegativeNumberField("Assessment Expense"),
});

export type RequisitionExpenseFormInput = z.input<
  typeof RequisitionChargeFormSchema
>;
export type RequisitionExpenseFormOutput = z.output<
  typeof RequisitionChargeFormSchema
>;
