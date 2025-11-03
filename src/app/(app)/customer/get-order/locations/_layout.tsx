import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";

const LocationsLayout = () => {
  const Colors = useThemeColors();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.pageBackground },
        headerShown: false,
      }}
    />
  );
};

export default LocationsLayout;

const styles = StyleSheet.create({});
