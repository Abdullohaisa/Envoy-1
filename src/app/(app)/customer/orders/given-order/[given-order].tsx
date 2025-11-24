import { StyleSheet, View } from "react-native";
import { useState, useCallback, memo, useRef, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";
import { useFetchSingleOrder } from "@/service/order/fetch-single-order/controller";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import AnimationHeader from "@/components/Header/PageHeader/PageAnimationHeader";
import OrderBySheet from "@/components/OrderBySheet/OrderBySheet";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import GivenOrderScrollContent from "@/widget/customer/given-order/GivenOrderScrollContent";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const GivenOrder = () => {
  const Colors = useThemeColors();
  const params = useLocalSearchParams();
  const orderId = params.order_id as string;
  const scrollY = useSharedValue(0);

  const [refreshing, setRefreshing] = useState(false);
  const theme = useAtomValue(themeAtom);
  const [warningVisible, setWarningVisible] = useState(false);
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { order, isLoading, error, refetch } = useFetchSingleOrder(orderId);

  const handleCheckAllDeparted = () => {
    if (!order?.status?.driver_status) return false;
    const pickupStatuses =
      order.status.driver_status.pickup.map((item) => item.arrived === true) ||
      [];
    const dropoffStatuses =
      order.status.driver_status.dropoff.map((item) => item.arrived === true) ||
      [];

    return [...pickupStatuses, ...dropoffStatuses].every(Boolean);
  };

  useEffect(() => {
    handleCheckAllDeparted();
  }, []);

  const allDeparted = handleCheckAllDeparted();

  /* 🔁 Yangilash */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
        flex: 1,
      }}
    >
      {/* Header animation */}
      <AnimationHeader
        scrollY={scrollY}
        title={"Yuk ma'lumotlari"}
        enableBack
      />

      {/* Scroll content */}
      <GivenOrderScrollContent
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        scrollHandler={scrollHandler}
        order={order}
        warningVisible={warningVisible}
        sheetRef={sheetRef}
        setWarningVisible={setWarningVisible}
        allDeparted={allDeparted}
      />

      {order?.id && (
        <OrderBySheet
          sheetRef={sheetRef}
          order={order}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}
    </View>
  );
};

export default GivenOrder;

/* ===============================
   🔹 Styles
=============================== */
const styles = StyleSheet.create({
  container: { flex: 1 },
  centerBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
