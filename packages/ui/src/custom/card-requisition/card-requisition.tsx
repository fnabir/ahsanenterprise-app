"use client";

import Link from "next/link";
import { Button, Card } from "../..";
import { DialogDelete } from "../dialog-delete";
import RowData from "../row-data/row-data";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useAuth } from "../../../../../apps/web/src/contexts/AuthContext";
import { useState } from "react";
import { getFullRequisitionNo } from "../../../../core/utils";

export function CardRequisition({
  year,
  requisitionNo,
  data,
}: {
  year: number;
  requisitionNo: string;
  data: any;
}) {
  const fileNos = data?.files ? Object.keys(data.files) : [];

  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const onDeleteFile = () => {
    setOpen(false);
  };
  return (
    <Card className="p-2! flex flex-col text-sm divide-y-2">
      <div className="pb-1">
        <div className="text-primary bg-primary-subtle py-px px-1.25 w-fit rounded-lg">
          #{requisitionNo}
        </div>
      </div>
      <div className="py-1">
        <RowData
          label="Letter Date"
          value={new Date(data.letterDate).toLocaleDateString()}
        />
        <RowData
          label="Arrival Date"
          value={new Date(data.arrival).toLocaleDateString()}
        />
        <RowData
          label="Delivery Date"
          value={new Date(data.delivery).toLocaleDateString()}
        />
      </div>
      <div className="flex items-center justify-between gap-2 py-1">
        <div className="text-muted">Files:</div>

        {fileNos.length > 0 && (
          <div className="flex items-center justify-center gap-1">
            {fileNos.map((fileNo) => (
              <div
                key={fileNo}
                className={`text-primary bg-primary-subtle py-px px-1.25 w-fit rounded-lg`}
              >
                #{fileNo}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-end py-2">
        <Link href={`/requisition/${year}-${requisitionNo}`}>
          <Button
            variant="custom"
            label="View"
            Icon={<FaRegEye />}
            className="text-foreground border border-muted/50 hover:bg-muted-subtle"
          />
        </Link>
        <DialogDelete
          title="Delete File"
          trigger={
            <Button
              variant="custom"
              label="Delete"
              Icon={<MdDeleteOutline size={16} />}
              className="text-danger border bg-danger-subtle hover:border-danger"
            />
          }
          onDelete={() => onDeleteFile()}
          open={open}
          setOpen={setOpen}
        >
          <div className="text-sm">
            Are you sure you want to delete file
            <span className="rounded-md px-1 py-px text-info bg-primary-subtle ml-1">
              {getFullRequisitionNo(Number(requisitionNo), Number(year))}
            </span>
            ? This action cannot be undone.
          </div>
        </DialogDelete>
      </div>
    </Card>
  );
}
