import { useEffect } from 'react';
import { Appearance, Pressable, useColorScheme, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';

const THEME_KEY = 'theme-app';

export default function ThemeToggle() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const translateX = useSharedValue(isDark ? 38 : 3.5);

  useEffect(() => {
    translateX.value = withSpring(isDark ? 38 : 3.5, {
      damping: 100,
      stiffness: 1000,
    });
  }, [isDark, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const toggle = async () => {
    Appearance.setColorScheme(isDark ? 'light' : 'dark');
    await AsyncStorage.setItem(THEME_KEY, isDark ? 'light' : 'dark');
  };

  return (
    <Pressable
      onPress={toggle}
      className="bg-border-strong relative h-10 w-20 flex-row items-center justify-between gap-1 rounded-full p-1">
      <Icon name="sun" />
      <Icon name="moon" />
      <Animated.View
        style={animatedStyle}
        className="bg-background absolute h-8 w-8 items-center justify-center rounded-full"
      />
    </Pressable>
  );
}

function Icon({ name }: { name: 'sun' | 'moon' }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="z-10 h-8 w-8 items-center justify-center rounded-full">
      <Feather name={name} size={18} color={isDark ? 'white' : 'black'} />
    </View>
  );
}
