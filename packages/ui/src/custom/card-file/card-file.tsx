"use client";

import { deleteFile } from "@repo/firebase";
import { FileData } from "@repo/types";
import { Button, Card } from "../../core";
import { CopyText } from "../copy-text";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import { BadgeFileStatus } from "../badge-file-status";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { DialogDelete } from "../dialog-delete";
import { fromFileDbKey, getFullFileNo } from "@repo/core";
import { DialogFileInfo } from "../dialog-file-info";

export function CardFile({
  year,
  fileKey,
  data,
}: {
  year: number | string;
  fileKey: string;
  data: FileData;
}) {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const fileNo = Number(fromFileDbKey(fileKey));

  const onDeleteFile = async () => {
    await deleteFile(fileNo, year);
    setOpen(false);
  };

  return (
    <Card className="p-2! text-sm divide-y-2">
      <div className="flex items-center justify-between pb-1">
        <div className="flex gap-2">
          <div className="text-primary bg-primary-subtle py-px px-1.25 w-fit rounded-lg border border-primary">
            #{fileNo}
          </div>
          <BadgeFileStatus status={data.status} />
        </div>
        <DialogFileInfo year={Number(year)} fileNo={Number(fileNo)} data={data}>
          <Button
            variant="outline"
            Icon={
              <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
            }
          />
        </DialogFileInfo>
      </div>
      <div className="py-1">
        <div className="font-semibold">{data.importer}</div>
        <div className="text-muted text-[13px]">
          {data.itemName} • {data.itemPackage}
        </div>
      </div>
      {(data.bl || data.be || data.lc) && (
        <div className="py-2 space-y-1">
          <CopyText label="B/L" text={data.bl} />
          <CopyText label="B.E." text={data.be?.toString()} />
          <CopyText label="LC" text={data.lc} />
          <CopyText label="ROT" text={data.rotNo} />
        </div>
      )}
      {isAdmin && (
        <div className="flex gap-2 pt-2 justify-end">
          <Link href={`/files/${year}-${fileNo}`}>
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
                {getFullFileNo(Number(fileNo), Number(year))}
              </span>
              ? This action cannot be undone.
            </div>
          </DialogDelete>
        </div>
      )}
    </Card>
  );
}
