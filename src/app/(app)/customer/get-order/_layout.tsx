import { Stack } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";
import React, { useMemo } from "react";

const GetOrderLayout = React.memo(() => {
  const Colors = useThemeColors();

  // 🔹 screenOptions ni useMemo bilan barqaror qilamiz
  const screenOptions = useMemo(
    () => ({
      contentStyle: { backgroundColor: Colors.pageBackground },
      headerShown: false,
    }),
    [Colors.pageBackground] // faqat rang o‘zgarsa yangilanadi
  );

  return <Stack screenOptions={screenOptions} />;
});

export default GetOrderLayout;
