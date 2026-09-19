import { View } from "react-native";

const Card = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof View>) => {
  return (
    <View className={`bg-surface p-4 shadow ${className ?? ""}`} {...props}>
      {children}
    </View>
  );
};

export { Card };
