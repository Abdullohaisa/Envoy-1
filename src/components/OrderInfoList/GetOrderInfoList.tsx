import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { OrderListAddress, OrderListCargo } from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const GetOrderInfoList = ({ order }: any) => {
  const AnimtedScrollView = Animated.createAnimatedComponent(
    BottomSheetScrollView
  );

  return (
    <AnimtedScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      showsVerticalScrollIndicator={false}
      style={{
        overflow: "hidden",
        marginTop: 5,
        borderRadius: 20,
        marginHorizontal: 5,
      }}
      contentContainerStyle={{
        gap: 10,
        paddingBottom: 200,
        paddingTop: 5,
      }}
    >
      <OrderListCargo order={order} />

      <OrderListAddress locations={order.locations} />
    </AnimtedScrollView>
  );
};

export default GetOrderInfoList;
