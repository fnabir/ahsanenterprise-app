"use client";

import { useMemo } from "react";
import type { FileData, RequisitionData } from "@repo/types";
import { useRequisitionStore } from "../stores/use-requisition-store";

const EMPTY_YEARS: Array<{ year: string; count: number }> = [];
const EMPTY_YEAR_REQUISITIONS: Record<string, FileData> = {};

export const useRequisitionYears = () => {
  const requisition = useRequisitionStore((s) => s.requisition);

  return useMemo(() => {
    if (!requisition) return EMPTY_YEARS;
    return Object.entries(requisition).map(([year, files]) => ({
      year,
      count: Object.keys(files).length,
    }));
  }, [requisition]);
};

export const useRequisitionsByYear = (year: string) =>
  useRequisitionStore((s) => s.requisition?.[year] ?? EMPTY_YEAR_REQUISITIONS);

export const useRequisitionDetails: (
  year: string,
  requisitionNo: string,
) => RequisitionData | null = (year: string, requisitionNo: string) => {
  return useRequisitionStore(
    (s) => s.requisition?.[year]?.[requisitionNo] ?? null,
  );
};

export const useRequisitionLoading = () =>
  useRequisitionStore((s) => s.loading);

export const useRequisitionError = () => useRequisitionStore((s) => s.error);
