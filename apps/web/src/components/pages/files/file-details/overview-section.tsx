import { FileData, FileTotals } from "@repo/types";
import { Card, Number, RowData } from "@repo/ui";

export default function OverviewSection({
  data,
  totals,
}: {
  data: FileData;
  totals: FileTotals;
}) {
  const balance =
    totals.balance > 0
      ? {
          title: "OUTSTANDING BALANCE",
          cardClassName: "bg-danger-subtle! border-danger",
          textClassName: `text-danger`,
        }
      : totals.balance < 0
        ? {
            title: "OVERPAID BALANCE",
            cardClassName: "bg-warning-subtle! border-warning",
            textClassName: `text-warning`,
          }
        : {
            title: "BALANCE",
            cardClassName: "bg-success-subtle! border-success",
            textClassName: `text-success`,
          };

  const isValuesAvailable = data.cnfValue || data.assessableValue;
  const isDatesAvailable =
    data.assessmentDate || data.dutyPaymentDate || data.deliveryDate;

  const values = {
    "C&F": { value: data.cnfValue, currency: "$" },
    Assessable: { value: data.assessableValue, currency: "৳" },
    Duty: { value: totals.duty, currency: "৳" },
  };

  const dates = {
    Assessment: data.assessmentDate,
    "Duty Payment": data.dutyPaymentDate,
    Delivery: data.deliveryDate,
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-2">
      <Card
        className={`px-2! flex flex-col gap-2 items-start justify-center ${balance.cardClassName}`}
      >
        <div className={`font-bold ${balance.textClassName}`}>
          {balance.title}
        </div>
        <Number
          value={totals.balance}
          fractionDigits={2}
          valueType="currency"
          className={`text-3xl font-bold ${balance.textClassName}`}
        />
        <div className="flex items-center gap-2 mt-2 text-sm">
          Total
          <Number
            value={totals.grandTotal}
            fractionDigits={2}
            valueType="currency"
            className={"text-foreground"}
          />
          • Paid
          <Number
            value={totals.paid}
            fractionDigits={2}
            valueType="currency"
            className={"font-bold text-success"}
          />
        </div>
      </Card>

      {isValuesAvailable ? (
        <Card className="flex flex-col gap-2 justify-center text-center px-2! text-sm divide-y-2">
          {Object.entries(values).map(([key, data]) => (
            <RowData
              key={key}
              label={`${key} Value`}
              value={data.value}
              valueType="currency"
              currency={data.currency}
            />
          ))}
        </Card>
      ) : null}
      {isDatesAvailable ? (
        <Card className="flex flex-col justify-center text-center px-2! text-sm divide-y-2">
          {Object.entries(dates).map(([key, value]) => (
            <RowData key={key} label={`${key} Date`} value={value} />
          ))}
        </Card>
      ) : null}
      <div className="col-span-3 flex gap-2 text-sm">
        <div className="font-semibold text-muted">Remarks:</div>
        <pre>{data.remarks}</pre>
      </div>
    </div>
  );
}
