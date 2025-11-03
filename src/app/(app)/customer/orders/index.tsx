import api from "@/axios/axios.config";
import TabHeader from "@/components/TabContainer/TabHeader";
import { customerOrdersAtom } from "@/service/customer-orders/controller";
import { ORDERS, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import CustomerActiveOrderList from "@/widget/customer/order-list/customerActiveOrderList";
import CustomerFinishedOrderList from "@/widget/customer/order-list/customerFinishedOrderList";
import CustomerGivenOrderList from "@/widget/customer/order-list/customerGivenOrderList";
import { useAtom } from "jotai";
import { memo, useEffect, useRef } from "react";
import { View, FlatList, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

const Orders = () => {
  const scrollX = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);
  const Colors = useThemeColors();
  const [{ orders, state }, setOrders] = useAtom(customerOrdersAtom);

  // console.log(orders);

  useEffect(() => {
    setOrders();
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // button bosilganda shu funksiya ishlaydi
  const handlePress = (index: number) => {
    flatRef.current?.scrollToOffset({
      offset: index * screens.width,
      animated: true,
    });
  };

  const Page = memo(({ item }: any) => <>{item.component()}</>);

  const pages = [
    {
      key: "active",
      title: "Faol",
      orders: ORDERS,
      component: () => (
        <CustomerActiveOrderList orders={ORDERS} state={state} />
      ),
    },
    {
      key: "given",
      title: "Berilgan",
      orders: ORDERS,
      component: () => <CustomerGivenOrderList orders={ORDERS} />,
    },
    {
      key: "completed",
      title: "Tugatilgan",
      orders: ORDERS,
      component: () => <CustomerFinishedOrderList orders={ORDERS} />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground, gap: 5 }}>
      {/* Header */}
      <TabHeader pages={pages} handlePress={handlePress} scrollX={scrollX} />

      {/* Pages */}
      <Animated.FlatList
        ref={flatRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <Page item={item} />}
        contentContainerStyle={{
          paddingBottom: screens.height * 0.096,
        }}
        scrollEnabled={true}
      />
    </View>
  );
};

export default Orders;
