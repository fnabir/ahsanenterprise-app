"use client";

import { Card, Skeleton } from "@repo/ui";
import Link from "next/link";
import { useRequisitionLoading, useRequisitionYears } from "@repo/core";

export default function RequisitionSection() {
  const loading = useRequisitionLoading();
  const years = useRequisitionYears().reverse();

  if (loading) {
    return (
      <Skeleton>
        <h3 className="text-center font-semibold bg-transparent!">
          P/O Requisition
        </h3>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full h-3" />
        ))}
      </Skeleton>
    );
  }

  return (
    <Link href="/requisition">
      <Card className="px-2! space-y-2" clickable>
        <h3 className="text-center font-semibold">P/O Requisition</h3>
        <div className="flex flex-col gap-2 items-center justify-center divide-y-2 text-sm">
          {years.map(({ year, count }) => (
            <div
              key={year}
              className="w-full flex items-center justify-between gap-2"
            >
              <div>{year}</div>
              <div>{count}</div>
            </div>
          ))}
        </div>
      </Card>
    </Link>
  );
}
