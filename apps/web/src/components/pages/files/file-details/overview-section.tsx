import { useFileDetailsContext } from "@/contexts/FileDetailsContext";
import { Button, Card, DialogFileTotal, Number, RowData } from "@repo/ui";
import { MdOutlineEdit } from "react-icons/md";

export default function OverviewSection() {
  const { year, fileNo, data, totals } = useFileDetailsContext();

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

  const isValuesAvailable =
    data.cnfValue ||
    data.assessableValue ||
    data.miscellaneous ||
    data.commission;
  const isDatesAvailable =
    data.assessmentDate || data.dutyPaymentDate || data.deliveryDate;

  const values = {
    "C&F Value": { value: data.cnfValue, currency: "$" },
    "Assessable Value": { value: data.assessableValue, currency: "৳" },
    Miscellaneous: { value: totals.miscellaneous, currency: "৳" },
    Commission: { value: totals.commission, currency: "৳" },
  };

  const dates = {
    Assessment: data.assessmentDate,
    "Duty Payment": data.dutyPaymentDate,
    Delivery: data.deliveryDate,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <Card
        className={`px-2! flex flex-col gap-2 items-start justify-center ${balance.cardClassName}`}
      >
        <div className="w-full flex justify-between items-center gap-2">
          <div className={`font-bold ${balance.textClassName}`}>
            {balance.title}
          </div>
          <DialogFileTotal fileNo={fileNo} year={year} data={data}>
            <Button
              variant="outline"
              Icon={
                <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
              }
            />
          </DialogFileTotal>
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
        <Card className="flex flex-col justify-center text-center px-2! text-sm divide-y-2">
          {Object.entries(values).map(([key, data]) => (
            <RowData
              key={key}
              label={key}
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
      {data.remarks && (
        <div className="lg:col-span-3 flex gap-2 text-sm">
          <div className="hidden md:block font-semibold text-muted">
            Remarks:
          </div>
          <pre className="whitespace-pre-wrap wrap-break-word">
            {data.remarks}
          </pre>
        </div>
      )}
    </div>
  );
}
