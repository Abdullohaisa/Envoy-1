import { View, Pressable } from "react-native";
import { memo } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { router } from "expo-router";
import { OrderItemHeader } from "../../Components/OrderHeader";
import { OrderItemLocations } from "../../Components/OrderLocations";
import { OrderItemInfo } from "../../Components/OrderInfo";
import OrderItemRequests from "../../Components/OrderRequests";
import { safeNavigate } from "@/utils/safe-navigation";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

function ActiveCustomerOrderItem({
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
    <View style={[styles.box, {}]}>
      <Pressable
        onPress={inOrder}
        style={[
          styles.item,
          {
            backgroundColor:
              theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
            borderTopWidth: index === 0 ? 0 : 1,
            borderColor:
              theme === "dark" ? Colors.borderColor : Colors.borderColor,
          },
        ]}
      >
        <OrderItemHeader order={order} />

        <OrderItemLocations order={order} />

        <OrderItemRequests
          requested_drivers_length={order?.requested_drivers?.length}
        />

        {/* <View style={[styles.line, { backgroundColor: Colors.borderColor }]} /> */}

        <OrderItemInfo order={order} />
      </Pressable>
    </View>
  );
}

export default memo(ActiveCustomerOrderItem);
