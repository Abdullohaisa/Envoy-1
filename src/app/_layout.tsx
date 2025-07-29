import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useSetAtom } from "jotai";
import { loadThemeAtom } from "@/theme/theme";

const Layout = () => {
  const loadTheme = useSetAtom(loadThemeAtom);

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
        }}
      />
    </>
  );
};

export default Layout;
