import { View, Pressable } from "react-native";
import { memo } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { router } from "expo-router";
import { OrderItemHeader } from "../../Components/OrderHeader";
import { OrderItemLocations } from "../../Components/OrderLocations";
import { OrderItemInfo } from "../../Components/OrderInfo";
import { DriverTimeline } from "../../Components/OrderDriverStatus";
import { safeNavigate } from "@/utils/safe-navigation";

function GivenCustomerOrderItem({
  order,
  path,
}: {
  index: number;
  order: any;
  path: string;
}) {
  const Colors = useThemeColors();

  const inOrder = () => {
    safeNavigate(() =>
      router.push({
        pathname: path + order.id,
        params: { order_id: JSON.stringify(order.id) },
      })
    );
  };

  return (
    <View style={[styles.box]}>
      <Pressable
        onPress={inOrder}
        android_ripple={{
          color: Colors.borderColor,
          borderless: false,
          radius: 200,
        }}
        style={[styles.item, { backgroundColor: Colors.Boxbackground }]}
      >
        <OrderItemHeader order={order} />
        <OrderItemLocations order={order} />
        <View style={[styles.line, { backgroundColor: Colors.borderColor }]} />
        <OrderItemInfo order={order} />
        <DriverTimeline status={order.status.driver} />
      </Pressable>
    </View>
  );
}

export default memo(GivenCustomerOrderItem);
