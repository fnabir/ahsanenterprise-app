"use client";

import {
  getCurrentYear,
  useRequisitionError,
  useRequisitionLoading,
  useRequisitionsByYear,
  useYear,
} from "@repo/core";
import Loading from "@/components/loading";
import { CardRequisition } from "@repo/ui";

const currentYear = getCurrentYear();
const getYearsRange = (start = 2021, end = currentYear) =>
  Array.from({ length: end - start + 1 }, (_, i) => ({
    value: String(start + i),
  })).reverse();
const validYears = getYearsRange().map((y) => Number(y.value));

export default function RequisitionSection() {
  const loading = useRequisitionLoading();
  const error = useRequisitionError();

  const { year } = useYear(validYears);
  const requisitions = useRequisitionsByYear(year);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="font-semibold">Error</div>
        <div className="text-muted">{error}</div>
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto pt-1.5 lg:pt-3 pb-2 lg:pb-4 px-2 lg:px-4">
      <div className="grow grid grid-cols-1 lg:grid-cols-5 gap-3">
        {Object.entries(requisitions)
          .reverse()
          .map(([requisitionNo, data]) => (
            <CardRequisition
              key={requisitionNo}
              year={year}
              requisitionNo={requisitionNo}
              data={data}
            />
          ))}
      </div>
    </div>
  );
}
