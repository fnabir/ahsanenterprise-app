import { TotalBalanceSync } from '@repo/core';
import { getDatabaseReference } from '@repo/firebase';
import { BalanceTotal } from '@repo/types';
import { useObject } from 'react-firebase-hooks/database';
import { useUniqueList } from '@repo/firebase';
import { ScrollView, View } from 'react-native';
import HeaderBar from '@/components/HeaderBar';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';
import { CardBalanceTotal } from '../../../../../packages/ui/src/custom/card-balance-total';
import { CardTotal } from '../../../../../packages/ui/src/custom/card-total/card-total.native';

export default function ImporterBalanceScreen() {
  const [balanceData, balanceLoading, balanceError] = useUniqueList(
    getDatabaseReference(`balance/importer`)
  );

  const [totalBalanceDate, totalBalanceLoading, totalBalanceError] = useObject(
    getDatabaseReference(`balance/total/importer`)
  );

  const loading = balanceLoading || totalBalanceLoading;
  const error = balanceError || totalBalanceError;
  const total =
    balanceData?.reduce((acc, item) => acc + (item.val() as BalanceTotal).value, 0) ?? 0;

  return (
    <View className="bg-background pt-safe h-full flex-col">
      <HeaderBar title="Importer Balance" />
      <View className="flex-1 flex-col items-center justify-center">
        {loading ? (
          <Loading text="Loading importer balance..." />
        ) : error ? (
          <Error
            title="Failed to get the importer balance."
            message={error.message ?? 'An unknown error occurred.'}
          />
        ) : !balanceData?.length ? (
          <Empty text="No balance available for any importer." />
        ) : (
          <ScrollView className="h-full">
            <View className="flex-col gap-2 p-4">
              {balanceData.map((item) => {
                const key = item.key!;
                const val = item.val() as BalanceTotal;
                const value = val.value;
                return (
                  <CardBalanceTotal
                    key={key}
                    id={key}
                    href={`/importer-balance/${key}`}
                    value={value}
                    date={val.date}
                    className="w-full"
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
      {!loading && !error && balanceData?.length && (
        <CardTotal value={total} date={totalBalanceDate?.val()?.date} type="importer" />
      )}
      <TotalBalanceSync path={`balance/total/importer`} total={total} />
    </View>
  );
}
