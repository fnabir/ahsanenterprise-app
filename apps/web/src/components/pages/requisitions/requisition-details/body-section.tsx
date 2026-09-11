"use client";

import { RequisitionDetailsProvider } from "@/providers/RequisitionDetailsProvider";
import RequisitionDetailsSection from "./details-section";

export default function RequisitionBodySection({
  year,
  requisitionNo,
}: {
  year: string;
  requisitionNo: string;
}) {
  return (
    <RequisitionDetailsProvider year={year} requisitionNo={requisitionNo}>
      <RequisitionDetailsSection />
    </RequisitionDetailsProvider>
  );
}
