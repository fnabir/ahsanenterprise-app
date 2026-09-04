"use client";

import { MdMoreVert } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../core/dropdown-menu";
import type { GroupedFileItem } from "@repo/types";
import { useState, useEffect } from "react";
import { updateFileStatus } from "@repo/firebase";
import { FILE_STATUS_OPTIONS } from "@repo/core";
import { Button } from "../../core";

export function CardFileStatusList({ file }: { file: GroupedFileItem }) {
  const [status, setStatus] = useState<string>(file.data.status ?? "New");

  useEffect(() => {
    setStatus(file.data.status ?? "New");
  }, [file.data.status]);

  const onChangeStatus = async (nextStatus: string) => {
    if (nextStatus === status) return;
    setStatus(nextStatus);

    await updateFileStatus(file.fileNo, file.year, status, nextStatus);
  };

  return (
    <li className="flex items-center justify-between gap-2 px-2 pb-1 text-xs">
      <div>
        <div
          className={`text-[11px] text-muted bg-muted-subtle py-px px-1 w-fit rounded-lg`}
        >
          #{file.fileNo}
        </div>
        {file.data.importer && (
          <div className="font-semibold">{file.data.importer}</div>
        )}
        {file.data.itemName && (
          <div className="text-muted">{file.data.itemName}</div>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              Icon={<MdMoreVert size={18} />}
              className="p-1!"
              variant="muted"
            />
          }
        />
        <DropdownMenuContent className="w-42">
          <DropdownMenuGroup>
            <DropdownMenuLabel>File Status</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={onChangeStatus}
            >
              {FILE_STATUS_OPTIONS.map((statusOption) => (
                <DropdownMenuRadioItem
                  key={statusOption.value}
                  value={statusOption.value}
                >
                  {statusOption.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
