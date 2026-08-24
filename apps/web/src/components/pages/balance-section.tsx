"use client";

import { getDatabaseReference } from "@repo/firebase";
import { BalanceTotal } from "@repo/types";
import { CardBalanceTotal, CardInfo, Skeleton, CardTotal } from "@repo/ui";
import { useList, useObject } from "react-firebase-hooks/database";
import { FaInfoCircle } from "react-icons/fa";

export default function BalanceSection({ id }: { id: string }) {
  const [balanceData, balanceLoading, balanceError] = useList(
    getDatabaseReference(`balance/${id}`),
  );

  const [totalBalanceData, totalBalanceLoading, totalBalanceError] = useObject(
    getDatabaseReference(`balance/total/importer`),
  );
  const totalBalanceVal = totalBalanceData?.val();

  const loading = balanceLoading || totalBalanceLoading;
  const error = balanceError || totalBalanceError;
  const total = balanceData?.reduce(
    (acc, item) => acc + (item.val() as BalanceTotal).value,
    0,
  );

  return (
    <div className="grow flex flex-col divide-y-2">
      <div className="grow overflow-y-auto grid grid-cols-4 gap-4 px-2 lg:px-4 py-2 lg:py-4">
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
            return (
              <CardBalanceTotal
                key={key}
                id={id === "staff" && val.name ? val.name : key}
                value={val.value}
                date={val.date}
              />
            );
          })
        )}
      </div>
      <CardTotal value={total} date={totalBalanceVal?.date} />
    </div>
  );
}
