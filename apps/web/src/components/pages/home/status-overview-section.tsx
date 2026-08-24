"use client";

import { Card } from "@repo/ui";
import { ACTIVE_FILE_STATUSES, useFilesGroupedByStatus } from "@repo/core";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";
import PieChart from "@/components/pie-chart";

export default function StatusOverviewSection() {
  const { isAdmin } = useAuth();
  const statusesToShow = isAdmin
    ? ACTIVE_FILE_STATUSES
    : ACTIVE_FILE_STATUSES.filter((status) => status !== "Bill");

  const filesByStatus = useFilesGroupedByStatus();

  const filteredStatuses = Object.entries(filesByStatus).filter(([status]) =>
    statusesToShow.includes(status),
  );

  const statusStyle: Record<string, string> = {
    New: "muted",
    Assessment: "primary",
    "Duty Payment": "warning",
    Delivery: "accent",
    Bill: "secondary",
  };

  const pieData = useMemo(() => {
    return [
      {
        name: "New",
        value: filesByStatus["New"]?.length ?? 0,
        color: "#5b6472",
      },
      {
        name: "Assessment",
        value: filesByStatus["Assessment"]?.length ?? 0,
        color: "#2a6fa8",
      },
      {
        name: "Duty Payment",
        value: filesByStatus["Duty Payment"]?.length ?? 0,
        color: "#97630b",
      },
      {
        name: "Delivery",
        value: filesByStatus["Delivery"]?.length ?? 0,
        color: "#6b4fa0",
      },
      {
        name: "Bill",
        value: filesByStatus["Bill"]?.length ?? 0,
        color: "#a23d6e",
      },
    ];
  }, [filesByStatus]);

  console.log(pieData);

  if (filteredStatuses.length === 0) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-2 items-center justify-center px-2!">
      <h3 className="font-semibold">Status Overview</h3>
      <div className="flex divide-x-2 w-full">
        <div className="flex-1/2 flex flex-col justify-center items-center text-sm pr-4 gap-1">
          {pieData.map((item) => {
            const status = item.name;
            const count = item.value;

            if (count === 0) return null;

            return (
              <div
                key={status}
                className={`w-full flex justify-between bg-${statusStyle[status]}-subtle text-${statusStyle[status]} rounded-lg px-2`}
              >
                <span className="font-semibold">{item.name}</span>
                <span className="text-end">{item.value}</span>
              </div>
            );
          })}
        </div>
        <PieChart
          data={pieData}
          size={100}
          strokeWidth={10}
          className="flex-1/2"
        />
      </div>
    </Card>
  );
}
