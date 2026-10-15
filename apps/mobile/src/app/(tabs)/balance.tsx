import { ScrollView, View } from 'react-native';
import { getDatabaseReference } from '../../../../../packages/firebase/src/helpers';
import { useList } from 'react-firebase-hooks/database';
import { BalanceTotal } from '@repo/types';
import { CardBalanceTotal } from '../../../../../packages/ui/src/custom/card-balance-total';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function CompanyScreen() {
  const [balanceData, loading, error] = useList(getDatabaseReference('balance/total'));

  return (
    <View className="bg-background py-safe h-full flex-col items-center justify-center px-4">
      {loading ? (
        <Loading text="Loading balance..." />
      ) : error ? (
        <Error
          title="Failed to get the balances."
          message={error.message ?? 'An unknown error occurred.'}
        />
      ) : (
        <ScrollView className="h-full w-full">
          <View className="gap-3 py-4">
            {balanceData?.map((item) => {
              const key = item.key!;
              const val = item.val() as BalanceTotal;
              const value = val.value;
              return (
                <CardBalanceTotal
                  key={key}
                  id={key}
                  value={value}
                  date={val.date}
                  note={
                    key === 'staff' && value !== 0
                      ? value < 0
                        ? 'Outstanding Balance'
                        : 'Payable to Staff'
                      : undefined
                  }
                  noteClassName={
                    key === 'staff' && value !== 0
                      ? value < 0
                        ? 'text-danger'
                        : 'text-success'
                      : ''
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
