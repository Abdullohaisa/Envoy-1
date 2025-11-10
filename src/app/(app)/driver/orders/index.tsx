import TabHeader from "@/components/TabContainer/TabHeader";
import { ORDERS, Spacing, screens } from "@/shared/token";
import DriverActiveOrderLIst from "@/widget/driver/order-list/driverActiveOrderLIst";
import { memo, useEffect, useRef, useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColors } from "@/theme/useThemeColors";
import { safeNavigate } from "@/utils/safe-navigation";
import { AppRoutes } from "@/constants/routes";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "@/service/user/register-login/controller";
import api from "@/axios/axios.config";
import { AxiosError } from "axios";

// ==========================
// 🔸 Tugmalar qutisi komponenti
// ==========================
const ButtonBox = ({ scrollX }: { scrollX: any }) => {
  const Colors = useThemeColors();

  // Tugma qutisi animatsiyasi
  const animatedButtonBox = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [0, screens.width * 0.5],
      [1, 0],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollX.value,
      [0, screens.width * 0.5],
      [0, 60],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: screens.height * 0.15,
          right: Spacing.horizontal,
          backgroundColor: Colors.pageBackground,
          padding: 5,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,

          // Yumshoq soyali effekt
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 8,
        },
        animatedButtonBox,
      ]}
    >
      {/* 🗺 Xarita tugmasi */}
      <Pressable
        onPress={() =>
          safeNavigate(() => router.push(AppRoutes.driver.orders.map))
        }
        style={{
          padding: 5,
          borderRadius: 100,
          backgroundColor: Colors.borderColor,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <FontAwesome name="map" size={20} color={Colors.primary} />
      </Pressable>

      {/* 🎨 Filter tugmasi */}
      <Pressable
        onPress={() =>
          safeNavigate(() => router.push(AppRoutes.driver.orders.search))
        }
        style={{
          padding: 5,
          borderRadius: 100,
          backgroundColor: Colors.borderColor,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Ionicons name="color-filter" size={23} color={Colors.primary} />
      </Pressable>
    </Animated.View>
  );
};

// ==========================
// 🔸 Asosiy sahifa
// ==========================
const DriverGetOrders = () => {
  const scrollX = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);
  const { access } = useAtomValue(authAtom);
  const [orderState, setOrderState] = useState({
    isLoading: false,
    error: null,
    orders: {
      nearby: [],
      other: [],
    },
  });

  const fetchOrders = async () => {
    setOrderState({
      isLoading: true,
      error: null,
      orders: {
        nearby: [],
        other: [],
      },
    });
    try {
      const { data } = await api.get("order/all-active-orders/");
      console.log("data -> ", data);
      setOrderState({
        isLoading: false,
        error: null,
        orders: {
          nearby: data.nearby,
          other: data.other,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setOrderState({
          isLoading: false,
          error: error.response?.data,
          orders: {
            nearby: [],
            other: [],
          },
        });
      }
    }
  };

  useEffect(() => {
    fetchOrders();
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

  const Page = memo(({ item }: any) => <>{item.component()}</>);
  const renderActiveOrders = () => (
    <DriverActiveOrderLIst
      //  orders={orderState?.orders?.other}
      orders={ORDERS}
    />
  );

  const pages = [
    {
      key: "active",
      title: "Yuklar",
      orders: orderState?.orders?.other,
      component: renderActiveOrders,
    },
    {
      key: "so'ralgan",
      title: "So'ralgan",
      orders: orderState?.orders?.other,
      component: renderActiveOrders,
    },
  ];

  return (
    <View style={{ flex: 1, gap: 5 }}>
      {/* 🔹 Header */}
      <TabHeader pages={pages} handlePress={handlePress} scrollX={scrollX} />

      {/* 🔹 Sahifalar */}
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

      {/* 🔹 Tugmalar qutisi */}
      <ButtonBox scrollX={scrollX} />
    </View>
  );
};

export default DriverGetOrders;
