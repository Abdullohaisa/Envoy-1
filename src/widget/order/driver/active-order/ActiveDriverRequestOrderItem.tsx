import { View, Pressable } from "react-native";
import { memo } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { router } from "expo-router";
import { OrderItemHeader } from "../../Components/OrderHeader";
import { OrderItemLocations } from "../../Components/OrderLocations";
import { OrderItemInfo } from "../../Components/OrderInfo";
import { safeNavigate } from "@/utils/safe-navigation";
import OrderItemRequests from "../../Components/OrderRequests";
import AppText from "@/components/Texts/Text";

function ActiveDriverRequestOrderItem({
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
    <View
      style={[
        styles.box,
        {
          borderTopWidth: 1,
          borderColor: index !== 0 ? Colors.borderColor : "transparent",
        },
      ]}
    >
      <Pressable
        onPress={inOrder}
        android_ripple={{
          color: Colors.primary,
          borderless: false,
          radius: -0.5,
          foreground: true,
        }}
        style={[
          styles.item,
          {
            // backgroundColor: Colors.Boxbackground,
          },
        ]}
      >
        <OrderItemHeader order={order} />

        <OrderItemLocations order={order} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <OrderItemRequests
            requested_drivers_length={order.requested_drivers.length}
          />

          <AppText style={{ color: Colors.yellow, marginTop: 7 }}>
            Siz so'rov jo'natgansiz
          </AppText>
        </View>

        <OrderItemInfo order={order} />
      </Pressable>
    </View>
  );
}

export default memo(ActiveDriverRequestOrderItem);
