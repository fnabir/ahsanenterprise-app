"use client";

import { deleteFile } from "@repo/firebase";
import { FileData } from "@repo/types";
import { Button, Card } from "../../core";
import { FaCheck, FaRegCopy, FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BadgeFileStatus } from "../badge-file-status";
import Link from "next/link";
import { useAuth } from "../../../../../apps/web/src/contexts/AuthContext";
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

  const fileNo = fromFileDbKey(fileKey);

  const onDeleteFile = async () => {
    await deleteFile(fileNo, year);
    setOpen(false);
  };

  return (
    <Card className="p-2! text-sm divide-y-2">
      <div className="flex items-center justify-between pb-1">
        <div className="flex gap-2">
          <div
            className={`text-primary bg-primary-subtle py-px px-1.25 w-fit rounded-lg`}
          >
            #{fileNo}
          </div>
          <BadgeFileStatus
            status={isAdmin && data.status === "Bill" ? "Done" : data.status}
          />
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

function CopyText({ label, text }: { label?: string; text?: string | null }) {
  const [copied, setCopied] = useState(false);

  if (!text || text === "0") return null;

  const onCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`flex items-center text-[13px] py-1 border ${copied ? "border-success" : "hover:border-primary"}  rounded px-2 font-mono bg-background text-muted group cursor-pointer transition-all`}
      onClick={onCopyText}
    >
      <div className="w-16">{label}</div>
      <div className="grow text-foreground">{text}</div>
      <motion.div
        key={copied ? "tick" : "copy"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? (
          <FaCheck className="text-success" />
        ) : (
          <FaRegCopy className="group-hover:text-foreground transition-colors" />
        )}
      </motion.div>
      <AnimatePresence initial={false}>
        {copied && (
          <motion.div
            key="copied-wrapper"
            className="overflow-hidden flex items-center"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.span
              className="text-success font-semibold ml-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              Copied
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
