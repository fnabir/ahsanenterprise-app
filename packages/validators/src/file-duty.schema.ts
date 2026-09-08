import { z } from "zod";
import { optionalNonNegativeNumberField } from "./helpers";

const DutySchema = z
  .object({
    percentage: optionalNonNegativeNumberField("Percentage"),
    value: optionalNonNegativeNumberField("Value"),
  })
  .refine(
    (data) => {
      if (!data.percentage || data.percentage === 0) return true;

      return data.value !== undefined && data.value > 0;
    },
    {
      message: "Value must be set when percentage is greater than 0.",
      path: ["value"],
    },
  );

const DutyValueSchema = z.object({
  value: optionalNonNegativeNumberField("Value"),
});

export const FileDutySchema = z.object({
  assessmentRef: optionalNonNegativeNumberField("Assessment reference"),
  dutyRef: optionalNonNegativeNumberField("Release Order No"),
  CD: DutySchema,
  RD: DutySchema,
  SD: DutySchema,
  VAT: DutySchema,
  AIT: DutySchema,
  AT: DutySchema,
  DF: DutyValueSchema,
  total: optionalNonNegativeNumberField("Total Duty"),
  dutyPaid: z.string().optional(),
});

export type FileDutyFormInput = z.input<typeof FileDutySchema>;
export type FileDutyFormOutput = z.output<typeof FileDutySchema>;
