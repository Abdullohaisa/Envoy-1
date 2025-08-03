import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import AppButton from "@/components/Buttons/Button";
import Login from "@/widget/auth/login";
import Register from "@/widget/auth/register";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import AuthTabs from "@/widget/auth/Tabs";
import { useSharedValue } from "react-native-reanimated";
import { useAtomValue } from "jotai";
import { authAtom } from "@/service/auth/controller";

export const authPages = [
  { id: 1, title: "Dasturga kirish" },
  { id: 2, title: "Ro'yxatdan o'tish" },
];

export default function Auth() {
  const Colors = useThemeColors();
  const [activePage, setActivePage] = useState<number>(0);
  const ref = useRef<ScrollView>(null);
  const scrollX = useSharedValue(0); // 👈 scroll qiymati
  const loginSubmitRef = useRef<() => void>(() => {});
  const registerSubmitRef = useRef<() => void>(() => {});
  const { isLoading } = useAtomValue(authAtom);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      {/* Tablar */}
      <AuthTabs ref={ref} activePage={activePage} scrollX={scrollX} />

      {/* Scroll pages */}
      <ScrollView
        ref={ref}
        pagingEnabled
        horizontal
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x; // 👈 scroll holatini yozamiz
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onMomentumScrollEnd={(e) => {
          const offset = e.nativeEvent.contentOffset.x;
          const index = Math.round(offset / screens.width);
          setActivePage(index);
        }}
      >
        <Login onSubmitRef={loginSubmitRef} />

        <Register onSubmitRef={registerSubmitRef} />
      </ScrollView>

      {/* Umumiy pastdagi button */}
      <KeyboardResponsiveView
        style={{ paddingHorizontal: screens.width * 0.04 }}
      >
        <AppButton
          text={activePage === 0 ? "Dasturga kirish" : "Ro'yxatdan o'tish"}
          loading={isLoading}
          onPress={() => {
            if (activePage === 0) {
              loginSubmitRef.current(); // Login formani submit qiladi
            } else {
              registerSubmitRef.current(); // Register formani submit qiladi
            }
          }}
        />
      </KeyboardResponsiveView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  page: {
    paddingTop: 30,
    width: screens.width,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  forgot: {
    marginTop: 10,
    fontSize: 14,
    alignSelf: "flex-end",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    flex: 1,
    width: "100%",
    paddingHorizontal: screens.width * 0.04,
  },
});
