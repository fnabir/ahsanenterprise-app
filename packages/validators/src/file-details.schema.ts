import { z } from "zod";
import { FileInfoSchema } from "./file-info.schema";
import { optionalNonNegativeNumberField } from "./helpers";

export const FileDetailsSchema = FileInfoSchema.extend({
  itemCount: optionalNonNegativeNumberField("Item count"),
  cnfValue: optionalNonNegativeNumberField("Amount"),
  assessableValue: optionalNonNegativeNumberField("Amount"),
  vessel: z.string().optional(),
  beDate: z.string().optional(),
  assessmentDate: z.string().optional(),
  dutyPaymentDate: z.string().optional(),
  deliveryDate: z.string().optional(),
  note: z.string().optional(),
});

export type FileDetailsFormInput = z.input<typeof FileDetailsSchema>;
export type FileDetailsFormOutput = z.output<typeof FileDetailsSchema>;
