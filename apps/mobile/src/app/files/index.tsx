import { View } from 'react-native';
import { getCurrentYear, useFileLoading, useFilesByYear, useFileError, useYear } from '@repo/core';
import { Stack } from 'expo-router';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';
import { Motion } from '../../../../../packages/ui/src/animation/motion/motion.native';
import { CardFile } from '../../../../../packages/ui/src/custom/card-file';

const currentYear = getCurrentYear();
const getYearsRange = (start = 2021, end = currentYear) =>
  Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
  })).reverse();
const validYears = getYearsRange().map((y) => y.value);

const FilesScreen = () => {
  const { year, changeYear } = useYear(validYears);
  const loading = useFileLoading();
  const error = useFileError();
  const files = useFilesByYear(year);
  const isEmpty = !loading && Object.keys(files).length === 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Files',
        }}
      />
      <View className="bg-background py-safe h-full flex-col">
        <View className="flex-1 flex-col items-center justify-center">
          {loading ? (
            <Loading text="Loading files..." />
          ) : error ? (
            <Error message={error} />
          ) : isEmpty ? (
            <Empty text={`No files found for year ${year}`} />
          ) : (
            <Motion.ScrollView
              key={year}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full">
              <View className="flex-1 flex-col gap-2 p-4">
                {Object.entries(files)
                  .reverse()
                  .map(([fileKey, data]) => (
                    <CardFile key={fileKey} year={year} fileKey={fileKey} data={data} />
                  ))}
              </View>
            </Motion.ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default FilesScreen;
