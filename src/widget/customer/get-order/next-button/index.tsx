import {
  Pressable,
  StyleSheet,
  View,
  Animated,
  PressableProps,
} from "react-native";
import React, { useRef } from "react";
import AppText from "@/components/Texts/Text";
import ArrowIcon from "@/assets/icon/arrow";
import { useThemeColors } from "@/theme/useThemeColors";

const GetOrderNextButton = ({
  title,
  ...props
}: PressableProps & { title: string }) => {
  const Colors = useThemeColors();
  const theme = "light"; // misol uchun, keyinchalik prop yoki atom orqali keladi

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.animatedView, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <AppText style={styles.text}>{title}</AppText>
        <ArrowIcon
          size={12}
          direction="right"
          color={theme !== "light" ? "#ddd" : Colors.textSecondary}
        />
      </Pressable>
    </Animated.View>
  );
};

export default GetOrderNextButton;

const styles = StyleSheet.create({
  animatedView: {
    // Animated.View uchun style
  },
  button: {
    alignSelf: "baseline",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 8,
    backgroundColor: "#fff", // oq back
    borderRadius: 8,
    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Elevation (Android)
    elevation: 3,
  },
  text: {
    fontSize: 12,
  },
});
