import React, { useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { useSetAtom } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useThemeColors } from "@/theme/useThemeColors";
import { AppRoutes } from "@/constants/routes";

const CustomerLayout = () => {
  const setTheme = useSetAtom(themeAtom);
  const Colors = useThemeColors();
  const pathname = usePathname();

  useEffect(() => {
    setTheme("dark");
  }, []);

  const visibleRouters = [
    "/customer/get-order",
    "/customer",
    "/customer/orders",
  ];

  const showTabBar = visibleRouters.includes(pathname);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.Boxbackground,
          display: showTabBar ? "flex" : "none",
        },
        sceneStyle: { backgroundColor: Colors.pageBackground },
        animation: "shift",
        headerShown: false,
      }}
    />
  );
};

export default CustomerLayout;
