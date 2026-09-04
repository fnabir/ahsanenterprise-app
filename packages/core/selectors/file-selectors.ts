"use client";

import { useMemo } from "react";
import { useFileStore } from "../stores/use-file-store";
import type { FileData, Files } from "@repo/types";
import { fromFileDbKey, toFileDbKey } from "../utils";

const EMPTY_YEARS: Array<{ year: string; count: number }> = [];
const EMPTY_YEAR_FILES: Record<string, FileData> = {};
const EMPTY_STATUS_COUNTS: Record<string, number> = {};
const EMPTY_GROUPED_FILES: Record<
  string,
  Array<{ year: string; fileNo: string; data: FileData }>
> = {};
const EMPTY_STATUS_FILES: Array<{
  year: string;
  fileNo: string;
  data: FileData;
}> = [];
const EMPTY_ALL_TOTALS = {
  duty: 0,
  port: 0,
  custom: 0,
  delivery: 0,
  other: 0,
  miscellaneous: 0,
  commission: 0,
  grandTotal: 0,
  paid: 0,
  balance: 0,
};

const normalizeYearFiles = (yearFiles?: Record<string, FileData> | null) => {
  if (!yearFiles) return EMPTY_YEAR_FILES;

  const normalized: Record<string, FileData> = {};

  for (const [dbKey, data] of Object.entries(yearFiles)) {
    normalized[fromFileDbKey(dbKey)] = data;
  }

  return normalized;
};

const getFileByAnyKey = (
  yearFiles: Record<string, FileData> | undefined,
  fileNo: string,
) => {
  if (!yearFiles) return null;

  return (
    yearFiles[fileNo] ??
    yearFiles[toFileDbKey(fileNo)] ??
    yearFiles[fromFileDbKey(fileNo)] ??
    null
  );
};

const sumExpenseValues = (
  data?:
    | Record<string, { value: number }>
    | Record<string, { percentage: number; value: number }>,
) => {
  if (!data) return 0;
  return Object.values(data).reduce((sum, item) => sum + (item.value ?? 0), 0);
};

export const useFileYears = () => {
  const file = useFileStore((s) => s.file);

  return useMemo(() => {
    if (!file) return EMPTY_YEARS;
    return Object.entries(file).map(([year, files]) => ({
      year,
      count: Object.keys(files).length,
    }));
  }, [file]);
};

export const useStatusCounts = () => {
  const file = useFileStore((s) => s.file);

  return useMemo(() => {
    if (!file) return EMPTY_STATUS_COUNTS;

    const counts: Record<string, number> = {};

    for (const year in file) {
      const yearFiles: Files = file[year];
      for (const fileNo in yearFiles) {
        const status = yearFiles[fileNo].status ?? "unknown";
        counts[status] = (counts[status] || 0) + 1;
      }
    }

    return counts;
  }, [file]);
};

export const useFilesGroupedByStatus = () => {
  const file = useFileStore((s) => s.file);

  return useMemo(() => {
    if (!file) return EMPTY_GROUPED_FILES;

    const grouped: Record<
      string,
      Array<{ year: string; fileNo: string; data: FileData }>
    > = {};

    for (const year in file) {
      const yearFiles: Files = file[year];
      for (const dbKey in yearFiles) {
        const data = yearFiles[dbKey];
        const status = data.status ?? "unknown";
        const fileNo = fromFileDbKey(dbKey);

        if (!grouped[status]) {
          grouped[status] = [];
        }

        grouped[status].push({ year, fileNo, data });
      }
    }

    return grouped;
  }, [file]);
};

export const useFilesByStatus = (status: string) => {
  const file = useFileStore((s) => s.file);

  return useMemo(() => {
    if (!file) return EMPTY_STATUS_FILES;

    const result: Array<{ year: string; fileNo: string; data: FileData }> = [];

    for (const year in file) {
      const yearFiles = file[year];
      for (const dbKey in yearFiles) {
        const data = yearFiles[dbKey];
        const fileNo = fromFileDbKey(dbKey);
        if ((data.status ?? "unknown") === status) {
          result.push({ year, fileNo, data });
        }
      }
    }

    return result;
  }, [file, status]);
};

export const useFileTotals = (year: string, fileNo: string) => {
  const data: FileData | null = useFileStore((s) =>
    getFileByAnyKey(s.file?.[year], fileNo),
  );

  return useMemo(() => {
    if (!data) return EMPTY_ALL_TOTALS;

    const totalData = data.total;
    const duty = totalData?.duty ?? sumExpenseValues(data.duty);
    const port = totalData?.port ?? sumExpenseValues(data.port);
    const custom = totalData?.custom ?? sumExpenseValues(data.custom);
    const delivery = totalData?.delivery ?? sumExpenseValues(data.delivery);
    const other = totalData?.other ?? sumExpenseValues(data.other);
    const miscellaneous = totalData?.miscellaneous ?? 0;
    const commission = totalData?.commission ?? 0;
    const grandTotal =
      (data.dutyPaid ? 0 : duty) +
      port +
      custom +
      delivery +
      other +
      miscellaneous +
      commission;
    const paid = data.paid ?? 0;

    return {
      duty,
      port,
      custom,
      delivery,
      other,
      miscellaneous,
      commission,
      grandTotal,
      paid,
      balance: grandTotal - paid,
    };
  }, [data]);
};

export const useFilesByYear = (year: string) => {
  const yearFiles = useFileStore((s) => s.file?.[year]);

  return useMemo(() => normalizeYearFiles(yearFiles), [yearFiles]);
};

export const useFileDetails: (
  year: string,
  fileNo: string,
) => FileData | null = (year: string, fileNo: string) =>
  useFileStore((s) => getFileByAnyKey(s.file?.[year], fileNo));

export const useFileLoading = () => useFileStore((s) => s.loading);

export const useFileError = () => useFileStore((s) => s.error);
