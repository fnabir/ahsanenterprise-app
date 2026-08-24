"use client";

import { Card, Skeleton, CardInfo, CardBalanceTotal } from "@repo/ui";
import { getDatabaseReference } from "@repo/firebase";
import { useList } from "react-firebase-hooks/database";
import { BalanceTotal } from "@repo/types";
import { FaInfoCircle } from "react-icons/fa";

export default function TotalBalanceSection() {
  const [balanceData, balanceLoading, balanceError] = useList(
    getDatabaseReference("balance/total"),
  );

  return (
    <div className="pb-2 lg:pb-6">
      <div className="font-bold mb-2">BALANCE</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
        {balanceLoading ? (
          <Skeleton className="col-span-1">
            <div className="w-1/4 h-4" />
            <div className="w-3/5 h-10" />
            <div className="w-2/5 h-3" />
            <div className="w-4/7 h-3" />
          </Skeleton>
        ) : balanceError ? (
          <Card className="col-span-1">
            <p className="text-muted text-lg">Error</p>
            <p>{balanceError.message}</p>
          </Card>
        ) : !balanceData || balanceData?.length === 0 ? (
          <CardInfo
            title="Balance"
            details="No balance data available"
            Icon={<FaInfoCircle size={24} />}
            className="col-span-1"
          />
        ) : (
          balanceData.map((item) => {
            const key = item.key!;
            const val = item.val() as BalanceTotal;
            return (
              <CardBalanceTotal
                key={key}
                id={key}
                value={val.value}
                date={val.date}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
