"use client";

import { useMemo } from "react";
import type { RequisitionData } from "@repo/types";
import { useRequisitionStore } from "../stores/use-requisition-store";
import { fromRequisitionDbKey, toRequisitionDbKey } from "../utils";

const EMPTY_YEARS: Array<{ year: string; count: number }> = [];
const EMPTY_YEAR_REQUISITIONS: Record<string, RequisitionData> = {};

const normalizeYearRequisitions = (
  yearFiles?: Record<string, RequisitionData> | null,
) => {
  if (!yearFiles) return EMPTY_YEAR_REQUISITIONS;

  const normalized: Record<string, RequisitionData> = {};

  for (const [dbKey, data] of Object.entries(yearFiles)) {
    const raw = fromRequisitionDbKey(dbKey);
    const num = String(parseInt(raw, 10));
    normalized[num] = data;
  }

  return normalized;
};

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

export const useRequisitionsByYear = (year: string) => {
  const yearFiles = useRequisitionStore(
    (s) => s.requisition?.[year] ?? EMPTY_YEAR_REQUISITIONS,
  );

  return useMemo(() => normalizeYearRequisitions(yearFiles), [yearFiles]);
};

export const useRequisitionDetails: (
  year: string,
  requisitionNo: string,
) => RequisitionData | null = (year: string, requisitionNo: string) => {
  return useRequisitionStore(
    (s) => s.requisition?.[year]?.[toRequisitionDbKey(requisitionNo)] ?? null,
  );
};

export const useRequisitionLoading = () =>
  useRequisitionStore((s) => s.loading);

export const useRequisitionError = () => useRequisitionStore((s) => s.error);
