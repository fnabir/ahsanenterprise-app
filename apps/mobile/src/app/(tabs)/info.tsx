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
    href: '/project-info',
    icon: 'business',
    title: 'Project Info',
    details: 'Details, Contact',
    color: '#4ade80',
  },
  {
    href: '/payment-info',
    icon: 'card',
    title: 'Payment Info',
    details: 'Method, Details',
    color: '#3b82f6',
  },
  {
    href: '/callback',
    icon: 'build-outline',
    title: 'Callback',
    details: 'Details, Status',
    color: '#ef4444',
  },
];

export default function ProjectsScreen() {
  return (
    <SafeAreaView>
      <ScrollView className="p-4">
        <View className="gap-4">
          <Text className="text-primary text-center text-2xl font-medium">Info</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
