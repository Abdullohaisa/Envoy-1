import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Radius, screens } from "@/shared/token";
import { memo, useCallback, useState } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import ActiveDriverOrderItem from "@/widget/order/driver/active-order/ActiveDriverOrderItem";
import ListEmptyComponent from "@/components/ListEmptyComponent/ListEmptyComponent";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import ActiveDriverRequestOrderItem from "@/widget/order/driver/active-order/ActiveDriverRequestOrderItem";

const DriverActiveOrderList = ({ orders, fetchOrders, type }: any) => {
  const Colors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);
  const theme = useAtomValue(themeAtom);

  // 🔹 Refresh funksiyasi
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchOrders(); // atom ichidagi fetch
    } catch (err) {
    } finally {
      setRefreshing(false); // faqat fetch tugagach false qilamiz
    }
  }, [fetchOrders]);

  // 🔹 Har bir itemni chizish
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (type === "all-order") {
        return (
          <ActiveDriverOrderItem
            index={index}
            order={item}
            path="(app)/driver/orders/"
          />
        );
      } else {
        return (
          <ActiveDriverRequestOrderItem
            index={index}
            order={item}
            path="(app)/driver/orders/"
          />
        );
      }
    },
    [orders]
  );

  return (
    <View style={{ width: screens.width, flex: 1 }}>
      <FlatList
        style={{
          borderRadius: Radius.primary,
          overflow: "hidden",
          marginTop: 5,
        }}
        indicatorStyle={theme === "dark" ? "white" : "black"}
        data={[...orders].reverse()}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
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
        ListEmptyComponent={
          <ListEmptyComponent
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        }
      />
    </View>
  );
};

// 🔹 React.memo optimizatsiyasi
function areEqual(prevProps: any, nextProps: any) {
  return prevProps.orders === nextProps.orders;
}

export default memo(DriverActiveOrderList, areEqual);
