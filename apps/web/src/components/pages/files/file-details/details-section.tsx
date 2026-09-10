"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BadgeFileStatus, Button } from "@repo/ui";
import { FaInfoCircle, FaPlus, FaPrint } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
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
import OverviewSection from "./overview-section";
import Loading from "@/components/loading";
import { FileDetailsProvider } from "@/contexts/FileDetailsContext";
import { getDatabaseReference, updateTransaction } from "@repo/firebase";
import { useObject } from "react-firebase-hooks/database";
import { TransactionData } from "@repo/types";
import { AnimatePresence, motion } from "framer-motion";
import PrintLayout from "./print-layout";

export default function FileDetailsSection({
  year,
  fileNo,
}: {
  year: string;
  fileNo: string;
}) {
  const [printLayout, setPrintLayout] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<"Add" | "Update" | null>(null);

  const loading = useFileLoading();
  const error = useFileError();
  const data = useFileDetails(year, fileNo);
  const totals = useFileTotals(year, fileNo);

  const [transactionData, transactionLoading, transactionError] = useObject(
    getDatabaseReference(
      `transaction/importer/${data?.importer}/bill/${year}-${fileNo}`,
    ),
  );
  const transactionVal = transactionData?.val();

  const fullFileNo = getFullFileNo(fileNo, year);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `${data?.importer}-${fileNo}`,
  });

  const handlePrint = () => {
    if (contentRef.current) reactToPrintFn();
  };

  const transactionPayload: TransactionData = useMemo(() => {
    return {
      date: data?.deliveryDate ?? "",
      details: data?.itemName ?? "",
      title: fullFileNo,
      value: totals?.grandTotal,
    };
  }, [fullFileNo, data?.itemName, totals?.grandTotal, data?.deliveryDate]);

  useEffect(() => {
    if (!transactionVal) {
      setButtonLabel("Add");
    } else if (
      JSON.stringify(transactionVal) === JSON.stringify(transactionPayload)
    ) {
      setButtonLabel(null);
    } else {
      setButtonLabel("Update");
    }
  }, [transactionVal, transactionPayload]);

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

  const handleBalanceTransaction = async () => {
    await updateTransaction(
      data.importer!,
      "importer",
      "bill",
      transactionPayload,
      `${year}-${fileNo}`,
    );
  };

  return (
    <FileDetailsProvider value={{ year, fileNo, data, totals }}>
      <div className="flex-1 h-full flex flex-col divide-y-2">
        <div className="flex items-center gap-2 px-2 lg:px-4 py-2">
          <div className="font-bold font-mono text-sm lg:text-lg">
            {getFullFileNo(fileNo, year)}
          </div>
          <BadgeFileStatus status={data.status ?? "unknown"} />
          <AnimatePresence mode="popLayout">
            {buttonLabel && (
              <motion.div
                key="balance-button"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  variant="subtle"
                  label={`${buttonLabel} Balance to the Importer Balance`}
                  Icon={<FaPlus />}
                  disabled={
                    transactionLoading || transactionError ? true : false
                  }
                  onClick={handleBalanceTransaction}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            label={`${printLayout ? "Normal" : "Print"} Layout`}
            onClick={() => setPrintLayout((prev) => !prev)}
            className="min-w-30"
          />
          <Button
            variant="default"
            label="Print"
            Icon={<FaPrint />}
            onClick={handlePrint}
          />
        </div>

        {printLayout ? (
          <PrintLayout ref={contentRef} />
        ) : (
          <div className="flex-1 h-full overflow-y-auto px-2 lg:px-4 py-2 lg:py-4">
            <div>
              <OverviewSection />
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
        )}
      </div>
    </FileDetailsProvider>
  );
}
