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
import DriverOrdersButtonBox from "@/widget/driver/orders-box";
import {
  allActiveOrdersAtom,
  allActiveOrdersStateAtom,
  useFetchAllActiveOrders,
} from "@/service/driver/fetch-all-active-orders/controller";
import { useThemeColors } from "@/theme/useThemeColors";
import { themeAtom } from "@/theme/theme";
import {
  driverOrdersAtom,
  useFetchDriverOrders,
} from "@/service/driver/driver-orders/controller";
import { useTranslation } from "react-i18next";

const DriverGetOrders = () => {
  const scrollX = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);
  const fetchAllOrders = useFetchAllActiveOrders();
  const fetchDriverOrders = useFetchDriverOrders();
  const allActiveOrders = useAtomValue(allActiveOrdersAtom);
  const allActiveOrdersState = useAtomValue(allActiveOrdersStateAtom);
  const { requested } = useAtomValue(driverOrdersAtom);
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllOrders();
    fetchDriverOrders();
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

  const fetch = () => {
    fetchAllOrders();
    fetchDriverOrders();
  };

  const combineOrder = [...allActiveOrders.nearby, ...allActiveOrders.other];

  const Page = memo(({ item }: any) => <>{item.component()}</>);

  const pages = [
    {
      key: "active",
      title: t("cargos"),
      component: () => (
        <DriverActiveOrderLIst
          orders={combineOrder}
          fetchOrders={fetch}
          type={"all-order"}
        />
      ),
    },
    {
      key: "requested",
      title: t("requested"),
      component: () => (
        <DriverActiveOrderLIst
          orders={requested}
          fetchOrders={fetch}
          type={"request-order"}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "light" ? Colors.Boxbackground : Colors.pageBackground,
      }}
    >
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
