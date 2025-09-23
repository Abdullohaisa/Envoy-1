import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";
import Toast, { ErrorToast } from "react-native-toast-message";
import { Radius } from "@/shared/token";

const AuthLaout = () => {
  const Colors = useThemeColors();

  const toastConfig = {
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          backgroundColor: "#323232", // To‘q fon
          borderWidth: 1,
          borderColor: "red", // Qizil border
          borderLeftWidth: 1,
          borderRadius: Radius.primary,
          borderLeftColor: "transparent", // ❌ Chap tarafdagi default qizil chiziqni yo‘q qilamiz
          shadowColor: "transparent", // iOS'da default soyani olib tashlaymiz agar xohlasang
          elevation: 20, // Android'da shadow yo‘qotish uchun
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#ffffff",
        }}
        text2Style={{
          fontSize: 14,
          color: "#ccc",
        }}
      />
    ),
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
          gestureEnabled: true,
          contentStyle: { backgroundColor: Colors.pageBackground },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="reset-password"
          options={{
            animation: "fade_from_bottom",
            presentation: "containedModal",
            contentStyle: { backgroundColor: Colors.pageBackground },
          }}
        />
        <Stack.Screen name="auth" />
      </Stack>
      <Toast config={toastConfig} position="top" topOffset={0} />
    </>
  );
};

export default AuthLaout;
