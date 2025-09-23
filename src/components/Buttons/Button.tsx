import {
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { useEffect } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import CustomSpinner from "../Spinner/Spinner";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { Radius } from "@/shared/token";

interface Props {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AppButton = ({
  text,
  style,
  textStyle,
  loading,
  disabled,
  ...props
}: Props & PressableProps) => {
  const Colors = useThemeColors();
  const scale = useSharedValue(1);
  const textOpacity = useSharedValue(1);
  const spinnerOpacity = useSharedValue(1);
  const progress = useSharedValue(0);
  const mode = useAtomValue(themeAtom);

  const handlePressIn = () => {
    if (!loading) {
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    if (!loading) {
      scale.value = withSpring(1);
    }
  };

  useEffect(() => {
    textOpacity.value = withSpring(loading ? 0 : 1);
    spinnerOpacity.value = withSpring(loading ? 1 : 0);
  }, [loading]);

  useEffect(() => {
    progress.value = disabled || loading ? withTiming(1) : withTiming(0);
  }, [disabled, loading]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [
        Colors.primary,
        mode === "dark" ? Colors.borderColor : Colors.pageBackground,
      ]
    ),
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#fff", mode === "dark" ? Colors.textSecondary : Colors.borderColor]
    ),
  }));
  const spinnerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: spinnerOpacity.value,
  }));

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, style, buttonAnimatedStyle]}
      disabled={loading || disabled}
      {...props}
    >
      <Animated.Text style={[styles.text, textStyle, textAnimatedStyle]}>
        {text}
      </Animated.Text>
      <Animated.View style={[styles.spinnerBox, spinnerAnimatedStyle]}>
        <CustomSpinner />
      </Animated.View>
    </AnimatedPressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: Radius.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.5,
    color: "#fff",
  },
  spinnerBox: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
