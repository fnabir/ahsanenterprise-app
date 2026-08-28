import { MdMoreVert } from "react-icons/md";
import type { GroupedFileItem } from "@repo/types";
import { Button } from "../..";

export function CardFileStatusList({ file }: { file: GroupedFileItem }) {
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

      <Button
        variant="outline"
        Icon={<MdMoreVert size={16} />}
        className="p-1!"
      />
    </li>
  );
}
