import {
  Pressable,
  StyleSheet,
  View,
  Animated,
  PressableProps,
  Keyboard,
} from "react-native";
import { useRef } from "react";
import AppText from "@/components/Texts/Text";
import ArrowIcon from "@/assets/icon/arrow";
import { useThemeColors } from "@/theme/useThemeColors";

const GetOrderBackButton = ({
  title,
  ...props
}: PressableProps & { title: string }) => {
  const Colors = useThemeColors();
  const theme = "light"; // misol uchun, keyinchalik prop yoki atom orqali keladi

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Keyboard.dismiss();
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Keyboard.dismiss();
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        {...props}
      >
        <ArrowIcon size={12} direction="left" color={Colors.primary} />
        <AppText style={[styles.text, { color: Colors.primary }]}>
          {title}
        </AppText>
      </Pressable>
    </Animated.View>
  );
};

export default GetOrderBackButton;

const styles = StyleSheet.create({
  animatedView: {},
  button: {
    alignSelf: "baseline",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 8,
    borderRadius: 8,
  },
  text: {
    // fontSize: 12,
  },
});
