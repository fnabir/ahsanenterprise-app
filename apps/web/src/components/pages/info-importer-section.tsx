"use client";

import { getDatabaseReference } from "@repo/firebase";
import { useList } from "react-firebase-hooks/database";
import { CardInfo, CardInfoImporter, Skeleton } from "@repo/ui";
import { FaInfoCircle } from "react-icons/fa";

export default function InfoImporterSection() {
  const [data, loading, error] = useList(getDatabaseReference("info/importer"));

  return (
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
          title="Error"
          details={`Error getting importer informations. ${error?.message ?? ""}`}
          Icon={<FaInfoCircle size={24} className="text-danger" />}
          className="mx-2 lg:mx-4 my-2"
        />
      ) : !data?.length ? (
        <CardInfo
          title="No data found"
          details="No information available for importers."
          Icon={<FaInfoCircle size={24} />}
          className="mx-2 lg:mx-4 my-2"
        />
      ) : (
        data?.map((item, i) => (
          <CardInfoImporter key={i} id={item.key!} data={item.val()} />
        ))
      )}
    </div>
  );
}
