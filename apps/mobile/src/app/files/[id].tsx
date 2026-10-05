import { Text, View } from 'react-native';
import {
  useFileLoading,
  useFileError,
  useFileTotals,
  useFileDetails,
  getFullFileNo,
  cn,
} from '@repo/core';
import HeaderBar from '@/components/HeaderBar';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';
import { Motion } from '../../../../../packages/ui/src/animation/motion/motion.native';
import { useLocalSearchParams } from 'expo-router';
import { RowData } from '../../../../../packages/ui/src/custom/row-data/row-data.native';
import { Card } from '../../../../../packages/ui/src/core/card';
import { AnimatedNumber } from '../../../../../packages/ui/src/animation/number/number.native';
import { ThemedIcon } from '@/components/ThemedIcon';
import { Button } from '../../../../../packages/ui/src/core/button';
import { useMemo } from 'react';

function setBalanceStyle(balance: number) {
  if (balance > 0) {
    return {
      title: 'OUTSTANDING BALANCE',
      cardClassName: 'bg-danger-subtle! border-danger',
      textClassName: `text-danger`,
    };
  } else if (balance < 0) {
    return {
      title: 'OVERPAID BALANCE',
      cardClassName: 'bg-warning-subtle! border-warning',
      textClassName: `text-warning`,
    };
  } else {
    return {
      title: 'BALANCE',
      cardClassName: 'bg-success-subtle! border-success',
      textClassName: `text-success`,
    };
  }
}

export default function FileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [year, fileNo] = id.split('-');
  const loading = useFileLoading();
  const error = useFileError();
  const data = useFileDetails(year, fileNo);
  const totals = useFileTotals(year, fileNo);
  const fullFileNo = getFullFileNo(Number(fileNo), Number(year));
  const balanceStyle = setBalanceStyle(totals.balance);

  const isValuesAvailable = data
    ? data.cnfValue || data.assessableValue || data.miscellaneous || data.commission
    : false;
  const isDatesAvailable = data
    ? data.assessmentDate || data.dutyPaymentDate || data.deliveryDate
    : false;

  const values = useMemo(() => {
    return {
      'C&F Value': { value: data?.cnfValue, currency: '$' },
      'Assessable Value': { value: data?.assessableValue, currency: '৳' },
      Miscellaneous: { value: totals.miscellaneous, currency: '৳' },
      Commission: { value: totals.commission, currency: '৳' },
    };
  }, [data, totals]);

  const dates = useMemo(() => {
    if (!data) return {};

    return {
      Assessment: data.assessmentDate,
      'Duty Payment': data.dutyPaymentDate,
      Delivery: data.deliveryDate,
    };
  }, [data]);

  const info = useMemo(() => {
    if (!data) return {};

    return {
      Importer: data.importer,
      Item: data.itemName,
      Package: data.itemPackage,
      'Item Count': `${data.itemCount && data.itemCount > 1 ? data.itemCount : 1} item${data.itemCount && data.itemCount > 1 ? 's' : ''}`,
      'B/L No.': data.bl,
      'L/C No.': data.lc && data.lc !== '0' ? data.lc : undefined,
      Vessel: data.vessel,
      'Rot No.': data.rotNo,
      'B/E No.': data.be && data.be !== 0 ? `C-${data.be}` : undefined,
      'B/E Date': data.beDate,
    };
  }, [data]);

  return (
    <View className="bg-background py-safe h-full">
      <HeaderBar title={fullFileNo} />
      <View className="h-full flex-col items-center justify-center">
        {loading ? (
          <Loading text="Loading file details..." />
        ) : error ? (
          <Error title="Failed to load file details" message={error} />
        ) : !data ? (
          <Empty text={`No data found for file ${fullFileNo}.`} />
        ) : (
          <Motion.ScrollView
            key={year}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full p-4">
            <View className="flex-col gap-2">
              <Card className={balanceStyle.cardClassName}>
                <View className="flex-row justify-between">
                  <View>
                    <Text className={cn('font-sans-semibold text-lg', balanceStyle.textClassName)}>
                      {balanceStyle.title}
                    </Text>
                    <AnimatedNumber
                      value={totals.balance}
                      valueType="currency"
                      fractionDigits={2}
                      currencyClassName={cn('text-3xl', balanceStyle.textClassName)}
                      valueClassName={cn('text-3xl', balanceStyle.textClassName)}
                    />
                  </View>
                  <Button Icon={<ThemedIcon name="pencil" size={16} />} variant="outline" />
                </View>

                <RowData label="Total" value={totals.grandTotal} valueType="currency" />
                <RowData
                  label="Paid"
                  value={totals.paid ?? 0}
                  valueType="currency"
                  className={{ value: 'text-success' }}
                />
              </Card>
              {isValuesAvailable && (
                <Card>
                  {Object.entries(values).map(([label, { value, currency }]) => (
                    <RowData
                      key={label}
                      label={label}
                      value={value}
                      valueType="currency"
                      currency={currency}
                    />
                  ))}
                </Card>
              )}
              {isDatesAvailable && (
                <Card className="flex-col gap-1">
                  {Object.entries(dates).map(([label, value]) => (
                    <RowData key={label} label={label} value={value} />
                  ))}
                </Card>
              )}
              <Card>
                <View className="border-muted flex-row items-center justify-between gap-2 border-b pb-2">
                  <Text className="font-sans-semibold">File Details</Text>
                  <Button Icon={<ThemedIcon name="pencil" size={16} />} variant="outline" />
                </View>
                {Object.entries(info).map(([label, value], index) => (
                  <RowData
                    key={label}
                    label={label}
                    value={value}
                    className={{
                      main: cn(
                        'py-0.5',
                        index === Object.entries(info).length - 1
                          ? ''
                          : 'border-border-strong border-b'
                      ),
                      value: label === 'Importer' ? 'font-sans-bold' : '',
                    }}
                  />
                ))}
              </Card>
              {data?.remarks && <RowData label="Remarks" value={data.remarks} />}
            </View>
          </Motion.ScrollView>
        )}
      </View>
    </View>
  );
}
