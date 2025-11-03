import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Radius, screens } from "@/shared/token";
import { memo, useCallback, useState } from "react";
import FinishedCustomerOrderItem from "@/widget/order/customer/finished-order/FinishedCustomerOrderItem";
import { useThemeColors } from "@/theme/useThemeColors";

const CustomerFinishedOrderList = ({ orders, onRefreshOrders }: any) => {
  const Colors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

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
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <FinishedCustomerOrderItem
          index={index}
          order={item}
          path="(app)/customer/orders/finish-order/"
        />
      );
    },
    [orders]
  );

  return (
    <View style={{ width: screens.width, flex: 1, paddingHorizontal: 5 }}>
      <FlatList
        style={{ borderRadius: Radius.primary, overflow: "hidden" }}
        showsHorizontalScrollIndicator={true}
        indicatorStyle="black"
        data={orders}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ flexGrow: 1, gap: 5 }}
        renderItem={renderItem}
        removeClippedSubviews={true} // Ekrandan chiqqan itemlarni kesib tashlaydi (RAMni tejaydi)
        initialNumToRender={10} // Boshlang‘ich renderda 10ta item
        maxToRenderPerBatch={10} // Har batchda faqat 10tasi render bo‘ladi
        updateCellsBatchingPeriod={30} // 30msda yangi batchni chizadi (smooth scroll)
        windowSize={7} // Oldin va keyingi 3.5 sahifani cache qiladi
        getItemLayout={(_, index) => ({
          // 🔹 Agar item balandligi bir xil bo‘lsa
          length: 120, // Har bir elementning taxminiy balandligi (px)
          offset: 120 * index,
          index,
        })}
        initialScrollIndex={0} // 0-dan boshlaydi
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

function areEqual(prevProps: any, nextProps: any) {
  return prevProps.orders === nextProps.orders;
}

export default memo(CustomerFinishedOrderList, areEqual);
