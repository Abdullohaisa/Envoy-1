import React, { memo, useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import TabHeader from "@/components/TabContainer/TabHeader";
import CustomerOrderList from "@/widget/customer/order-list/customerOrderList";
import { useThemeColors } from "@/theme/useThemeColors";
import { screens } from "@/shared/token";

// 🧠 State management (Jotai)
import {
  useFetchCustomerOrders,
  customerOrdersAtom,
  customerOrdersStateAtom,
} from "@/service/customer/customer-orders/controller";
import { useAtomValue } from "jotai";
import { authAtom } from "@/service/user/register-login/controller";

const Orders = () => {
  const Colors = useThemeColors();
  const { access } = useAtomValue(authAtom);

  // 📦 Orders ma'lumotlarini olish uchun hook
  const fetchOrders = useFetchCustomerOrders();
  const { active, attached, finished } = useAtomValue(customerOrdersAtom);
  const customerOrdersState = useAtomValue(customerOrdersStateAtom);

  // ⚙️ Komponent yuklanganda backenddan ma’lumot olish
  useEffect(() => {
    fetchOrders();
  }, []);

  // 📜 Gorizontal scroll uchun reanimated qiymat
  const scrollX = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);

  // Scroll harakatini kuzatish (header animatsiyasi uchun)
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  // 🔘 Header tugmasi bosilganda sahifani almashtirish
  const handlePress = (index: number) => {
    flatRef.current?.scrollToOffset({
      offset: index * screens.width,
      animated: true,
    });
  };

  // 🔹 Har bir sahifa komponenti
  const Page = memo(({ item }: any) => <>{item.component()}</>);

  // 📄 Uchta sahifa (Faol, Berilgan, Tugatilgan)
  const pages = [
    {
      key: "active",
      title: "Faol",
      component: () => (
        <CustomerOrderList
          orders={active}
          state={customerOrdersState}
          setOrders={fetchOrders}
          type="active"
        />
      ),
    },
    {
      key: "attached",
      title: "Berilgan",
      component: () => (
        <CustomerOrderList
          orders={attached}
          state={customerOrdersState}
          setOrders={fetchOrders}
          type="attached"
        />
      ),
    },
    {
      key: "finished",
      title: "Tugatilgan",
      component: () => (
        <CustomerOrderList
          orders={active}
          state={customerOrdersState}
          setOrders={fetchOrders}
          type="finished"
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* 🔝 Tab Header (Faol, Berilgan, Tugatilgan) */}
      <TabHeader pages={pages} handlePress={handlePress} scrollX={scrollX} />

      {/* 📲 Har bir sahifa uchun FlatList (swipe bilan o‘tish mumkin) */}
      <Animated.FlatList
        ref={flatRef}
        data={pages}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <Page item={item} />}
        contentContainerStyle={{
          paddingBottom: screens.height * 0.09 + 5,
        }}
      />
    </View>
  );
};

export default Orders;
