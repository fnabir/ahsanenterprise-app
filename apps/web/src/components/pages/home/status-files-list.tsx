import { Card, CardFileStatusList } from "@repo/ui";
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
          <CardFileStatusList key={file.fileNo} file={file} />
        ))}
      </ul>
    </Card>
  );
}
