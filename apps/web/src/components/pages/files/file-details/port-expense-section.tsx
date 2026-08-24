import { FileData } from "@repo/types";
import { Card } from "@repo/ui";
import DataRow from "./data-row";

export default function PortExpenseSection({
  data,
  total,
}: {
  data: FileData;
  total: number;
}) {
  const expenseData = data.port;

  if (!expenseData || Object.keys(expenseData).length === 0) {
    return null;
  }

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="font-semibold pb-1 text-base">Port Expense</div>
      {Object.entries(expenseData).map(([key, value]) => (
        <DataRow
          key={key}
          label={value.details}
          value={value.value}
          valueType="currency"
        />
      ))}
      <DataRow
        label="Total"
        value={total}
        valueType="currency"
        className={{
          main: "font-semibold text-[15px]",
          label: "text-foreground!",
        }}
      />
    </Card>
  );
}
