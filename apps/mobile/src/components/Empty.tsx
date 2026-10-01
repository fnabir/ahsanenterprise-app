import { View, Text } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

const Empty = ({ text }: { text: string }) => {
  return (
    <View className="flex-col items-center justify-center gap-2">
      <ThemedIcon name="file-document" size={48} color="primary" />
      <Text className="text-foreground font-sans-semibold text-xl">{text}</Text>
    </View>
  );
};

export default Empty;
