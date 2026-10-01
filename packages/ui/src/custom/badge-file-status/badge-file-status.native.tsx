import { Text, View } from "react-native";
import { badgeBgStyle, badgeTextStyle, dotStyle } from "./styles";
import { useAuth } from "../../contexts/AuthContext";

const BadgeFileStatus = ({ status }: { status: string }) => {
  const { isAdmin } = useAuth();
  if (!status) return null;
  status = !isAdmin && status === "Bill" ? "Done" : status;

  const style = (() => {
    switch (status) {
      case "Assessment":
        return "info";
      case "Duty Payment":
        return "warning";
      case "Delivery":
        return "accent";
      case "Bill":
        return "secondary";
      case "Done":
        return "success";
      default:
        return "muted";
    }
  })();

  return (
    <View
      className={`${badgeBgStyle[style]} flex-row items-center border rounded-full px-2 py-0.5`}
    >
      <View
        className={`w-2 h-2 overflow-hidden rounded-full mr-2 ${dotStyle[style]}`}
      />
      <Text className={badgeTextStyle[style]}>{status}</Text>
    </View>
  );
};

export { BadgeFileStatus };
