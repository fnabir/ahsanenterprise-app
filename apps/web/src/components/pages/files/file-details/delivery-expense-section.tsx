import { useFileDetailsContext } from "@/contexts/FileDetailsContext";
import { MdOutlineEdit } from "react-icons/md";
import { Button, Card, DialogFileExpense, RowData } from "@repo/ui";

export default function DeliveryExpenseSection() {
  const { year, fileNo, data, totals } = useFileDetailsContext();
  const expenseData = data.delivery;
  const total = totals.delivery;

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="font-semibold text-base">Delivery Expense</div>
        <DialogFileExpense
          fileNo={fileNo}
          year={year}
          data={data}
          expenseType="delivery"
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
              main: "font-semibold text-[15px]",
              label: "text-foreground!",
            }}
          />
        </div>
      )}
    </Card>
  );
}
