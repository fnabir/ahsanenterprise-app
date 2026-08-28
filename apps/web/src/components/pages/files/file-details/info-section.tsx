import { FileData } from "@repo/types";
import { Button, Card, RowData } from "@repo/ui";
import { MdOutlineEdit } from "react-icons/md";

export default function InfoSection({ data }: { data: FileData }) {
  const info = {
    Importer: data.importer,
    Item: data.itemName,
    Package: data.itemPackage,
    "B/L No.": data.bl,
    "L/C No.": data.lc && data.lc !== "0" ? data.lc : undefined,
    Vessel: data.vessel,
    "Rot No.": data.rotNo,
    "B/E No.": data.be && data.be !== 0 ? `C-${data.be}` : undefined,
    "B/E Date": data.beDate,
  };

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="font-semibold text-base">File Details</div>
        <Button
          variant="outline"
          Icon={
            <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
          }
        />
      </div>
      {Object.entries(info).map(([key, value]) => (
        <RowData
          key={key}
          label={key}
          value={value}
          className={{
            value: key === "Importer" ? "font-semibold" : "",
          }}
        />
      ))}
    </Card>
  );
}
