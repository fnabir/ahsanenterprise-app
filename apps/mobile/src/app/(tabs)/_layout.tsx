import { NativeTabs } from 'expo-router/unstable-native-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform, useColorScheme } from 'react-native';
import { Icon, VectorIcon } from 'expo-router';
import '../../global.css';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isIOS = Platform.OS === 'ios';

  const color = {
    background: isDark ? '#18181b' : '#fafafa',
    indicator: isDark ? '#3f3f47' : '#18181b',
    icon: {
      default: isDark ? '#6b7280' : '#52525b',
      selected: isDark ? '#fafafa' : '#fafafa',
    },
    text: {
      selected: isIOS ? '#fafafa' : isDark ? '#fafafa' : '#18181b',
      default: isDark ? '#9f9fa9' : '#3f3f47',
    },
    ripple: isIOS ? '#3f3f47' : '#18181b',
  };
  return (
    <NativeTabs
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
        <NativeTabs.Trigger.Label>Files</NativeTabs.Trigger.Label>
        <Icon src={<VectorIcon family={Ionicons} name="folder" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="balance">
        <NativeTabs.Trigger.Label>Balance</NativeTabs.Trigger.Label>
        <Icon src={<VectorIcon family={Ionicons} name="briefcase" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="info">
        <NativeTabs.Trigger.Label>Info</NativeTabs.Trigger.Label>
        <Icon src={<VectorIcon family={Ionicons} name="briefcase" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <Icon src={<VectorIcon family={Ionicons} name="settings" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
