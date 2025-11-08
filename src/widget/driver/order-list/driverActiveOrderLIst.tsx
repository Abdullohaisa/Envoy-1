import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Radius, screens } from "@/shared/token";
import { memo, useCallback, useState } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import ActiveDriverOrderItem from "@/widget/order/driver/active-order/ActiveDriverOrderItem";

const DriverActiveOrderList = ({ orders, onRefreshOrders }: any) => {
  const Colors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  // 🔹 Refresh funksiyasi
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      if (onRefreshOrders) {
        await onRefreshOrders();
      } else {
        await new Promise((res) => setTimeout(res, 1500));
      }
    } finally {
      setRefreshing(false);
    }
  };

  // 🔹 Har bir itemni chizish
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <ActiveDriverOrderItem
        index={index}
        order={item}
        path="(app)/driver/orders/"
      />
    ),
    [orders]
  );

  return (
    <View style={{ width: screens.width, flex: 1, paddingHorizontal: 2.5 }}>
      <FlatList
        style={{ borderRadius: Radius.primary, overflow: "hidden" }}
        showsVerticalScrollIndicator={false}
        data={orders}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ flexGrow: 1, gap: 5 }}
        renderItem={renderItem}
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
        initialScrollIndex={0}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#fff"]}
            progressBackgroundColor={Colors.primary}
            tintColor={Colors.primary}
          />
        }
        nestedScrollEnabled={true}
        scrollEnabled={true}
      />
    </View>
  );
};

// 🔹 React.memo optimizatsiyasi
function areEqual(prevProps: any, nextProps: any) {
  return prevProps.orders === nextProps.orders;
}

export default memo(DriverActiveOrderList, areEqual);
