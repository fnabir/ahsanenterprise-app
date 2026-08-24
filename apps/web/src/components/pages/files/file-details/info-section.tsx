import { FileData } from "@repo/types";
import { Button, Card } from "@repo/ui";
import { MdOutlineEdit } from "react-icons/md";

export default function InfoSection({ data }: { data: FileData }) {
  const info = {
    Importer: data.importer,
    Item: data.itemName,
    Package: data.itemPackage,
    "B/L No.": data.bl,
    "L/C No.": data.lc,
    Vessel: data.vessel,
    "Rot No.": data.rotNo,
    "B/E No.": `C-${data.be}`,
    "B/E Date": data.beDate,
  };

  return (
    <Card className="col-span-4 flex flex-col divide-y-2 px-2! text-sm">
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="font-semibold text-base">File Details</div>
        <Button
          variant="outline"
          Icon={
            <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
          }
        />
      </div>
      {Object.entries(info).map(([key, value]) =>
        value ? (
          <div
            key={key}
            className="flex gap-2 justify-between items-center py-1"
          >
            <div className="text-muted">{key}</div>
            <div className={key === "Importer" ? "font-semibold" : ""}>
              {value}
            </div>
          </div>
        ) : null,
      )}
    </Card>
  );
}
