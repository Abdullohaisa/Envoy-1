import React, { useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { useSetAtom } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Radius } from "@/shared/token";

const CustomerLayout = () => {
  const Colors = useThemeColors();
  const pathname = usePathname();

  const visibleRouters = [
    "/customer/orders",
    "/customer/get-order",
    "/customer/profile",
  ];

  const showTabBar = visibleRouters.includes(pathname);

  // 🔥 Reanimated qiymat
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = showTabBar ? 0 : 100; // pastga tushadi
  }, [showTabBar]);

  // 🔥 Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offset.value, {
            duration: showTabBar ? 300 : 300, // chiqishi 100ms, tushishi 300ms
          }),
        },
      ],
      opacity: withTiming(showTabBar ? 1 : 0, {
        duration: showTabBar ? 300 : 300,
      }),
    };
  });

  return (
    <Tabs
      initialRouteName="get-order"
      tabBar={(props) => (
        <Animated.View style={animatedStyle}>
          <BottomTabBar {...props} />
        </Animated.View>
      )}
      screenOptions={{
        animation: "fade",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.Boxbackground,
          borderTopWidth: 0,
          borderTopLeftRadius: Platform.OS === "ios" ? Radius.primary : 0,
          borderTopRightRadius: Platform.OS === "ios" ? Radius.primary : 0,
        },
      }}
    >
      {/* Chapda yuklar */}
      <Tabs.Screen name="orders/index" options={{ title: "Yuklar" }} />

      {/* O‘rtada buyurtma berish */}
      <Tabs.Screen name="get-order" options={{ title: "Yuk yaratish" }} />

      {/* O‘ngda profil */}
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
};

export default CustomerLayout;
