import { StyleSheet } from "react-native";
import { useRef, useState } from "react";
import {
  OrderListAddress,
  OrderListCargo,
  OrderListRequestDriver,
} from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const DriverActiveOrderInfoList = ({ order }: any) => {
  const modalRef = useRef<any>(null);

  return (
    <Animated.ScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <OrderListCargo order={order} />
      <OrderListAddress locations={order.locations} />
    </Animated.ScrollView>
  );
};

export default DriverActiveOrderInfoList;

/* ====================== STYLES ====================== */
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
