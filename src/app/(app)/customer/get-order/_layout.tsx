import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";

const GetOrderLayout = () => {
  const Colors = useThemeColors();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.pageBackground },
        headerShown: false,
        animation: "default",
      }}
    />
  );
};

export default GetOrderLayout;
