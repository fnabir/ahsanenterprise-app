import { FileTotals } from "@repo/types";
import { Card } from "@repo/ui";
import DataRow from "./data-row";

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

  const balanceTextStyle = data.balance > 0 ? "text-danger!" : "text-success!";

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="font-semibold pb-1 text-base">Total</div>
      {Object.entries(totalInfo).map(([key, value]) => (
        <DataRow key={key} label={key} value={value} valueType="currency" />
      ))}
      <DataRow
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
