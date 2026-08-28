import { FileTotals } from "@repo/types";
import { Card, RowData } from "@repo/ui";

export default function TotalSection({ data }: { data: FileTotals }) {
  const totalInfo = {
    Duty: data.duty,
    Port: data.port,
    Custom: data.custom,
    Delivery: data.delivery,
    Other: data.other,
    Miscellaneous: data.miscellaneous,
    Commission: data.commission,
    Total: data.grandTotal,
    Paid: data.paid,
  };

  const isAllZero = Object.values(totalInfo).every((value) => value === 0);
  if (isAllZero) {
    return null;
  }

  const balanceTextStyle = data.balance > 0 ? "text-danger!" : "text-success!";

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="font-semibold pb-1 text-base">Total</div>
      {Object.entries(totalInfo).map(([key, value]) => (
        <RowData key={key} label={key} value={value} valueType="currency" />
      ))}
      <RowData
        label="Balance"
        value={data.balance}
        valueType="currency"
        className={{
          main: `font-bold ${balanceTextStyle}`,
          label: balanceTextStyle,
        }}
      />
    </Card>
  );
}
