import TabHeader from "@/components/TabContainer/TabHeader";
import { screens } from "@/shared/token";
import DriverActiveOrderLIst from "@/widget/driver/order-list/driverActiveOrderLIst";
import { memo, useEffect, useRef, useState } from "react";
import { View, FlatList } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useAtomValue } from "jotai";
import { authAtom } from "@/service/user/register-login/controller";
import DriverOrdersButtonBox from "@/widget/driver/orders-box";
import {
  allActiveOrdersAtom,
  allActiveOrdersStateAtom,
  useFetchAllActiveOrders,
} from "@/service/driver/fetch-all-active-orders/controller";

const DriverGetOrders = () => {
  const scrollX = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);
  const { access } = useAtomValue(authAtom);
  const fetchAllOrders = useFetchAllActiveOrders();
  const allActiveOrders = useAtomValue(allActiveOrdersAtom);
  const allActiveOrdersState = useAtomValue(allActiveOrdersStateAtom);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handlePress = (index: number) => {
    flatRef.current?.scrollToOffset({
      offset: index * screens.width,
      animated: true,
    });
  };

  const combineOrder = [...allActiveOrders.nearby, ...allActiveOrders.other];

  const Page = memo(({ item }: any) => <>{item.component()}</>);
  const renderActiveOrders = () => (
    <DriverActiveOrderLIst orders={combineOrder} fetchOrders={fetchAllOrders} />
  );

  const pages = [
    {
      key: "active",
      title: "Yuklar",
      orders: combineOrder,
      component: renderActiveOrders,
    },
    {
      key: "so'ralgan",
      title: "So'ralgan",
      orders: combineOrder,
      component: renderActiveOrders,
    },
  ];

  return (
    <View style={{ flex: 1, gap: 5 }}>
      <TabHeader pages={pages} handlePress={handlePress} scrollX={scrollX} />

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
          paddingBottom: screens.height * 0.09 + 5,
        }}
      />

      <DriverOrdersButtonBox scrollX={scrollX} />
    </View>
  );
};

export default DriverGetOrders;
