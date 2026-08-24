import { View } from "react-native";

const Card = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof View>) => {
  return (
    <View
      className={`bg-card text-card-foreground px-4 py-2 shadow hover:shadow-lg ${className ?? ""}`}
      {...props}
    >
      {children}
    </View>
  );
};

export { Card };
