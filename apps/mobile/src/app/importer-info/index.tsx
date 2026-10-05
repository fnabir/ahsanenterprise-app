import { ScrollView, View } from 'react-native';
import HeaderBar from '@/components/HeaderBar';
import { useImporterLoading, useImporterError, useImporterData } from '@repo/core';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';
import { CardInfoImporter } from '../../../../../packages/ui/src/custom/card-info-importer/card-info-importer.native';

export default function ImporterInfoScreen() {
  const loading = useImporterLoading();
  const error = useImporterError();
  const data = useImporterData();

  return (
    <View className="bg-background py-safe h-full flex-col">
      <HeaderBar title="Importer Info" />
      <View className="flex-1 flex-col items-center justify-center">
        {loading ? (
          <Loading text="Loading importer information..." />
        ) : error ? (
          <Error
            title="Failed to get the importer information."
            message={error ?? 'An unknown error occurred.'}
          />
        ) : !data || Object.keys(data).length === 0 ? (
          <Empty text="No importer information found." />
        ) : (
          <ScrollView className="h-full">
            <View className="flex-col gap-3 p-4">
              {Object.entries(data).map(([key, value], i) => (
                <CardInfoImporter key={i} id={key} data={value} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
