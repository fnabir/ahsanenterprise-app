"use client";

import { TotalBalanceSync } from "@repo/core";
import { getDatabaseReference } from "@repo/firebase";
import { BalanceTotal } from "@repo/types";
import { CardBalanceTotal, CardInfo, Skeleton, CardTotal } from "@repo/ui";
import { useObject } from "react-firebase-hooks/database";
import { useUniqueList } from "@repo/firebase";
import { FaInfoCircle } from "react-icons/fa";

export default function BalanceSection({ id }: { id: string }) {
  const [balanceData, balanceLoading, balanceError] = useUniqueList(
    getDatabaseReference(`balance/${id}`),
  );

  const [totalBalanceDate, totalBalanceLoading, totalBalanceError] = useObject(
    getDatabaseReference(`balance/total/importer/date`),
  );

  const loading = balanceLoading || totalBalanceLoading;
  const error = balanceError || totalBalanceError;
  const total =
    balanceData?.reduce(
      (acc, item) => acc + (item.val() as BalanceTotal).value,
      0,
    ) ?? 0;

  return (
    <div className="h-full flex flex-col divide-y-2">
      <div className="flex-1 overflow-y-auto px-2 lg:px-4 py-2 lg:py-4">
        <div className="grid grid-cols-5 gap-2 lg:gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="col-span-1">
                <div className="w-1/4 h-4" />
                <div className="w-3/5 h-10" />
                <div className="w-2/5 h-3" />
                <div className="w-4/7 h-3" />
              </Skeleton>
            ))
          ) : error ? (
            <CardInfo
              title="File not found"
              details="No data available for this file. Please check the year and file number."
              Icon={<FaInfoCircle size={24} className="text-danger" />}
              className="mx-2 lg:mx-4 my-2"
            />
          ) : !balanceData?.length ? (
            <CardInfo
              title="No data found"
              details="No balance available for any importer."
              Icon={<FaInfoCircle size={24} />}
              className="mx-2 lg:mx-4 my-2"
            />
          ) : (
            balanceData.map((item) => {
              const key = item.key!;
              const val = item.val() as BalanceTotal;
              const value = val.value;
              return (
                <CardBalanceTotal
                  key={key}
                  id={id === "staff" && val.name ? val.name : key}
                  href={`/${id}-balance/${key}`}
                  value={value}
                  date={val.date}
                  note={
                    id === "staff" && value !== 0
                      ? value < 0
                        ? "Outstanding Balance"
                        : "Payable to Staff"
                      : undefined
                  }
                  noteClassName={
                    id === "staff" && value !== 0
                      ? value < 0
                        ? "text-danger!"
                        : "text-success!"
                      : ""
                  }
                />
              );
            })
          )}
        </div>
      </div>
      <CardTotal
        value={total}
        date={totalBalanceDate?.val()}
        note={
          id === "staff" && total !== 0
            ? total < 0
              ? "Outstanding Balance"
              : "Payable to Staff"
            : undefined
        }
        noteClassName={
          id === "staff" && total !== 0
            ? total < 0
              ? "text-danger!"
              : "text-success!"
            : ""
        }
      />
      <TotalBalanceSync path={`balance/total/${id}`} total={total} />
    </div>
  );
}
