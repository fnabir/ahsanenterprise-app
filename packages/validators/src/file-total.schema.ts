import { z } from "zod";
import { optionalNonNegativeNumberField } from "./helpers";

export const FileTotalSchema = z.object({
  commission: optionalNonNegativeNumberField("Amount"),
  miscellaneous: optionalNonNegativeNumberField("Amount"),
  paid: optionalNonNegativeNumberField("Amount"),
  remarks: z.string().optional(),
});

export type FileTotalInput = z.input<typeof FileTotalSchema>;
export type FileTotalOutput = z.output<typeof FileTotalSchema>;
