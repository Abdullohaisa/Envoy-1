import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";

const DriverOrderLayout = () => {
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

export default DriverOrderLayout;

const styles = StyleSheet.create({});
