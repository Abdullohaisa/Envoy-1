import React, { useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { Tabs, usePathname } from "expo-router";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/theme/useThemeColors";
import { Radius, screens } from "@/shared/token";

// ------------------------
// 🔹 Mini komponent: AnimatedIcon
// ------------------------
const AnimatedIcon = React.memo(({ name, focused, color }: any) => {
  const scale = useSharedValue(focused ? 1.15 : 1);
  const rotate = useSharedValue(focused ? 0 : 0);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
    rotate.value = withTiming(focused ? 5 : 0, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={26} color={color} />
    </Animated.View>
  );
});

// ------------------------
// 🔹 Mini komponent: AnimatedLabel
// ------------------------
const AnimatedLabel = React.memo(({ label, focused, color }: any) => {
  const opacity = useSharedValue(focused ? 1 : 0.6);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.6, { duration: 300 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: focused ? -1 : 0 }],
  }));

  return (
    <Animated.Text
      style={[
        animatedStyle,
        {
          fontSize: 12,
          color,
          fontWeight: focused ? "600" : "400",
          marginTop: 2,
        },
      ]}
    >
      {label}
    </Animated.Text>
  );
});

// ------------------------
// 🔹 Mini komponent: TabBarWrapper
// ------------------------
const TabBarWrapper = React.memo(({ showTabBar, children }: any) => {
  const offset = useSharedValue(showTabBar ? 0 : 80);

  useEffect(() => {
    offset.value = withTiming(showTabBar ? 0 : 80, {
      duration: 300,
      easing: Easing.inOut(Easing.exp),
    });
  }, [showTabBar]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: withTiming(showTabBar ? 1 : 0, { duration: 200 }),
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          elevation: 10,
        },
      ]}
      pointerEvents={showTabBar ? "auto" : "none"}
    >
      {children}
    </Animated.View>
  );
});

// ------------------------
// 🔹 CustomerLayout
// ------------------------
const CustomerLayout = () => {
  const Colors = useThemeColors();
  const pathname = usePathname();

  const visibleRouters = useMemo(
    () => ["/customer/orders", "/customer/get-order", "/customer/profile"],
    []
  );
  const showTabBar = useMemo(
    () => visibleRouters.includes(pathname),
    [pathname, visibleRouters]
  );

  const tabBarOptions = useMemo(
    () => ({
      sceneStyle: { backgroundColor: Colors.pageBackground },
      animation: "none",
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
      tabBarStyle: {
        position: "absolute",
        backgroundColor: Colors.Boxbackground,
        borderTopWidth: 0,
        borderTopLeftRadius: Platform.OS === "ios" ? Radius.primary : 0,
        borderTopRightRadius: Platform.OS === "ios" ? Radius.primary : 0,
        height: screens.height * 0.09,
        zIndex: 10,
      },
    }),
    [
      Colors.pageBackground,
      Colors.Boxbackground,
      Colors.primary,
      Colors.textSecondary,
    ]
  );

  return (
    <Tabs
      initialRouteName="get-order"
      tabBar={(props) => (
        <TabBarWrapper showTabBar={showTabBar}>
          <BottomTabBar {...props} />
        </TabBarWrapper>
      )}
      screenOptions={tabBarOptions}
    >
      <Tabs.Screen
        name="orders"
        options={{
          title: "Yuklar",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon name="cube-outline" focused={focused} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <AnimatedLabel label="Yuklar" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="get-order"
        options={{
          title: "Yaratish",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon
              name="add-circle-outline"
              focused={focused}
              color={color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <AnimatedLabel label="Yaratish" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon
              name="person-outline"
              focused={focused}
              color={color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <AnimatedLabel label="Profil" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default React.memo(CustomerLayout);
