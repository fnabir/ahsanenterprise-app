import { z } from "zod";

export const ImporterInfoSchema = z.object({
  name: z.string("Name is required"),
  address1: z.string("Address is required"),
  address2: z.string().optional(),
  address3: z.string().optional(),
  commission: z.number().min(0, "Commission cannot be negative").optional(),
  minCommission: z
    .number()
    .min(0, "Minimum commission cannot be negative")
    .optional(),
  miscExpense: z
    .number()
    .min(0, "Miscellaneous expenses cannot be negative")
    .optional(),
});

export type ImporterInfoFormValues = z.infer<typeof ImporterInfoSchema>;
