import { z } from "zod";
import { nonNegativeNumberField } from "./helpers";
import { EXPENSE_KEY_PREFIX } from "../../core";

export const ExpenseRowSchema = z.object({
  details: z.string().trim().nonempty("Label is required"),
  value: nonNegativeNumberField("Amount"),
});

export const FileExpenseSchema = z.object({
  expenses: z.array(ExpenseRowSchema),
});

export type ExpenseRowInput = z.input<typeof ExpenseRowSchema>;
export type ExpenseRowOutput = z.output<typeof ExpenseRowSchema>;
export type FileExpenseFormInput = z.input<typeof FileExpenseSchema>;
export type FileExpenseFormOutput = z.output<typeof FileExpenseSchema>;

export function expensesArrayToRecord(
  expenses: ExpenseRowOutput[],
): Record<string, ExpenseRowOutput> {
  return Object.fromEntries(
    expenses.map((row, index) => [`${EXPENSE_KEY_PREFIX}${index + 1}`, row]),
  );
}

export function expensesRecordToArray(
  record?: Record<string, { details: string; value: number }> | null,
): ExpenseRowInput[] {
  if (!record) return [];

  return Object.keys(record)
    .sort((a, b) => {
      const numA = Number(a.replace(/^\D+/, ""));
      const numB = Number(b.replace(/^\D+/, ""));
      return numA - numB;
    })
    .map((key) => {
      const row = record[key]!;
      return { details: row.details, value: String(row.value) };
    });
}
