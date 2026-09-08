import { useFileDetailsContext } from "@/contexts/FileDetailsContext";
import { FileTotals } from "@repo/types";
import { Card, RowData } from "@repo/ui";

export default function TotalSection() {
  const { totals } = useFileDetailsContext();
  const totalInfo = {
    Duty: totals.duty,
    Port: totals.port,
    Custom: totals.custom,
    Delivery: totals.delivery,
    Other: totals.other,
    Miscellaneous: totals.miscellaneous,
    Commission: totals.commission,
    Total: totals.grandTotal,
    Paid: totals.paid,
  };

  const isAllZero = Object.values(totalInfo).every((value) => value === 0);
  if (isAllZero) {
    return null;
  }

  const balanceTextStyle =
    totals.balance > 0 ? "text-danger!" : "text-success!";

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="font-semibold pb-1 text-base">Total</div>
      {Object.entries(totalInfo).map(([key, value]) => (
        <RowData key={key} label={key} value={value} valueType="currency" />
      ))}
      <RowData
        label="Balance"
        value={totals.balance}
        valueType="currency"
        className={{
          label: "font-bold " + balanceTextStyle,
          value: "font-bold " + balanceTextStyle,
        }}
      />
    </Card>
  );
}
