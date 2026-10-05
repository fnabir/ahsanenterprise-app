import type { ImporterData } from "@repo/types";
import { Card } from "../../core/card/card.native";
import { Text, View } from "react-native";
import { RowData } from "../row-data/row-data.native";

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
    <Card className="max-w-full min-w-full">
      <Text className="text-foreground font-sans-semibold text-lg">{id}</Text>
      {isAddressAvailable && (
        <View>
          {data.address1 && (
            <Text className="text-foreground text-base">{data.address1}</Text>
          )}
          {data.address2 && (
            <Text className="text-foreground text-base">{data.address2}</Text>
          )}
          {data.address3 && (
            <Text className="text-foreground text-base">{data.address3}</Text>
          )}
        </View>
      )}
      {isValueAvailable && (
        <View className="border-t border-border-strong mt-2 flex-col gap-1 pt-2">
          <RowData
            label="Commission"
            value={isCommissionAvailable ? data.commission : undefined}
          />
          <RowData
            label="Min Commission"
            value={isMinCommissionAvailable ? data.minCommission : undefined}
            valueType="currency"
          />
          <RowData
            label="Misc Expense"
            value={isMiscExpenseAvailable ? data.miscExpense : undefined}
            valueType="currency"
          />
        </View>
      )}
    </Card>
  );
}
