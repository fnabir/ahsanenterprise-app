import { Card, Number } from "../..";
import type { ImporterData } from "@repo/types";

export function CardInfoImporter({
  id,
  data,
}: {
  id: string;
  data: ImporterData;
}) {
  const isAddressAvailable = data.address1 || data.address2 || data.address3;
  const isCommissionAvailable = data.commission ? data.commission !== 0 : false;
  const isMinCommissionAvailable = data.minCommission
    ? data.minCommission !== 0
    : false;
  const isMiscExpenseAvailable = data.miscExpense
    ? data.miscExpense !== 0
    : false;
  const isValueAvailable =
    isCommissionAvailable || isMinCommissionAvailable || isMiscExpenseAvailable;
  return (
    <Card className="flex flex-col divide-y-2 text-sm gap-1">
      <div className="font-semibold text-base pb-1">{id}</div>
      <div className="pb-1">
        {isAddressAvailable && (
          <>
            <div>{data.address1}</div>
            <div>{data.address2}</div>
            <div>{data.address3}</div>
          </>
        )}
      </div>
      {isValueAvailable && (
        <div>
          {data.commission && (
            <div className="flex justify-between items-center gap-2">
              <div>Commission</div>
              <div>{data.commission}%</div>
            </div>
          )}
          {isMinCommissionAvailable && (
            <div className="flex justify-between items-center gap-2">
              <div>Minimum Commission</div>
              <Number value={data.minCommission!} valueType="currency" />
            </div>
          )}
          {isMiscExpenseAvailable && (
            <div className="flex justify-between items-center gap-2">
              <div>Miscellaneous Expense</div>
              <Number value={data.miscExpense!} valueType="currency" />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
