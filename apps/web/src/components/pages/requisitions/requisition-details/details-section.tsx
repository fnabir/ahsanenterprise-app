"use client";

import {
  getFullRequisitionNo,
  useFileLoading,
  useFilesByYear,
  useRequisitionDetails,
  useRequisitionLoading,
} from "@repo/core";
import ExpenseSection from "./expense-section";
import type { RequisitionExpense } from "./expense-section";
import { Files } from "@repo/types";
import AccountSection from "./account-section";
import Loading from "@/components/loading";

export default function RequisitionDetailsSection({
  year,
  requisitionNo,
}: {
  year: string;
  requisitionNo: string;
}) {
  const requisitionLoading = useRequisitionLoading();
  const fileLoading = useFileLoading();

  const requistionRef = getFullRequisitionNo(requisitionNo, year);
  const data = useRequisitionDetails(year, requisitionNo);
  const files: Files = useFilesByYear(year);

  if (requisitionLoading || fileLoading) {
    return <Loading />;
  }

  const expenses: RequisitionExpense[] = Object.entries(data?.files ?? {}).map(
    ([fileNo, fileExpense]) => ({
      fileNo,
      itemName: files[fileNo] ? files[fileNo]?.itemName : "N/A",
      lc: files[fileNo]?.lc,
      duty: files[fileNo]?.total?.duty ?? 0,
      ...fileExpense,
    }),
  );

  const arrival = data?.arrival
    ? new Date(data.arrival).toLocaleDateString("en-GB")
    : null;
  const delivery = data?.delivery
    ? new Date(data.delivery).toLocaleDateString("en-GB")
    : null;

  return (
    <div className="space-y-4 text-sm px-2 lg:px-4 py-2 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>Ref: {requistionRef}</div>
        {data?.letterDate && (
          <div>
            Date: {new Date(data.letterDate).toLocaleDateString("en-GB")}
          </div>
        )}
      </div>
      <p>
        Mr. Saiful Islam
        <br />
        Manager Supply Chain
        <br />
        Bio Pharma Ltd.
      </p>
      <p>
        <strong>Subject:</strong> Payment Request for Customs Clearance and
        Delivery for L/C Nos.
      </p>
      <p>Dear Sir,</p>
      <p>Assalamualikum Wrt. Wbr.</p>
      <p>
        We are pleased to inform you that the subject consignments arrived at
        Chittagong Port on <strong>{arrival ?? "—"}</strong>.
      </p>
      <p>
        The customs assessment has been finalized, and we have scheduled the
        delivery for <strong>{delivery ?? "—"}</strong>. To facilitate a timely
        release of the goods, we kindly request you to deposit the Duty, Port,
        Agency, Labor and other charges to our bank account as per the details
        below:
      </p>

      <AccountSection />

      <ExpenseSection data={expenses} />

      <p>
        Please confirm with the deposit slip or confirmation at your earliest
        convenience to avoid any delay or port demurrage.
      </p>
      <p>Thank you for your cooperation.</p>
    </div>
  );
}
