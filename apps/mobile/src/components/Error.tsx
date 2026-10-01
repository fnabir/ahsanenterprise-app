import { View, Text } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

const Error = ({ title, message }: { title?: string; message?: string }) => {
  return (
    <View className="flex-col items-center justify-center gap-2">
      <ThemedIcon name="alert-octagon-outline" size={48} color="error" />
      <Text className="text-foreground font-sans-semibold text-xl">{title ?? 'Error'}</Text>
      {message && <Text className="text-muted font-sans">{message}</Text>}
    </View>
  );
};

export default Error;
