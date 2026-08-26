import { Number, Card } from "../..";
import Link from "next/link";

export function CardBalanceTotal({
  id,
  href,
  value,
  date,
  className = "",
  note,
  noteClassName = "",
}: {
  id: string;
  href?: string;
  value: number;
  date?: string;
  className?: string;
  note?: string;
  noteClassName?: string;
}) {
  return (
    <Card className={"p-0!"} clickable>
      <Link
        href={href ?? `/${id}-balance`}
        key={id}
        className={`flex flex-col px-2 lg:px-4 py-1 lg:py-1.5 ${className}`}
      >
        <p className="text-lg capitalize font-medium mb-0 lg:mb-1">{id}</p>
        <Number
          value={Math.abs(value)}
          valueType="currency"
          className="text-2xl font-medium"
          currencyClassName="text-2xl"
        />
        {note ? (
          <div className={`text-muted font-semibold text-sm ${noteClassName}`}>
            {note}
          </div>
        ) : value > 0 ? (
          <div className="text-danger font-semibold text-sm">
            Outstanding Balance
          </div>
        ) : null}
        {date && <div className="text-muted text-sm mt-1">Updated {date}</div>}
      </Link>
    </Card>
  );
}
