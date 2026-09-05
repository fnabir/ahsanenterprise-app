import { z } from "zod";

export const TransactionSchema = z.object({
  title: z
    .string("Transaction type is required")
    .trim()
    .min(1, "Transaction type is required"),
  details: z.string().optional(),
  date: z.string("Date is required").trim().min(1, "Date is required"),
  value: z.number("Amount is required").positive("Amount cannot be 0 or less"),
});

export type TransactionFormValues = z.infer<typeof TransactionSchema>;
