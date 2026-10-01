import { AnimatedNumber, Card } from "../..";
import { cn } from "../../../../core/utils";

export function CardBalanceTotal({
  id,
  href,
  value,
  date,
  note,
  noteClassName = "",
  ...props
}: Omit<React.ComponentProps<typeof Card>, "children"> & {
  id: string;
  value: number;
  date?: string;
  note?: string;
  noteClassName?: string;
}) {
  return (
    <Card href={href ?? `/${id}-balance`} key={id} {...props}>
      <p className="text-lg capitalize font-medium mb-0 lg:mb-1">{id}</p>
      <AnimatedNumber
        value={Math.abs(value)}
        valueType="currency"
        className="text-2xl font-medium"
        currencyClassName="text-2xl"
      />
      {note ? (
        <div className={cn("text-muted font-semibold text-sm", noteClassName)}>
          {note}
        </div>
      ) : value > 0 ? (
        <div className="text-danger font-semibold text-sm">
          Outstanding Balance
        </div>
      ) : null}
      {date && <div className="text-muted text-sm mt-1">Updated {date}</div>}
    </Card>
  );
}
