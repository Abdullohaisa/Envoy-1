import { View, Pressable } from "react-native";
import { memo } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { router } from "expo-router";
import { OrderItemHeader } from "../../Components/OrderHeader";
import { OrderItemLocations } from "../../Components/OrderLocations";
import { OrderItemInfo } from "../../Components/OrderInfo";
import { safeNavigate } from "@/utils/safe-navigation";
import { AndroidRipple } from "@/shared/token";

function FinishedCustomerOrderItem({
  order,
  path,
  index,
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
    <View style={[styles.box, {}]}>
      <Pressable
        onPress={inOrder}
        android_ripple={AndroidRipple}
        style={[
          styles.item,
          {
            backgroundColor: Colors.pageBackground,
            borderTopWidth: index === 0 ? 0 : 1,
            borderColor: Colors.borderColor,
          },
        ]}
      >
        <OrderItemHeader order={order} />

        <OrderItemLocations order={order} />

        {/* <View style={[styles.line, { backgroundColor: Colors.borderColor }]} /> */}

        <OrderItemInfo order={order} />
      </Pressable>
    </View>
  );
}

export default memo(FinishedCustomerOrderItem);
