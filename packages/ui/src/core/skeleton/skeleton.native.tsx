import { Children, isValidElement } from "react";
import { View } from "react-native";

const Skeleton = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof View>) => {
  return (
    <View className={`animate-pulse ${className ?? ""}`} {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return (
          <View
            key={child.key ?? `skeleton-child-${index}`}
            className="bg-foreground/20 rounded-md"
          >
            {child}
          </View>
        );
      })}
    </View>
  );
};

export { Skeleton };
