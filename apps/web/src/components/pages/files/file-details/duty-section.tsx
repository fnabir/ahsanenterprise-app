import { FileData } from "@repo/types";
import { Card, RowData } from "@repo/ui";
import { FILE_DUTY_ORDER } from "@repo/core";

export default function DutySection({
  data,
  total,
}: {
  data: FileData;
  total: number;
}) {
  const dutyData = data.duty ?? {};
  if (!dutyData || Object.keys(dutyData).length === 0) {
    return null;
  }

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
      <div className="font-semibold pb-1 text-base">Duty</div>
      {Object.entries(dutyRef).map(([key, value]) => (
        <RowData key={key} label={key} value={value} />
      ))}
      {dutyRows.map(({ label, value }) => (
        <RowData key={label} label={label} value={value} valueType="currency" />
      ))}
      <RowData
        key="total-duty"
        label="Total Duty"
        value={total}
        valueType="currency"
        className={{
          label: "font-semibold text-foreground!",
          value: "font-semibold",
        }}
      />
      <RowData label="Note" value={data.dutyPaid} />
    </Card>
  );
}
