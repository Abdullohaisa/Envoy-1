import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { View } from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import i18n, { initLanguage } from "@/locales/_i18n";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { authAtom } from "@/service/user/register-login/controller";

const Layout = () => {
  // const queryClient = new QueryClient();
  const Colors = useThemeColors();
  const [ready, setReady] = useState(false);
  const { access, role } = useAtomValue(authAtom);
  console.log(role, access);

  useEffect(() => {
    const prepare = async () => {
      await initLanguage(); // tilni yuklab oladi
      setReady(true);
    };

    prepare();
  }, []);

  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    // Expo AV warninglarini filtrlash
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Expo AV has been deprecated") ||
        args[0].includes(
          "Reanimated] Reading from `value` during component render"
        ))
    ) {
      return; // warningni o'chirib qo'yish
    }
    originalConsoleWarn(...args);
  };

  if (!ready) return <View />; // yoki Splash, loading spinner

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: Colors.pageBackground }}
      >
        <BottomSheetModalProvider>
          {/* <QueryClientProvider client={queryClient}> */}
          <View
            style={{
              flex: 1,
              paddingBottom: 0,
              backgroundColor: Colors.pageBackground,
            }}
          >
            <StatusBar style="inverted" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.pageBackground },
              }}
            />
          </View>
          {/* </QueryClientProvider> */}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
};

export default Layout;
