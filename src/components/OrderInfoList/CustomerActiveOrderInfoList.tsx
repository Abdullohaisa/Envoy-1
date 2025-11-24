import { Alert, StyleSheet } from "react-native";
import { useRef, useState } from "react";
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

const CustomerActiveOrderInfoList = ({ order }: any) => {
  const modalRef = useRef<any>(null);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const handleDriverPress = (driver: any) => {
    setSelectedDriver(driver);
    modalRef.current?.present();
  };

  const handleSelectDriver = async () => {
    // Alert.alert(
    //   "✅ Haydovchi tanlandi",
    //   `${selectedDriver.name} bilan bog‘lanishingiz mumkin.`
    // );
    const acceptIds = {
      order_id: order.id,
      driver_id: selectedDriver.id,
    };
    try {
      const { data } = await api.post("/customer/accept-request/", acceptIds);
      modalRef.current?.dismiss();
    } catch (error) {}
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
        drivers={order?.requested_driver}
        handleDriverPress={handleDriverPress}
      />
      <OrderListCargo order={order} />
      <OrderListAddress locations={order?.locations} />
      <OrderListOther order={order} />

      <DriverChooseModal
        modalRef={modalRef}
        driver={selectedDriver}
        handleSelectDriver={handleSelectDriver}
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
