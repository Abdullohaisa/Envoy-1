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
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { AndroidRipple } from "@/shared/token";

function GivenCustomerOrderItem({
  order,
  path,
  index,
}: {
  index: number;
  order: any;
  path: string;
}) {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);

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
        android_ripple={AndroidRipple}
        style={[
          styles.item,
          {
            backgroundColor:
              theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
            borderTopWidth: index === 0 ? 0 : 1,
            borderColor: Colors.borderColor,
          },
        ]}
      >
        <OrderItemHeader order={order} />
        <OrderItemLocations order={order} />
        <OrderItemInfo order={order} />
        <DriverTimeline status={order?.status?.driver} />
      </Pressable>
    </View>
  );
}

export default memo(GivenCustomerOrderItem);
