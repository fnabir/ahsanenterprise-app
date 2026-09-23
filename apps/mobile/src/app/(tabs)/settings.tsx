import { View, Text, ScrollView } from 'react-native';
import packageJson from '@/../../../../package.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '../../../../../packages/ui/src/core/button';
import { signOut } from '../../../../../packages/firebase/src/auth';

export default function SettingsScreen() {
  return (
    <SafeAreaView>
      <ScrollView className="p-4">
        <View className="gap-4">
          <Text className="text-primary text-center text-2xl font-bold">Settings</Text>
        </View>
        <View className="flex w-full flex-row items-center justify-between gap-2">
          <Text className="font-sans-semibold text-center text-xl">Theme</Text>
          <ThemeToggle />
        </View>
        <Button
          label="Logout"
          onClick={async () => {
            await signOut();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
