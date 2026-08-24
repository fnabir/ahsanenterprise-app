"use client";

import { getCurrentYear, useFilesByYear, useYear } from "@repo/core";
import { CardFile } from "@repo/ui";

const currentYear = getCurrentYear();
const getYearsRange = (start = 2021, end = currentYear) =>
  Array.from({ length: end - start + 1 }, (_, i) => ({
    value: String(start + i),
  })).reverse();
const validYears = getYearsRange().map((y) => Number(y.value));

export default function FilesSection() {
  const { year } = useYear(validYears);
  const files = useFilesByYear(year);

  return (
    <div className="grow grid grid-cols-1 lg:grid-cols-5 gap-3">
      {Object.entries(files)
        .reverse()
        .map(([fileNo, data]) => (
          <CardFile key={fileNo} year={year} fileNo={fileNo} data={data} />
        ))}
    </div>
  );
}
