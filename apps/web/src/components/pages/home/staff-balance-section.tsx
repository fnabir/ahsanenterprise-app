"use client";

import { Card, CardBalanceTotal, CardInfo, Skeleton } from "@repo/ui";
import { getDatabaseReference } from "@repo/firebase";
import { useObject } from "react-firebase-hooks/database";
import type { BalanceTotal } from "@repo/types";
import { FaInfoCircle } from "react-icons/fa";

export default function StaffBalanceSection({ uid }: { uid: string }) {
  const [balanceData, balanceLoading, balanceError] = useObject(
    getDatabaseReference(`balance/staff/${uid}`),
  );

  return (
    <div className="pb-2 lg:pb-6">
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
        ) : !balanceData?.exists() ? (
          <CardInfo
            title="Balance"
            details="No balance data available"
            Icon={<FaInfoCircle size={24} />}
            className="col-span-1"
          />
        ) : (
          Object.entries(balanceData.val() as Record<string, BalanceTotal>).map(
            ([key, val]) => (
              <CardBalanceTotal
                key={key}
                id={key}
                value={val.value}
                date={val.date}
              />
            ),
          )
        )}
      </div>
    </div>
  );
}
