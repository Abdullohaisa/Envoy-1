import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

const CustomerOrdersLayout = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor:
            theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
        },
      }}
    />
  );
};

export default CustomerOrdersLayout;

const styles = StyleSheet.create({});
