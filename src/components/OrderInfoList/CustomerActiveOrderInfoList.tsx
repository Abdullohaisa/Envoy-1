import { Alert, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import DriverChooseModal, {
  OrderListAddress,
  OrderListCargo,
  OrderListOther,
  OrderListRequestDriver,
} from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const CustomerActiveOrderInfoList = ({ order, requestedDrivers }: any) => {
  const modalRef = useRef<any>(null);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const handleDriverPress = (driver: any) => {
    setSelectedDriver(driver);
    modalRef.current?.present();
  };

  const handleSelectDriver = () => {
    Alert.alert(
      "✅ Haydovchi tanlandi",
      `${selectedDriver.name} bilan bog‘lanishingiz mumkin.`
    );
    modalRef.current?.dismiss();
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
        drivers={requestedDrivers}
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
    marginTop: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 50,
    paddingTop: 5,
  },
});
