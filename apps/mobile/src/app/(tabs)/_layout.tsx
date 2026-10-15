import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';
import '../../global.css';
import { colors } from '@repo/styles/colors';
import { Stack, useSegments } from 'expo-router';

const tabNameMap: Record<string, string> = {
  balance: 'Balance',
  info: 'Info',
  settings: 'Settings',
};

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const c = isDark ? colors.dark : colors.light;

  const segments = useSegments();
  const activeTab = segments.find((segment) => segment in tabNameMap);
  const selectedRouteName = activeTab ? tabNameMap[activeTab] : 'Ahsan Enterprise';

  const color = {
    background: c.surfaceRaised,
    indicator: c.primarySubtle,
    icon: {
      default: c.textTertiary,
      selected: c.primary,
    },
    text: {
      selected: c.primary,
      default: c.textSecondary,
    },
    ripple: c.primarySubtle,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: selectedRouteName,
        }}
      />
      <NativeTabs
        tabBarRespectsIMEInsets
        iconColor={{
          default: color.icon.default, // inactive tab icon color
          selected: color.icon.selected, // active tab icon color
        }}
        labelStyle={{
          default: { color: color.text.default },
          selected: { color: color.text.selected },
        }}
        indicatorColor={color.indicator}
        backgroundColor={color.background}>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon sf="folder" md="folder" />
          <NativeTabs.Trigger.Label>Files</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="balance">
          <NativeTabs.Trigger.Icon sf="dollarsign" md="currency_exchange" />
          <NativeTabs.Trigger.Label>Balance</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="info">
          <NativeTabs.Trigger.Icon sf="briefcase" md="business_center" />
          <NativeTabs.Trigger.Label>Info</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Icon sf="gear" md="settings" />
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </>
  );
}
