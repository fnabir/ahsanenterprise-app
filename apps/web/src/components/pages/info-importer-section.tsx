"use client";

import { CardInfo, CardInfoImporter, Skeleton } from "@repo/ui";
import { FaInfoCircle } from "react-icons/fa";
import {
  useImporterLoading,
  useImporterError,
  useImporterData,
} from "@repo/core";
import Loading from "@/components/loading";

export default function InfoImporterSection() {
  const loading = useImporterLoading();
  const error = useImporterError();
  const data = useImporterData();

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="h-full grow flex flex-col items-center justify-center gap-1">
        <FaInfoCircle size={24} className="text-danger mb-1" />
        <div className="font-semibold">
          Error occured loading importer information.
        </div>
        <div className="text-muted">{error}</div>
      </div>
    );

  if (!data || Object.keys(data).length !== 0)
    return (
      <div className="h-full grow flex flex-col items-center justify-center gap-1">
        <FaInfoCircle size={24} className="text-muted mb-1" />
        <div className="font-semibold">No data found.</div>
        <div className="text-muted">
          No information available for importers.
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-5 gap-2 lg:gap-4">
      {Object.entries(data ?? {}).map(([key, value], i) => (
        <CardInfoImporter key={i} id={key} data={value} />
      ))}
    </div>
  );
}
