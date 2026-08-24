import { FileData, FileTotals } from "@repo/types";
import { Card, Number } from "@repo/ui";
import DataRow from "./data-row";

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
          className: "danger",
        }
      : totals.balance < 0
        ? {
            title: "OVERPAID BALANCE",
            className: "warning",
          }
        : {
            title: "BALANCE",
            className: "success",
          };

  const isValuesAvailable = data.cnfValue || data.assessableValue;
  const isDatesAvailable =
    data.assessmentDate || data.dutyPaymentDate || data.deliveryDate;

  const values = {
    "C&F": { value: data.cnfValue, currency: "$" },
    Assessable: { value: data.assessableValue, currency: "৳" },
  };

  const dates = {
    Assessment: data.assessmentDate,
    "Duty Payment": data.dutyPaymentDate,
    Delivery: data.deliveryDate,
  };

  return (
    <div className="col-span-12 grid grid-cols-3 gap-4">
      <Card
        className={`px-2! bg-${balance.className}-subtle! border-${balance.className} flex flex-col gap-2 items-start justify-center`}
      >
        <div className={`font-bold text-${balance.className}`}>
          {balance.title}
        </div>
        <Number
          value={totals.balance}
          fractionDigits={2}
          valueType="currency"
          className={`text-3xl font-bold text-${balance.className}`}
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
        <Card className="flex flex-col gap-2 justify-center text-center px-2!">
          {Object.entries(values).map(([key, data]) => (
            <DataRow
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
        <Card className="flex flex-col justify-center text-center px-2!">
          {Object.entries(dates).map(([key, value]) => (
            <DataRow key={key} label={`${key} Date`} value={value} />
          ))}
        </Card>
      ) : null}
      <div className="col-span-12 flex gap-2 text-sm">
        <div className="font-semibold text-muted">Remarks:</div>
        <pre>{data.remarks}</pre>
      </div>
    </div>
  );
}
