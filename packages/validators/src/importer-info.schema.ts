import { z } from "zod";
import { optionalNonNegativeNumberField } from "./helpers";

export const ImporterInfoSchema = z.object({
  name: z.string("Name is required"),
  address1: z.string("Address is required"),
  address2: z.string().optional(),
  address3: z.string().optional(),
  commission: optionalNonNegativeNumberField("Commission"),
  minCommission: optionalNonNegativeNumberField("Minimum commission"),
  miscExpense: optionalNonNegativeNumberField("Miscellaneous expenses"),
});

export type ImporterInfoFormInput = z.input<typeof ImporterInfoSchema>;
export type ImporterInfoFormOutput = z.output<typeof ImporterInfoSchema>;
