import { FileData, FileTotals } from "@repo/types";
import { createContext, useContext } from "react";

interface FileDetailsContextType {
  year: string;
  fileNo: string;
  data: FileData;
  totals: FileTotals;
}

const FileDetailsContext = createContext<FileDetailsContextType | null>(null);

export const useFileDetailsContext = () => {
  const ctx = useContext(FileDetailsContext);
  if (!ctx)
    throw new Error("useFileDetailsContext must be used inside provider");
  return ctx;
};

export const FileDetailsProvider = FileDetailsContext.Provider;
