import { Button, Card, DialogFileDuty, RowData } from "@repo/ui";
import { FILE_DUTY_ORDER } from "@repo/core";
import { MdOutlineEdit } from "react-icons/md";
import { useFileDetailsContext } from "@/contexts/FileDetailsContext";

export default function DutySection() {
  const { year, fileNo, data, totals } = useFileDetailsContext();

  const dutyData = data.duty ?? {};

  const fallbackIndex = FILE_DUTY_ORDER.indexOf("ZZZ");
  const getDutyOrderIndex = (key: string) => {
    const index = FILE_DUTY_ORDER.indexOf(
      key as (typeof FILE_DUTY_ORDER)[number],
    );
    return index === -1 ? fallbackIndex : index;
  };

  const sortedDutyData = Object.entries(dutyData).sort(
    ([keyA], [keyB]) => getDutyOrderIndex(keyA) - getDutyOrderIndex(keyB),
  );

  const dutyRows = sortedDutyData.map(([key, value]) => {
    const label = key === "DF" ? "DF/VAT" : key;
    return {
      label: value.percentage ? `${label} - ${value.percentage}%` : label,
      value: value.value,
    };
  });

  const dutyRef = {
    "Assessment Reference": data.assessmentRef
      ? `A-${data.assessmentRef}`
      : undefined,
    "Release Order No.": data.dutyRef ? `R-${data.dutyRef}` : undefined,
  };

  return (
    <Card className="flex flex-col divide-y-2 px-2! text-sm">
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="font-semibold text-base">Duty</div>
        <DialogFileDuty fileNo={fileNo} year={year} data={data}>
          <Button
            variant="outline"
            Icon={
              <MdOutlineEdit className="text-muted group-hover:text-foreground transition-colors" />
            }
          />
        </DialogFileDuty>
      </div>
      {!dutyData || Object.keys(dutyData).length === 0 ? (
        <div className="flex justify-center items-center h-full">
          No data found.
        </div>
      ) : (
        <div className="flex flex-col divide-y-2">
          {Object.entries(dutyRef).map(([key, value]) => (
            <RowData key={key} label={key} value={value} />
          ))}
          {dutyRows.map(({ label, value }) => (
            <RowData
              key={label}
              label={label}
              value={value}
              valueType="currency"
            />
          ))}
          <RowData
            key="total-duty"
            label="Total Duty"
            value={totals.duty}
            valueType="currency"
            className={{
              label: "font-semibold text-foreground!",
              value: "font-semibold",
            }}
          />
          <RowData label="Note" value={data.dutyPaid} />
        </div>
      )}
    </Card>
  );
}
