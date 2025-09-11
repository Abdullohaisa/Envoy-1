import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";

const GetOrderLayout = () => {
  const Colors = useThemeColors();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.pageBackground },
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
};

export default GetOrderLayout;
