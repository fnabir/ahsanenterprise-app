"use client";

import { CardFilesTotal, CardInfo, Skeleton } from "@repo/ui";
import { useMemo } from "react";
import {
  ACTIVE_FILE_STATUSES,
  useFileError,
  useFileLoading,
  useFilesGroupedByStatus,
  useFileYears,
} from "@repo/core";
import { useAuth } from "@/contexts/AuthContext";
import StatusFilesList from "./status-files-list";

export default function FilesSection() {
  const { isAdmin } = useAuth();
  const statusesToShow = isAdmin
    ? ACTIVE_FILE_STATUSES
    : ACTIVE_FILE_STATUSES.filter((status) => status !== "Bill");

  const loading = useFileLoading();
  const error = useFileError();
  const years = useFileYears();

  const orderedYears = useMemo(() => [...years].reverse(), [years]);

  const filesByStatus = useFilesGroupedByStatus();

  return (
    <div className="space-y-4">
      <div className="font-bold mb-2">FILES</div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="col-span-1">
              <div className="w-1/4 h-4" />
              <div className="w-3/5 h-10" />
            </Skeleton>
          ))
        ) : error ? (
          <CardInfo className="col-span-1" title="Error" details={error} />
        ) : !orderedYears?.length ? (
          <CardInfo className="col-span-1" title="No files" />
        ) : (
          orderedYears.map(({ year, count }) => (
            <CardFilesTotal
              key={year}
              className="col-span-1"
              count={count}
              year={parseInt(year, 10)}
            />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="col-span-1">
                <div className="w-2/5 h-4" />
                <hr />
                <div className="w-full h-10" />
                <div className="w-full h-10" />
              </Skeleton>
            ))
          : statusesToShow.map((status) => {
              const files = filesByStatus[status] ?? [];

              if (files.length === 0) return null;

              return (
                <StatusFilesList key={status} status={status} files={files} />
              );
            })}
      </div>
    </div>
  );
}
