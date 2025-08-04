import React, { useEffect, useState } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { loadThemeAtom } from "@/theme/theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppRoutes } from "@/constants/routes";
import { LogBox, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useThemeColors } from "@/theme/useThemeColors";

LogBox.ignoreLogs([
  "`expo-notifications` functionality is not fully supported in Expo Go",
  "expo-notifications was removed from Expo Go with the release of SDK 53",
]);

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const loadTheme = useSetAtom(loadThemeAtom);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const queryClient = new QueryClient();
  const insetsTop = useSafeAreaInsets().bottom;
  const Colors = useThemeColors();

  LogBox.ignoreLogs([
    "`expo-notifications` functionality is not fully supported in Expo Go",
    "expo-notifications was removed from Expo Go with the release of SDK 53",
  ]);

  useEffect(() => {
    const prepare = async () => {
      try {
        // 1. Theme-ni yuklaymiz
        await loadTheme();

        // 2. Auth ma'lumotlarini tekshiramiz
        const storedData = await AsyncStorage.getItem("authData");

        if (!storedData) {
          // router.replace(AppRoutes.auth.welcome);
          router.replace(AppRoutes.auth.resetPassword.smsCode);
          return;
        }

        const parsed = JSON.parse(storedData);
        const { token, role } = parsed || {};

        if (!token) {
          router.replace(AppRoutes.auth.welcome);
        } else {
          if (role === "Customer") {
            router.replace(AppRoutes.customer.home);
          } else if (role === "Driver") {
            router.replace(AppRoutes.driver.home);
          } else {
            router.replace(AppRoutes.auth.welcome);
          }
        }
      } catch (error) {
        router.replace(AppRoutes.auth.welcome);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync(); // endi splash faqat hammasi tugagach yopiladi
      }
    };

    prepare();
  }, []);

  // if (!isReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={{
          flex: 1,
          paddingBottom: insetsTop,
          backgroundColor: Colors.pageBackground,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "ios_from_right",
            navigationBarColor: "red",
          }}
        />
      </View>
    </QueryClientProvider>
  );
};

export default Layout;
