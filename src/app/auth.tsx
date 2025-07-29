import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { setThemeAtom, themeAtom } from "@/theme/theme";
import { useSetAtom, useAtomValue } from "jotai";
import AppText from "@/components/Texts/AppText";

const Auth = () => {
  const Colors = useThemeColors();
  const current = useAtomValue(themeAtom);
  const setTheme = useSetAtom(setThemeAtom);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText style={{ color: Colors.textSecondary }}>
        Hozirgi theme: {current}
      </AppText>
      <Button title="Light" onPress={() => setTheme("light")} />
      <Button title="Dark" onPress={() => setTheme("dark")} />
      <Button title="Device" onPress={() => setTheme("device")} />
    </View>
  );
};

export default Auth;
