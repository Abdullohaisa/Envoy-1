import { StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  OrderListAddress,
  OrderListCargo,
  OrderListOther,
  OrderListRequestDriver,
} from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { Spacing } from "@/shared/token";
import api from "@/axios/axios.config";
import DriverChooseModal from "@/widget/customer/active-order/driver-choose-modal";
import { useSetAtom } from "jotai";
import { router } from "expo-router";
import { IOrder } from "@/types/order";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ordersScrollToIndex } from "@/atoms/orders-scroll-to-index";
import { useFetchCustomerOrders } from "@/service/customer/customer-orders/controller";
import { AxiosError } from "axios";
import { vibration } from "@/utils/hapticks";

const CustomerActiveOrderInfoList = ({ order }: { order: IOrder }) => {
  const modalRef = useRef<any>(null);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const seccessModalref = useRef<BottomSheetModalMethods>(null);
  const setScrollToIndex = useSetAtom(ordersScrollToIndex);
  const fetchOrders = useFetchCustomerOrders();
  const [chooseState, setChooseState] = useState<{
    isChoose: null | boolean;
    isLoading: boolean;
    isError: null | string;
  }>({
    isChoose: null,
    isLoading: false,
    isError: null,
  });

  const handleDriverPress = (driver: any) => {
    setSelectedDriver(driver);
    modalRef.current?.present();
  };

  const handleSelectDriver = async () => {
    const acceptIds = {
      order_id: order.id,
      driver_id: selectedDriver.id,
    };
    try {
      setChooseState({
        isChoose: null,
        isLoading: true,
        isError: null,
      });
      const { data } = await api.post("/customer/accept-request/", acceptIds);
      setChooseState({
        isChoose: true,
        isLoading: false,
        isError: null,
      });
      seccessModalref.current?.present();
      await fetchOrders();
      setTimeout(() => {
        modalRef.current?.dismiss();
      }, 1000);
      setTimeout(() => {
        router.back();
      }, 1500);
      setTimeout(() => {
        setScrollToIndex(1);
      }, 1800);
    } catch (error) {
      if (error instanceof AxiosError) {
        setChooseState({
          isChoose: null,
          isLoading: false,
          isError: error.response?.data.message,
        });
      }
    }
  };

  return (
    <Animated.ScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <OrderListRequestDriver
        drivers={order?.requested_drivers}
        handleDriverPress={handleDriverPress}
      />
      <OrderListCargo order={order} />
      <OrderListAddress locations={order?.locations} isVisibleContact />
      <OrderListOther order={order} />

      <DriverChooseModal
        modalRef={modalRef}
        driver={selectedDriver}
        handleSelectDriver={handleSelectDriver}
        chooseState={chooseState}
      />
    </Animated.ScrollView>
  );
};

export default CustomerActiveOrderInfoList;

const styles = StyleSheet.create({
  scrollView: {
    overflow: "hidden",
    paddingTop: Spacing.horizontal,
    borderRadius: 20,
    paddingHorizontal: Spacing.horizontal,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 50,
  },
});
