import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import AppButton from "@/components/Buttons/Button";
import Login from "@/widget/auth/login";
import RegisterPhone from "@/widget/auth/register";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import AuthTabs from "@/widget/auth/Tabs";
import { useSharedValue } from "react-native-reanimated";
import { atom, useAtomValue } from "jotai";
import { authAtom } from "@/service/auth/controller";

export const isValidLoginAtom = atom<boolean | null>(null);
export const isValidRegAtom = atom<boolean | null>(null);

export default function Auth() {
  const Colors = useThemeColors();
  const [activePage, setActivePage] = useState<number>(0);
  const ref = useRef<ScrollView>(null);
  const scrollX = useSharedValue(0); // 👈 scroll qiymati
  const loginSubmitRef = useRef<() => void>(() => {});
  const registerSubmitRef = useRef<() => void>(() => {});
  const { isLoading } = useAtomValue(authAtom);
  const isValidLogin = useAtomValue(isValidLoginAtom);
  const isValidReg = useAtomValue(isValidRegAtom);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      {/* Tablar */}
      <AuthTabs ref={ref} activePage={activePage} scrollX={scrollX} />

      {/* Scroll pages */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
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

        <RegisterPhone onSubmitRef={registerSubmitRef} />
      </ScrollView>

      {/* Umumiy pastdagi button */}
      {/* <AuthButton
        text={activePage === 0 ? "Dasturga kirish" : "Ro'yxatdan o'tish"}
        loading={isLoading}
        onPress={() => {
          if (activePage === 0) {
            loginSubmitRef.current(); // Login formani submit qiladi
          } else {
            registerSubmitRef.current(); // Register formani submit qiladi
          }
        }}
      /> */}
      <KeyboardResponsiveView
        style={{ paddingHorizontal: screens.width * 0.04 }}
      >
        <AppButton
          text={activePage === 0 ? "Dasturga kirish" : "Ro'yxatdan o'tish"}
          loading={isLoading}
          disabled={activePage === 0 ? !isValidLogin : !isValidReg}
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
});
