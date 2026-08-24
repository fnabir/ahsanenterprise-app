import { Card, Number } from "../..";

export function CardTotal({
  label,
  value,
  date,
}: {
  label?: string;
  value?: number;
  date?: string;
}) {
  return (
    <Card className="flex font-semibold text-xl mx-2 lg:mx-4 my-2 lg:my-4 justify-between items-center px-2! lg:px-4! py-1! lg:py-1.5!">
      <div>
        <div>{label ?? "Total Balance"}</div>
        {date && (
          <div className="text-muted font-normal text-sm">{`Updated ${date}`}</div>
        )}
      </div>
      <Number value={value || 0} valueType="currency" />
    </Card>
  );
}
