import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { Spacing, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import AppButton from "@/components/Buttons/Button";
import Login from "@/widget/auth/login";
import RegisterPhone, { checkRegLoading } from "@/widget/auth/register";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import AuthTabs from "@/widget/auth/Tabs";
import { useSharedValue } from "react-native-reanimated";
import { useAtomValue } from "jotai";
import { isValidLoginAtom, isValidRegAtom } from "@/atoms/reg.login.valid";
import { authStateAtom } from "@/service/user/register-login/controller";

export default function Auth() {
  const Colors = useThemeColors();
  const [activePage, setActivePage] = useState<number>(0);
  const ref = useRef<ScrollView>(null);
  const scrollX = useSharedValue(0); // 👈 scroll qiymati
  const loginSubmitRef = useRef<() => void>(() => {});
  const registerSubmitRef = useRef<() => void>(() => {});
  const { isLoading } = useAtomValue(authStateAtom);
  const isValidLogin = useAtomValue(isValidLoginAtom);
  const isValidReg = useAtomValue(isValidRegAtom);
  const checkLoadingReg = useAtomValue(checkRegLoading);

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

      <KeyboardResponsiveView
        offset={0}
        style={{ paddingHorizontal: Spacing.horizontal }}
      >
        <AppButton
          title={activePage === 0 ? "Dasturga kirish" : "Ro'yxatdan o'tish"}
          isLoading={isLoading || checkLoadingReg}
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
