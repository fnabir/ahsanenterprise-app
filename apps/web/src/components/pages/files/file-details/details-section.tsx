"use client";

import { BadgeFileStatus, CardInfo, Skeleton } from "@repo/ui";
import { MdErrorOutline } from "react-icons/md";
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
import DeliveryExpenseSection from "./delivery-expense-section";
import CustomExpenseSection from "./custom-expense-section";
import OtherExpenseSection from "./other-expense-section";
import PortExpenseSection from "./port-expense-section";
import TotalSection from "./total-section";
import OverviewSection from "./overview-section";

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 px-2 lg:px-4 py-2">
        {[...Array(7)].map((_, index) => (
          <Skeleton key={index} className="h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <CardInfo
        title="Error"
        details="An error occurred while loading the file. Please try again later."
        Icon={<MdErrorOutline size={24} className="text-danger" />}
        className="mx-2 lg:mx-4 my-2"
      />
    );
  }

  if (!data) {
    return (
      <CardInfo
        title="File not found"
        details="No data available for this file. Please check the year and file number."
        Icon={<FaInfoCircle size={24} className="text-danger" />}
        className="mx-2 lg:mx-4 my-2"
      />
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col divide-y-2">
      <div className="flex items-center gap-2 px-2 lg:px-4 pb-2">
        <div className="font-bold font-mono text-xl">
          {getFullFileNo(fileNo, year)}
        </div>
        <BadgeFileStatus status={data.status ?? "unknown"} />
      </div>

      <div className="flex-1 h-full overflow-y-auto px-2 lg:px-4 py-2">
        <div className="grid grid-cols-12 gap-4">
          <OverviewSection data={data} totals={totals} />
          <InfoSection data={data} />
          <DutySection data={data} total={totals.duty} />
          <PortExpenseSection data={data} total={totals.port} />
          <CustomExpenseSection data={data} total={totals.custom} />
          <DeliveryExpenseSection data={data} total={totals.delivery} />
          <OtherExpenseSection data={data} total={totals.other} />
          <TotalSection data={totals} />
        </div>
      </div>
    </div>
  );
}
