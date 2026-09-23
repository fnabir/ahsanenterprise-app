import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type itemProps = {
  href?: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  details?: string;
  color: string;
};

const items: itemProps[] = [
  {
    href: '/ledger',
    icon: 'file-tray-full',
    title: 'Financial Ledger',
    details: 'Daily Cash Flow',
    color: '#4ade80',
  },
  {
    href: '/inventory',
    icon: 'cube',
    title: 'Inventory',
    details: 'Item Name, Count',
    color: '#3b82f6',
  },
  {
    href: '/error',
    icon: 'book',
    title: 'Error Code',
    details: 'NICE 3000',
    color: '#ef4444',
  },
];

export default function CompanyScreen() {
  return (
    <View className="pt-safe">
      <ScrollView className="h-full bg-gray-400 p-4">
        <View className="gap-4">
          <Text className="text-primary font-sans-bold text-center text-2xl">Balance</Text>
        </View>
      </ScrollView>
    </View>
  );
}
