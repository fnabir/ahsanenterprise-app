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

export default function StaffBalanceScreen() {
  const [balanceData, balanceLoading, balanceError] = useUniqueList(
    getDatabaseReference(`balance/staff`)
  );

  const [totalBalanceDate, totalBalanceLoading, totalBalanceError] = useObject(
    getDatabaseReference(`balance/total/staff/date`)
  );

  const loading = balanceLoading || totalBalanceLoading;
  const error = balanceError || totalBalanceError;
  const total =
    balanceData?.reduce((acc, item) => acc + (item.val() as BalanceTotal).value, 0) ?? 0;

  return (
    <View className="bg-background pt-safe h-full flex-col">
      <HeaderBar title="Staff Balance" />
      <View className="flex-1 flex-col items-center justify-center">
        {loading ? (
          <Loading text="Loading staff balance..." />
        ) : error ? (
          <Error
            title="Failed to get the staff balance data."
            message={error.message ?? 'An unknown error occurred.'}
          />
        ) : !balanceData?.length ? (
          <Empty text="No balance record found of any staff." />
        ) : (
          <ScrollView className="h-full">
            <View className="flex-col gap-2 px-3 pt-2 pb-4">
              {balanceData.map((item) => {
                const key = item.key!;
                const val = item.val() as BalanceTotal;
                const value = val.value;
                return (
                  <CardBalanceTotal
                    key={key}
                    id={val.name ?? key}
                    href={`/staff-balance/${key}`}
                    value={value}
                    date={val.date}
                    className="w-full"
                    note={
                      value !== 0
                        ? value < 0
                          ? 'Outstanding Balance'
                          : 'Payable to Staff'
                        : undefined
                    }
                    noteClassName={
                      value !== 0 ? (value < 0 ? 'text-danger!' : 'text-success!') : ''
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
      {!loading && !error && balanceData?.length && (
        <CardTotal value={total} date={totalBalanceDate?.val()?.date} type="staff" />
      )}
      <TotalBalanceSync path={`balance/total/staff`} total={total} />
    </View>
  );
}
