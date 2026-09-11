import { useRequisitionDetailsContext } from "@/contexts/RequisitionDetailsContext";
import { RequisitionFile } from "@repo/types";
import { Number } from "@repo/ui";
import { REQUISITION_EXPENSE_FIELDS } from "@repo/core";

export interface RequisitionExpense extends RequisitionFile {
  fileNo: string;
  itemName?: string;
  lc?: string | null;
  duty?: number;
}

export const shouldShowRow = (
  key: keyof RequisitionExpense,
  data: RequisitionExpense[],
) => {
  return data.some((expense) => {
    const value = expense[key];
    return value !== undefined && value !== null && value !== 0;
  });
};

export default function ExpenseSection() {
  const { expenses, subtotalPerFile, total } = useRequisitionDetailsContext();
  if (!expenses?.length) return null;

  return (
    <table className="w-full border-collapse text-xs my-4">
      <tbody>
        {REQUISITION_EXPENSE_FIELDS.map(({ label, key }) => {
          if (!shouldShowRow(key as keyof RequisitionExpense, expenses)) {
            return null;
          }
          return (
            <tr key={key}>
              <th className="border border-foreground px-2 py-1 text-left">
                {label}
              </th>

              {expenses.map((expense) => {
                const value = expense[key as keyof RequisitionExpense];
                const isCurrency =
                  REQUISITION_EXPENSE_FIELDS.find((field) => field.key === key)
                    ?.isCurrency && typeof value === "number";
                return (
                  <td
                    key={expense.fileNo + "-" + key}
                    className={`border border-foreground px-2 py-1 ${key === "itemName" ? "font-bold" : ""} text-center`}
                  >
                    {isCurrency ? (
                      <Number
                        value={value ?? 0}
                        valueType="currency"
                        fractionDigits={2}
                        currency="TK."
                        currencyClassName="w-full text-start"
                        valueClassName="font-sans"
                      />
                    ) : (
                      (expense[key as keyof RequisitionExpense] ?? "—")
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <tr>
          <th className="border border-foreground px-2 py-1 text-left font-bold">
            Subtotal
          </th>

          {subtotalPerFile.map((total, idx) => (
            <td
              key={"subtotal-" + idx}
              className="border border-foreground px-2 py-1 text-end font-bold"
            >
              <Number
                value={total}
                valueType="currency"
                fractionDigits={2}
                currency="TK."
                currencyClassName="w-full text-start"
                valueClassName="font-sans"
              />
            </td>
          ))}
        </tr>

        <tr>
          <th className="border border-foreground px-2 py-1 text-left font-bold">
            Total
          </th>

          <td
            colSpan={expenses.length - 1}
            className="border-b border-foreground"
          />
          <td className="border-b border-r border-foreground px-2 py-1 text-end font-bold">
            <Number
              value={total}
              valueType="currency"
              fractionDigits={2}
              currency="TK."
              currencyClassName="w-full text-start"
              valueClassName="font-sans"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
