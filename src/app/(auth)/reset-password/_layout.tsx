import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";

const ResetLayout = () => {
  const Colors = useThemeColors();
  return (
    <Stack
      screenOptions={{
        animation: "ios_from_right",
        contentStyle: { backgroundColor: Colors.pageBackground },
        headerShown: false,
      }}
    />
  );
};

export default ResetLayout;
