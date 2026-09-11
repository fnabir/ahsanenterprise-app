"use client";

import { FaPrint } from "react-icons/fa6";
import ExpenseSection from "./expense-section";
import AccountSection from "./account-section";
import Loading from "@/components/loading";
import { Button } from "@repo/ui";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PrintWithLetterpad from "./print-with-letterpad";
import { useRequisitionDetailsContext } from "@/contexts/RequisitionDetailsContext";

export default function RequisitionDetailsSection() {
  const { loading, year, requisitionNo, requisitionRef, date, lcs, expenses } =
    useRequisitionDetailsContext();
  const { letter, arrival, delivery } = date;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Requisition-${year}-${requisitionNo}`,
  });

  if (loading) {
    return <Loading />;
  }

  const handlePrint = () => {
    if (contentRef.current) reactToPrintFn();
  };

  return (
    <div className="flex-1 h-full flex flex-col divide-y-2">
      <div className="flex gap-2 py-2 px-2 lg:px-4">
        <Button
          label="Print"
          Icon={<FaPrint />}
          className="space-x-1"
          onClick={handlePrint}
        />
        <PrintWithLetterpad />
      </div>
      <div className="grow h-full py-4 w-full overflow-y-auto">
        <div className="max-w-[210mm] mx-auto border border-primary border-dashed p-4">
          <div
            className="print-requisition bg-transparent space-y-2 text-[13px] overflow-y-auto"
            ref={contentRef}
          >
            <div className="flex items-center justify-between">
              <div>
                <strong>Ref:</strong> {requisitionRef}
              </div>
              {letter && (
                <div>
                  <strong>Date:</strong> {letter}
                </div>
              )}
            </div>
            <p className="pt-4">
              Mr. Saiful Islam
              <br />
              Manager Supply Chain
              <br />
              Bio Pharma Ltd.
            </p>
            <p>
              <strong>Subject:</strong> Payment Request for Customs Clearance
              and Delivery for L/C Nos. {lcs.join(", ")}
            </p>
            <p>Dear Sir,</p>
            <p>Assalamualikum Wrt. Wbr.</p>
            <p>
              We are pleased to inform you that the subject consignments arrived
              at Chittagong Port on <strong>{arrival ?? "—"}</strong>.
            </p>
            <p>
              The customs assessment has been finalized, and we have scheduled
              the delivery for <strong>{delivery ?? "—"}</strong>. To facilitate
              a timely release of the goods, we kindly request you to deposit
              the Duty, Port, Agency, Labor and other charges to our bank
              account as per the details below:
            </p>

            <AccountSection />

            <ExpenseSection />

            <p>
              Please confirm with the deposit slip or confirmation at your
              earliest convenience to avoid any delay or port demurrage.
            </p>
            <p>Thank you for your cooperation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
