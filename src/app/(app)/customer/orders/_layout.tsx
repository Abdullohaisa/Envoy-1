import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";

const CustomerOrdersLayout = () => {
  const Colors = useThemeColors();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.pageBackground },
      }}
    />
  );
};

export default CustomerOrdersLayout;

const styles = StyleSheet.create({});
