import { useFileDetailsContext } from "@/contexts/FileDetailsContext";
import { Card, RowData, Button } from "@repo/ui";
import { DialogFileExpense } from "@repo/ui";
import { MdOutlineEdit } from "react-icons/md";

export default function ExpenseSection({
  type,
}: {
  type: "port" | "custom" | "delivery" | "other";
}) {
  const { year, fileNo, data, totals } = useFileDetailsContext();
  const expenseData = data[type];
  const total = totals[type];

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="font-semibold text-base capitalize">{type} Expense</div>
        <DialogFileExpense
          fileNo={fileNo}
          year={year}
          data={data}
          expenseType={type}
        >
          <Button
            variant="outline"
            Icon={
              <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
            }
          />
        </DialogFileExpense>
      </div>
      {!expenseData || Object.keys(expenseData).length === 0 ? (
        <div className="flex justify-center items-center h-full py-2">
          No data found.
        </div>
      ) : (
        <div className="flex flex-col divide-y-2">
          {Object.entries(expenseData).map(([key, value]) => (
            <RowData
              key={key}
              label={value.details}
              value={value.value}
              valueType="currency"
            />
          ))}
          <RowData
            label="Total"
            value={total}
            valueType="currency"
            className={{
              label: "text-foreground! font-semibold text-[15px]",
              value: "font-semibold text-[15px]",
            }}
          />
        </div>
      )}
    </Card>
  );
}
