"use client";

import { useFileDetails } from "../selectors/fileSelectors";

export function useFile({ year, fileNo }: { year: string; fileNo: string }) {
  return useFileDetails(year, fileNo);
}
