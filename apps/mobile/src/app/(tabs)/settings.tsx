import { View, Text, ScrollView, useColorScheme, Linking } from 'react-native';
import { cn } from '@repo/core';
import { useAuth } from '../../../../../packages/ui/src/contexts/AuthContext';
import packageJson from '../../../../../package.json';
import { signOut } from '../../../../../packages/firebase/src/auth';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { ThemedIcon } from '@/components/ThemedIcon';
import { useNavigationWithLoading } from '@/hooks/useNavigationWithLoading';
import { RowData } from '../../../../../packages/ui/src/custom/row-data';

export default function SettingsScreen() {
  const { navigate } = useNavigationWithLoading();
  const colorScheme = useColorScheme();
  const { user, userData } = useAuth();

  return (
    <View className="bg-background pt-safe h-full flex-col">
      <ScrollView className="border-border-strong h-full flex-1 flex-col border-y-2 px-4">
        <View className="border-border w-full flex-col gap-2 border-b-2 py-4">
          <RowData
            label="Name"
            className={{ label: 'text-xl', value: 'text-xl' }}
            value={userData?.name}
          />
          <RowData
            label="Email"
            className={{ label: 'text-xl', value: 'text-xl' }}
            value={user?.email}
          />
          <RowData
            label="Phone"
            className={{ label: 'text-xl', value: 'text-xl' }}
            value={userData?.phone}
          />
        </View>
        <View className="border-border w-full flex-col gap-2 border-b-2 py-4">
          <RowData
            label="App Version"
            className={{ label: 'text-xl', value: 'text-xl' }}
            value={packageJson.version}
          />
        </View>
        <View className="border-border flex-col gap-3 py-4">
          <SettingsButton
            label="Asian Lift Bangladesh"
            className="bg-primary"
            theme={colorScheme}
            icon="web"
            onClick={async () => {
              const url = 'https://asianliftbd.com';
              if (await Linking.canOpenURL(url)) {
                await Linking.openURL(url);
              }
            }}
          />
          <SettingsButton
            label="Changelog"
            className="bg-primary"
            theme={colorScheme}
            icon="update"
            onClick={async () => {
              navigate('/changelog');
            }}
          />
          <SettingsButton
            label="Logout"
            className="bg-danger"
            theme={colorScheme}
            icon="logout"
            onClick={async () => {
              await signOut();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const SettingsButton = ({
  label,
  className,
  icon,
  onClick,
  theme,
}: {
  label: string;
  className?: string;
  icon?: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  onClick: () => Promise<void>;
  theme: 'light' | 'dark' | 'unspecified';
}) => {
  theme = theme === 'unspecified' ? 'light' : theme;

  return (
    <View
      className={cn(
        'bg-primary flex-row items-center justify-between gap-2 rounded-lg px-4 py-2',
        className
      )}
      onTouchEnd={onClick}>
      <Text className="font-sans-semibold text-primary-foreground text-center text-lg">
        {label}
      </Text>
      {icon && <ThemedIcon name={icon} size={20} color="foreground" />}
    </View>
  );
};
