import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../../../packages/ui/src/core/button/button.native';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View className="bg-background p-safe h-full flex-col items-center justify-center">
      <Text className="text-foreground font-mono-bold mb-2 text-4xl">404</Text>
      <Text className="text-foreground font-sans-bold mb-2 text-xl">Page Not Found</Text>
      <Text className="text-muted mb-8 text-center text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <View className="flex-row gap-2">
        <Button
          label="Go Home"
          variant="primary"
          onClick={() => {
            router.push('/');
          }}
        />
        <Button
          label="Go Back"
          variant="muted"
          onClick={() => {
            router.back();
          }}
        />
      </View>
    </View>
  );
}
