import { Pressable, Text, useColorScheme, View } from 'react-native';
import { ThemedIcon } from '@/components/ThemedIcon';
import { useRouter } from 'expo-router';
import { colors } from '@repo/styles/colors';

const HeaderBar = ({ title }: { title: string }) => {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <View className="bg-surface-raised border-border-strong flex-row items-center justify-between gap-2 border-b-2 px-4 py-1">
      <View className="h-10 w-10 overflow-hidden rounded-full">
        <Pressable
          className="p-1.25"
          onPress={() => router.back()}
          android_ripple={{
            color: colors[colorScheme]['primarySubtle'],
          }}>
          <ThemedIcon name="arrow-left" size={24} />
        </Pressable>
      </View>

      <Text className="text-foreground font-sans-semibold flex-1 text-center text-xl text-nowrap">
        {title}
      </Text>
      <View className="h-10 w-10 overflow-hidden rounded-full"></View>
    </View>
  );
};

export default HeaderBar;
