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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AppText from "@/components/Texts/Text";
import { useTranslation } from "react-i18next";

const AnimatedIcon = React.memo(({ name, focused, color }: any) => {
  return <Ionicons name={name} size={26} color={color} />;
});

const AnimatedLabel = React.memo(({ label, focused, color }: any) => {
  return (
    <AppText
      style={[
        {
          fontSize: 12,
          color,
          marginTop: 2,
        },
      ]}
    >
      {label}
    </AppText>
  );
});

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

const DriverLayout = () => {
  const Colors = useThemeColors();
  const pathname = usePathname();
  const { t } = useTranslation();

  const visibleRouters = useMemo(
    () => [
      "/driver/orders",
      "/driver/profile",
      "/driver",
      "/driver/driver-order",
    ],
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
        borderTopLeftRadius: Platform.OS === "ios" ? Radius.primary : 5,
        borderTopRightRadius: Platform.OS === "ios" ? Radius.primary : 5,
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
      initialRouteName="orders"
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
          title: t("cargos"),
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon name="cube-outline" focused={focused} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <AnimatedLabel
              label={t("cargos")}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="driver-order"
        options={{
          title: t("your_cargo"),
          tabBarStyle: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            position: "absolute",
            backgroundColor: Colors.Boxbackground,
            borderTopWidth: 0,
            height: screens.height * 0.09,
            zIndex: 10,
          },
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="border-radius"
              size={26}
              color={color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <AnimatedLabel
              label={t("your_cargo")}
              focused={focused}
              color={color}
            />
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
            <AnimatedLabel
              label={t("profile")}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default React.memo(DriverLayout);
