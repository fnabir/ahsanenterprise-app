import { Button, Card, RowData, DialogFileDetails } from "@repo/ui";
import { MdOutlineEdit } from "react-icons/md";
import { useFileDetailsContext } from "@/contexts/FileDetailsContext";

export default function InfoSection() {
  const { year, fileNo, data } = useFileDetailsContext();

  const info = {
    Importer: data.importer,
    Item: data.itemName,
    Package: data.itemPackage,
    "Item Count": `${data.itemCount && data.itemCount > 1 ? data.itemCount : 1} item${data.itemCount && data.itemCount > 1 ? "s" : ""}`,
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
        <DialogFileDetails fileNo={fileNo} year={year} data={data}>
          <Button
            variant="outline"
            Icon={
              <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
            }
          />
        </DialogFileDetails>
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
