import { useEffect, useRef, useState } from "react";
import { BackHandler, View } from "react-native";

// Theme va ranglar
import { useThemeColors } from "@/theme/useThemeColors";

// State management
import { useAtomValue } from "jotai";
import {
  driverOrdersAtom,
  useFetchDriverOrders,
} from "@/service/driver/driver-orders/controller";

// API
import api from "@/axios/axios.config";

// Reanimated
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

// BottomSheet types
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// Components
import AnimationHeader from "@/components/Header/PageHeader/PageAnimationHeader";
import DriverOrderScrollContent from "@/widget/driver/driver-order-page/DriverOrderScrollContent";
import OrderBySheet from "@/components/OrderBySheet/OrderBySheet";
import DriverOrderButton from "@/widget/driver/driver-order-page/DriverOrderButton";
import { themeAtom } from "@/theme/theme";

const DriverOrder = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);

  // Reanimated scroll shared value (AnimationHeader bilan ishlaydi)
  const scrollY = useSharedValue(0);

  // Driver order state
  const { accepted: order } = useAtomValue(driverOrdersAtom);
  const fetchDriverOrder = useFetchDriverOrders();

  // UI state
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [warningVisible, setWarningVisible] = useState(
    order?.status?.driver_status?.pickup[0].departed ? false : true
  );

  const handleCheckAllDeparted = () => {
    if (!order?.status?.driver_status) return false;
    const pickupStatuses =
      order.status.driver_status.pickup.map((item) => item.departed === true) ||
      [];
    const dropoffStatuses =
      order.status.driver_status.pickup.map((item) => item.departed === true) ||
      [];

    return [...pickupStatuses, ...dropoffStatuses].every(Boolean);
  };

  useEffect(() => {
    handleCheckAllDeparted();
  }, []);

  const allDeparted = handleCheckAllDeparted();

  // BottomSheet ref
  const sheetRef = useRef<BottomSheetModalMethods>(null);

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDriverOrder().finally(() => setRefreshing(false));
  };

  // Scroll handler (Reanimated)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Change driver status API call
  const changeDriverStatus = async () => {
    setLoading(true);
    try {
      await api.post(`order/modify-status/${order.id}/`);
      await fetchDriverOrder();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isBackPress = () => {
      if (sheetRef?.current && isSheetOpen) {
        sheetRef?.current.dismiss();
        setIsSheetOpen(false);
        return true;
      }
      // BackHandler.exitApp();
      return false;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      isBackPress
    );

    return () => subscription.remove();
  }, [isSheetOpen]);

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
        flex: 1,
      }}
    >
      {/* Header animation */}
      <AnimationHeader scrollY={scrollY} />

      {/* Scroll content */}
      <DriverOrderScrollContent
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        scrollHandler={scrollHandler}
        order={order}
        warningVisible={warningVisible}
        sheetRef={sheetRef}
        setWarningVisible={setWarningVisible}
        allDeparted
      />

      {/* Bottom Sheet */}
      {order?.id && (
        <OrderBySheet
          sheetRef={sheetRef}
          order={order}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}

      {/* Action button */}
      {order?.id && (
        <DriverOrderButton
          warningVisible={warningVisible}
          changeDriverStatus={changeDriverStatus}
          loading={loading}
          allDeparted={allDeparted}
        />
      )}
    </View>
  );
};

export default DriverOrder;
