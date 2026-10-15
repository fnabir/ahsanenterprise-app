import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../../../packages/ui/src/core/card';

type itemProps = {
  href?: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  details?: string;
  color: string;
};

const items: itemProps[] = [
  {
    href: '/importer-info',
    icon: 'business',
    title: 'Importer Info',
    details: 'Details, Contact',
    color: '#1583e9',
  },
];

export default function InfoScreen() {
  return (
    <View className="bg-background py-safe h-full">
      <ScrollView className="h-full flex-col px-4">
        <View className="gap-4 py-4">
          {items.map(({ href, icon, title, details, color }) => (
            <Card
              key={title}
              className="border-border-strong flex-row items-center gap-4"
              href={href}>
              <Ionicons name={icon} size={24} color={color} />
              <View>
                <Text className="text-foreground font-sans-semibold text-lg">{title}</Text>
                {details && <Text className="text-muted">{details}</Text>}
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
