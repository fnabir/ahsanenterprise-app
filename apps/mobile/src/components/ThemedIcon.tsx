import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useColorScheme } from 'react-native';
import { colors } from '@repo/styles/colors';

type ThemedIconProps = {
  name: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  size?: number;
  color?: keyof typeof colors.light;
};

export function ThemedIcon({ name, size = 20, color = 'text' }: ThemedIconProps) {
  const colorScheme = useColorScheme();

  return (
    <MaterialDesignIcons
      name={name}
      size={size}
      color={colors[colorScheme === 'dark' ? 'dark' : 'light'][color]}
    />
  );
}
