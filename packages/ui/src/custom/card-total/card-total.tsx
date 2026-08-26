import { Card, Number } from "../..";

export function CardTotal({
  label,
  value,
  date,
  note,
  noteClassName,
}: {
  label?: string;
  value?: number;
  date?: string;
  note?: string;
  noteClassName?: string;
}) {
  return (
    <div className="px-2 lg:px-4 py-1.5 lg:py-3">
      <Card className="flex font-semibold text-xl justify-between items-center py-1! lg:py-1.5!">
        <div>
          <div>{label ?? "Total Balance"}</div>
          {date && (
            <div className="text-muted font-normal text-sm">{`Updated ${date}`}</div>
          )}
        </div>
        <div className="place-items-end">
          <Number
            value={value || 0}
            valueType="currency"
            signMode={note ? "" : "-"}
          />
          {note && (
            <div
              className={`text-muted font-semibold text-sm ${noteClassName}`}
            >
              {note}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
