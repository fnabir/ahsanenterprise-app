import { ScrollView, View } from 'react-native';
import { changelog } from '@repo/core';
import packageJson from '../../../../../package.json';
import { CardVersion } from '../../../../../packages/ui/src/custom/card-version';
import { Stack } from 'expo-router';

export default function ChangelogScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Changelog' }} />

      <View className="bg-background py-safe h-full flex-col">
        <ScrollView className="h-full">
          <View className="flex-col gap-3 p-4">
            {Object.keys(changelog).map((version, index) => {
              return (
                <CardVersion
                  key={index}
                  version={version}
                  showCurrentVersion={version === packageJson.version}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
