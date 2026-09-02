import { useMemo } from "react";
import type { ImporterData } from "@repo/types";
import { useImporterStore } from "../stores/use-importer-store";

const EMPTY_IMPORTER_LIST: Array<{ value: string }> = [];
const EMPTY_IMPORTER: Record<string, ImporterData> = {};

export const useImporterLoading = () => useImporterStore((s) => s.loading);

export const useImporterError = () => useImporterStore((s) => s.error);

export const useImporterData = () =>
  useImporterStore((s) => s.importer ?? EMPTY_IMPORTER);

export const useImporterList = () => {
  const importer = useImporterStore((s) => s.importer);

  return useMemo(() => {
    if (!importer) return EMPTY_IMPORTER_LIST;

    return Object.keys(importer).map((key) => ({
      value: key,
    }));
  }, [importer]);
};
