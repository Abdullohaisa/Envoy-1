import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import ArrowIcon from "@/assets/icon/arrow";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/theme/useThemeColors";

const UserBackButton = () => {
  const theme = useAtomValue(themeAtom);
  const insets = useSafeAreaInsets();
  const Colors = useThemeColors();
  return (
    <Pressable
      onPress={() => router.back()}
      style={{
        position: "absolute",
        top: 11 + insets.top,
        left: 10,
        padding: 10,
        zIndex: 10,
        // backgroundColor: Colors.pageBackground + "99",
        backgroundColor:
          theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
        borderRadius: 14,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ArrowIcon color={Colors.textPrimary} />
    </Pressable>
  );
};

export default UserBackButton;

const styles = StyleSheet.create({});
