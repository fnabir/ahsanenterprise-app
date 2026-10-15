import { Stack, usePathname } from 'expo-router';
import { useObject } from 'react-firebase-hooks/database';
import { getDatabaseReference } from '@repo/firebase';
import { View, Pressable, Text } from 'react-native';
import { useMemo, useState } from 'react';
import { TransactionData } from '@repo/types';
import Empty from '@/components/Empty';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { cn, TotalBalanceSync } from '@repo/core';
import { Motion } from '../../../../../packages/ui/src/animation/motion/motion.native';
import { Card } from '../../../../../packages/ui/src/core/card';
import { AnimatedNumber } from '../../../../../packages/ui/src/animation/number/number.native';
import { CardTotal } from '../../../../../packages/ui/src/custom/card-total/card-total.native';

export default function ImporterTransactionScreen() {
  const importer = usePathname().split('/').pop();
  const [transactionType, setTransactionType] = useState<'Bill' | 'Payment'>('Bill');

  const [transactionData, transactionLoading, transactionError] = useObject(
    getDatabaseReference(`transaction/importer/${importer}`)
  );

  const [totalBalanceData, totalBalanceLoading, totalBalanceError] = useObject(
    getDatabaseReference(`balance/importer/${importer}`)
  );

  const loading = transactionLoading || totalBalanceLoading;
  const error = transactionError || totalBalanceError;

  const transactions = useMemo(() => transactionData?.val() ?? {}, [transactionData]);

  const bills: [string, TransactionData][] = useMemo(
    () => (transactions.bill ? Object.entries(transactions.bill) : []),
    [transactions]
  );
  const payments: [string, TransactionData][] = useMemo(
    () => (transactions.payment ? Object.entries(transactions.payment) : []),
    [transactions]
  );

  const totalBalanceVal = totalBalanceData?.val();

  const totalBill = bills.reduce((acc, [, transaction]) => acc + (transaction.value ?? 0), 0);
  const totalPayment = payments.reduce((acc, [, transaction]) => acc + (transaction.value ?? 0), 0);
  const calculatedBalance = totalBill - totalPayment;

  const transactionsToDisplay = useMemo(
    () => (transactionType === 'Bill' ? bills : payments),
    [transactionType, bills, payments]
  );

  const showUI = !loading && !error && transactions;

  return (
    <>
      <Stack.Screen
        options={{
          title: importer ?? 'Importer',
        }}
      />
      <View className="bg-background h-full flex-col">
        {showUI && (
          <View className="border-border-strong flex-row gap-2 border-b px-4 py-2">
            <Pressable
              className={`text-foreground flex-1 rounded-md py-1 ${transactionType === 'Bill' ? 'bg-primary' : 'bg-primary-subtle'}`}
              onPress={() => setTransactionType('Bill')}>
              <Text
                className={cn(
                  'text-center text-lg',
                  transactionType === 'Bill' ? 'text-primary-foreground' : 'text-primary'
                )}>
                Bills
              </Text>
            </Pressable>
            <Pressable
              className={`text-foreground flex-1 rounded-md py-1 ${transactionType === 'Payment' ? 'bg-primary' : 'bg-primary-subtle'}`}
              onPress={() => setTransactionType('Payment')}>
              <Text
                className={cn(
                  'text-center text-lg',
                  transactionType === 'Payment' ? 'text-primary-foreground' : 'text-primary'
                )}>
                Payments
              </Text>
            </Pressable>
          </View>
        )}
        <View className="flex-1 flex-col items-center justify-center">
          {loading ? (
            <Loading text="Loading transactions..." />
          ) : error ? (
            <Error
              title="Failed to get the importer transactions."
              message={error.message ?? 'An unknown error occurred.'}
            />
          ) : !transactions ? (
            <Empty text="No transactions found" />
          ) : transactionsToDisplay.length === 0 ? (
            <Empty text={`No ${transactionType}s record found`} />
          ) : (
            <Motion.ScrollView
              key={transactionType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1">
              <View className="h-full flex-col gap-2 px-4 pt-2 pb-2">
                {transactionsToDisplay.reverse().map(([key, transaction]) => (
                  <Card
                    key={key}
                    className="max-w-full min-w-full flex-row items-center justify-between gap-2">
                    <View className="flex-1">
                      <Text className="text-muted font-sans text-sm">{transaction.date}</Text>
                      <Text className="font-sans-semibold text-foreground">
                        {transaction.title}
                      </Text>
                      {transaction.details && (
                        <Text className="text-muted font-sans text-[15px]">
                          {transaction.details}
                        </Text>
                      )}
                    </View>
                    <AnimatedNumber value={transaction.value} valueType="currency" />
                  </Card>
                ))}
              </View>
            </Motion.ScrollView>
          )}
        </View>
        {!loading &&
          !error &&
          (transactionType === 'Bill' ? bills.length > 0 : payments.length > 0) && (
            <CardTotal
              label={`Total ${transactionType}`}
              value={transactionType === 'Bill' ? totalBill : totalPayment}
              type="other"
              className="pb-2!"
            />
          )}
        {showUI && (
          <CardTotal value={calculatedBalance} date={totalBalanceVal?.date} type="importer" />
        )}
        <TotalBalanceSync path={`balance/importer/${importer}`} total={calculatedBalance} />
      </View>
    </>
  );
}
