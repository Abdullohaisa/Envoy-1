import { StyleSheet, View } from "react-native";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";

const OrderItemRequests = ({ requested_drivers_length }: any) => {
  const Colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <AppText
        variant="regular"
        style={{
          color: Colors.primary,
          fontSize: 12,
          borderTopWidth: 1,
          borderColor: Colors.borderColor,
          paddingTop: 7,
        }}
      >
        So'ralgan - {requested_drivers_length}
      </AppText>
    </View>
  );
};

export default OrderItemRequests;

const styles = StyleSheet.create({});
