import { Text, TouchableOpacity } from "react-native";

export function Button() {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Text>Button</Text>
    </TouchableOpacity>
  );
}
