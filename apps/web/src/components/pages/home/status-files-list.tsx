import { Card } from "@repo/ui";
import { MdMoreVert } from "react-icons/md";
import type { GroupedFileItem } from "@repo/types";

export default function StatusFilesList({
  status,
  files,
}: {
  status: string;
  files: GroupedFileItem[];
}) {
  const color = (() => {
    switch (status) {
      case "Assessment":
        return "info";
      case "Duty Payment":
        return "warning";
      case "Delivery":
        return "accent";
      case "Bill":
        return "secondary";
      case "Done":
        return "success";
      default:
        return "muted";
    }
  })();

  return (
    <Card
      className={`p-0! border-t-4 border-${color}! hover:border-${color}! divide-y-2 hover:cursor-default`}
    >
      <div className="flex items-center justify-between px-2 py-2 font-semibold text-sm">
        <h3>{status}</h3>
        <span
          className={`text-xs h-5 w-5 flex items-center justify-center text-${color} bg-${color}-subtle border border-${color} rounded-full`}
        >
          {files.length}
        </span>
      </div>
      <ul className="flex flex-col divide-y-2 gap-2 pt-1">
        {files.map((file) => (
          <li
            key={file.fileNo}
            className="flex items-center gap-2 px-2 pb-1 text-xs"
          >
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

            <MdMoreVert className="ml-auto text-muted" size={16} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
