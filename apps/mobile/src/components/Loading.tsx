import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Image, View, Text } from 'react-native';

const Loading = ({ text }: { text?: string }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 800 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View>
      <Image
        source={require('../../assets/adaptive-icon.png')}
        className="m-2 h-20 w-20"
        resizeMode="contain"
      />
      <Animated.View
        style={animatedStyle}
        className="border-primary absolute h-24 w-24 rounded-full border-r-2 border-b-2 p-2"
      />
      <Text className="text-foreground font-sans-semibold mt-4 text-xl">
        {text ?? 'Loading...'}
      </Text>
    </View>
  );
};

export default Loading;
