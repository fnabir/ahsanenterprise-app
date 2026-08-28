"use client";

import { useFileDetails } from "../selectors/file-selectors";

export function useFile({ year, fileNo }: { year: string; fileNo: string }) {
  return useFileDetails(year, fileNo);
}
