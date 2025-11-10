import React, { memo, useCallback, useEffect, useRef } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ListRenderItem,
} from "react-native";
import { Radius, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";

// 🔹 Har xil buyurtma turlari uchun komponentlar
import ActiveCustomerOrderItem from "@/widget/order/customer/active-order/ActiveCustomerOrderItem";
import GivenCustomerOrderItem from "@/widget/order/customer/given-order.tsx/GivenCustomerOrderItem";
import FinishedCustomerOrderItem from "@/widget/order/customer/finished-order/FinishedCustomerOrderItem";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

// ==============================
// 🔹 INTERFACE LAR
// ==============================
export interface IOrder {
  id: number;
  status: any;
  created_at: string;
  [key: string]: any;
}

export interface IOrderState {
  isLoading: boolean;
  error: boolean;
}

export interface CustomerOrderListProps {
  orders: IOrder[];
  state: IOrderState;
  setOrders: () => Promise<void>;
  type: "active" | "attached" | "finished";
}

// ==============================
// 🔹 KOMPONENT
// ==============================
const CustomerOrderList: React.FC<CustomerOrderListProps> = ({
  orders,
  state,
  setOrders,
  type,
}) => {
  const Colors = useThemeColors();
  const flatListRef = useRef<FlatList<IOrder>>(null);
  const theme = useAtomValue(themeAtom);

  const indicatorStyle = theme === "dark" ? "white" : "black";

  // 🔹 Sahifani yangilash funksiyasi
  const onRefresh = useCallback(async () => {
    await setOrders();
  }, [setOrders]);

  // 🔹 Har renderda eng tepasiga scroll bo‘lishi
  useEffect(() => {
    if (flatListRef.current && orders.length > 0) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [orders]);

  // 🔹 Element render qilish
  const renderItem: ListRenderItem<IOrder> = useCallback(
    ({ item, index }) => {
      if (!item) return null;
      console.log(item);
      switch (type) {
        case "active":
          return (
            <ActiveCustomerOrderItem
              index={index}
              order={item}
              path="(app)/customer/orders/active-order/"
            />
          );
        case "attached":
          return (
            <GivenCustomerOrderItem
              index={index}
              order={item}
              path="(app)/customer/orders/given-order/"
            />
          );
        case "finished":
          return (
            <FinishedCustomerOrderItem
              index={index}
              order={item}
              path="(app)/customer/orders/finish-order/"
            />
          );
        default:
          return null;
      }
    },
    [type]
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={{ marginTop: 5, overflow: "hidden", borderRadius: 5 }}
        ref={flatListRef}
        data={[...orders].reverse()} // 🔹 Teskari tartibda ko‘rsatish
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        indicatorStyle={indicatorStyle}
        contentContainerStyle={styles.content}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
        windowSize={7}
        getItemLayout={(_, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
        // 🔹 Refresh control to‘g‘ri chiqishi uchun inverted emas!
        refreshControl={
          <RefreshControl
            refreshing={state.isLoading}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={["#fff"]}
            progressBackgroundColor={Colors.primary}
          />
        }
      />
    </View>
  );
};

// 🔹 React.memo optimizatsiyasi
function areEqual(
  prevProps: CustomerOrderListProps,
  nextProps: CustomerOrderListProps
) {
  return prevProps.orders === nextProps.orders;
}

// 🔹 Style
const styles = StyleSheet.create({
  wrapper: {
    width: screens.width,
    flex: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    gap: 5,
  },
});

export default memo(CustomerOrderList, areEqual);
