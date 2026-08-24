import { Number, Card } from "../..";
import Link from "next/link";

export function CardBalanceTotal({
  id,
  value,
  date,
  className = "",
}: {
  id: string;
  value: number;
  date?: string;
  className?: string;
}) {
  return (
    <Link href={`/${id}-balance`} key={id}>
      <Card className={className} clickable>
        <p className="text-lg capitalize font-medium mb-0 lg:mb-1">{id}</p>
        <Number
          value={Math.abs(value)}
          valueType="currency"
          className="text-2xl font-medium"
          currencyClassName="text-2xl"
        />
        {value > 0 && (
          <div className="text-danger text-sm">Outstanding Balance</div>
        )}
        {date && <div className="text-muted text-sm mt-1">Updated {date}</div>}
      </Card>
    </Link>
  );
}
