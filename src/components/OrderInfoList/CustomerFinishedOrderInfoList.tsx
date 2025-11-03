import { StyleSheet } from "react-native";
import { OrderListAddress, OrderListCargo } from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const CustomerFinishedOrderInfoList = ({ order }: any) => {
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

export default CustomerFinishedOrderInfoList;

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
