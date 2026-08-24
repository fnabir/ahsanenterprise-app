import { Card } from "../..";
import { Number } from "../../animated/number";
import Link from "next/link";
import { getCurrentYear } from "@repo/core";

export function CardFilesTotal({
  year,
  count,
  className = "",
}: {
  year: number;
  count: number;
  className?: string;
}) {
  const href = year === getCurrentYear() ? `/files` : `/files?year=${year}`;
  return (
    <Link href={href} className="w-full">
      <Card
        className={`flex gap-2 justify-between items-center font-mono ${className}`}
        clickable
      >
        <div>
          <div className="text-muted">YEAR</div>
          <div className="text-3xl font-bold">{year}</div>
        </div>
        <div>
          <div className="text-muted">Files</div>
          <Number
            className="text-2xl font-semibold flex justify-end"
            value={count}
          />
        </div>
      </Card>
    </Link>
  );
}
