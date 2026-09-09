"use client";

import { BadgeFileStatus } from "@repo/ui";
import { FaInfoCircle } from "react-icons/fa";
import {
  getFullFileNo,
  useFileDetails,
  useFileError,
  useFileLoading,
  useFileTotals,
} from "@repo/core";
import InfoSection from "./info-section";
import DutySection from "./duty-section";
import ExpenseSection from "./expense-section";
import TotalSection from "./total-section";
import OverviewSection from "./overview-section";
import Loading from "@/components/loading";
import { FileDetailsProvider } from "@/contexts/FileDetailsContext";

export default function FileDetailsSection({
  year,
  fileNo,
}: {
  year: string;
  fileNo: string;
}) {
  const loading = useFileLoading();
  const error = useFileError();
  const data = useFileDetails(year, fileNo);
  const totals = useFileTotals(year, fileNo);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="h-full grow flex flex-col items-center justify-center gap-1">
        <FaInfoCircle size={24} className="text-danger mb-1" />
        <div className="font-semibold">Error occured loading the file.</div>
        <div className="text-muted">{error}</div>
      </div>
    );

  if (!data || Object.keys(data).length === 0)
    return (
      <div className="h-full grow flex flex-col items-center justify-center gap-1">
        <FaInfoCircle size={24} className="text-muted mb-1" />
        <div className="font-semibold">File not found</div>
        <div className="text-muted">
          No data available for this file. Please check the year and file
          number.
        </div>
      </div>
    );

  return (
    <FileDetailsProvider value={{ year, fileNo, data, totals }}>
      <div className="flex-1 h-full flex flex-col divide-y-2">
        <div className="flex items-center gap-2 px-2 lg:px-4 pb-2">
          <div className="font-bold font-mono text-xl">
            {getFullFileNo(fileNo, year)}
          </div>
          <BadgeFileStatus status={data.status ?? "unknown"} />
        </div>

        <div className="flex-1 h-full overflow-y-auto px-2 lg:px-4 py-2 lg:py-4">
          <div>
            <OverviewSection data={data} totals={totals} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <InfoSection />
            <DutySection />
            <ExpenseSection type="port" />
            <ExpenseSection type="custom" />
            <ExpenseSection type="delivery" />
            <ExpenseSection type="other" />
          </div>
        </div>
      </div>
    </FileDetailsProvider>
  );
}
