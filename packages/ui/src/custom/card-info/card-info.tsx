import { Card } from "../../core";

export function CardInfo({
  title,
  details,
  Icon,
  className,
}: {
  title: string;
  details?: string;
  Icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={`flex flex-row items-center gap-4 hover:border-border! hover:cursor-default! ${className ?? ""}`}
    >
      {Icon && <div className="shrink-0">{Icon}</div>}
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted">{details}</p>
      </div>
    </Card>
  );
}
