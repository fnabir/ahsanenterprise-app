"use client";

import { getDatabaseReference } from "@repo/firebase";
import { useObject } from "react-firebase-hooks/database";
import { Button, CardTotal, Number } from "@repo/ui";
import { FaPlus } from "react-icons/fa";
import { TotalBalanceSync } from "@repo/core";
import { TransactionData } from "@repo/types";
import TransactionSection from "./transaction-section";

export default function TransactionImporterSection({ id }: { id: string }) {
  const [transactionData, transactionLoading, transactionError] = useObject(
    getDatabaseReference(`transaction/importer/${id}`),
  );

  const [totalBalanceData, totalBalanceLoading, totalBalanceError] = useObject(
    getDatabaseReference(`balance/importer/${id}`),
  );

  const loading = transactionLoading || totalBalanceLoading;
  const error = transactionError || totalBalanceError;

  const transactions = transactionData?.val() ?? {};

  const bills: [string, TransactionData][] = transactions.bill
    ? Object.entries(transactions.bill)
    : [];
  const payments: [string, TransactionData][] = transactions.payment
    ? Object.entries(transactions.payment)
    : [];

  const totalBalanceVal = totalBalanceData?.val();

  const totalBill = bills.reduce(
    (acc, [, transaction]) => acc + (transaction.value ?? 0),
    0,
  );
  const totalPayment = payments.reduce(
    (acc, [, transaction]) => acc + (transaction.value ?? 0),
    0,
  );
  const calculatedBalance = totalBill - totalPayment;

  return (
    <div className="grow h-full flex flex-col divide-y-2">
      <div className="flex items-center gap-2 px-2 lg:px-4 py-2">
        <Button
          variant="outline"
          className="bg-primary-subtle border-primary text-primary hover:bg-primary/10 hover:text-primary hover:border-primary"
          label="Add Transaction"
          Icon={<FaPlus size={12} />}
        />
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        {loading || error || !transactions ? (
          <div className="flex flex-col min-h-full items-center justify-center text-lg text-center text-muted">
            {loading ? (
              "Loading transactions..."
            ) : error ? (
              <>
                <div className="font-bold text-foreground">Error</div>
                <div className="text-sm">
                  {error.message ??
                    "An error occurred while loading the transactions."}
                </div>
              </>
            ) : !transactions ? (
              <div className="flex min-h-full items-center justify-center text-lg text-center text-muted">
                No transactions found.
              </div>
            ) : null}
          </div>
        ) : null}

        <TransactionSection
          bills={bills}
          payments={payments}
          totalBill={totalBill}
          totalPayment={totalPayment}
        />
      </div>
      <CardTotal
        value={calculatedBalance}
        date={totalBalanceVal?.date}
        note={
          calculatedBalance > 0
            ? "Outstanding Balance"
            : calculatedBalance < 0
              ? "Overpaid"
              : undefined
        }
        noteClassName={
          calculatedBalance > 0
            ? "text-danger!"
            : calculatedBalance < 0
              ? "text-warning!"
              : "text-success!"
        }
      />
      <TotalBalanceSync
        path={`balance/importer/${id}`}
        total={calculatedBalance}
      />
    </div>
  );
}
