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
import { useTranslation } from "react-i18next";
import UserReviewSheet from "@/components/UserReview/UserReview";

const DriverOrder = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const scrollY = useSharedValue(0);
  const { t } = useTranslation();
  const { accepted: order } = useAtomValue(driverOrdersAtom);
  const fetchDriverOrder = useFetchDriverOrders();
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const reviewSheet = useRef<BottomSheetModalMethods>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [warningVisible, setWarningVisible] = useState(
    order?.status?.driver_status?.pickup[0].departed ? false : true
  );

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

  useEffect(() => {
    // reviewSheet.current?.present();
  }, []);

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
        flex: 1,
      }}
    >
      {/* Header animation */}
      <AnimationHeader scrollY={scrollY} title={t("your_cargo")} />

      {/* Scroll content */}
      <DriverOrderScrollContent
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        scrollHandler={scrollHandler}
        order={order}
        warningVisible={warningVisible}
        sheetRef={sheetRef}
        setWarningVisible={setWarningVisible}
        allDeparted={allDeparted}
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

      <UserReviewSheet
        toUserId={order?.owner?.id}
        ref={reviewSheet}
        text={"Yuk egasiga baho va izoh bering"}
        handlePress={() => {}}
      />
    </View>
  );
};

export default DriverOrder;
