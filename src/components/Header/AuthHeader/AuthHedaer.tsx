import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowIcon from "@/assets/icon/arrow";
import { router } from "expo-router";

const AuthHedaer = ({ title }: { title: string }) => {
  const Colors = useThemeColors();
  const insetsTop = useSafeAreaInsets().top;
  return (
    <View
      style={[
        {
          paddingTop: insetsTop,
          backgroundColor: Colors.Boxbackground,
          //   height: 76,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors.textPrimary }]}>
          {title}
        </Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowIcon color={Colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
};

export default AuthHedaer;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600", // Yaxshi ko‘rinadigan shrift og‘irligi
    letterSpacing: 1,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
});
