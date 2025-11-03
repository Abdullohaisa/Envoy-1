import AppText from "@/components/Texts/Text";
import { View } from "react-native";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import Octicons from "@expo/vector-icons/Octicons";
import { useThemeColors } from "@/theme/useThemeColors";

export const OrderItemLocations = ({ order }: { order: any }) => {
  const Colors = useThemeColors();
  return (
    <View
      style={{
        gap: 3,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* Boshlanish */}
      <View style={styles.locationItem}>
        <Octicons name={"dot"} size={12} color={"#2ecc71"} />
        <AppText
          variant="semiBold"
          style={[styles.locationItemText, { color: Colors.textPrimary }]}
        >
          {order.locations.pickup[0].short_title}
        </AppText>
      </View>

      {/* O‘rtadagi */}
      <View style={styles.locationItem}>
        {order.locations.pickup.map((_: any, i: number) =>
          i === 0 ? null : (
            <Octicons key={`p${i}`} name={"dot"} size={12} color={"#2ecc71"} />
          )
        )}
        {order.locations.dropoff.map((_: any, i: number) =>
          i === 0 ? null : (
            <Octicons key={`d${i}`} name={"dot"} size={12} color={"#e74c3c"} />
          )
        )}
      </View>

      {/* Tugash */}
      <View style={styles.locationItem}>
        <AppText
          variant="semiBold"
          style={[styles.locationItemText, { color: Colors.textPrimary }]}
        >
          {order.locations.dropoff[0].short_title}
        </AppText>
        <Octicons name={"dot"} size={12} color={"#e74c3c"} />
      </View>
    </View>
  );
};
