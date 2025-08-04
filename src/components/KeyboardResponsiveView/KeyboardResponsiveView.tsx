// components/KeyboardResponsiveView.tsx
import React, { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight"; // ← SENING HOOKING

type Props = {
  children: React.ReactNode;
  offset?: number; // Keyboard ustidan necha px tepa bo‘lsin
  style?: StyleProp<ViewStyle>;
};

const KeyboardResponsiveView: React.FC<Props> = ({
  children,
  offset = 10,
  style,
}) => {
  const keyboardHeight = useKeyboardHeight();
  const bottom = useSharedValue(10);

  useEffect(() => {
    const isKeyboardOpen = keyboardHeight > 0;
    bottom.value = withTiming(
      keyboardHeight > 0 ? keyboardHeight + offset : 10,
      {
        duration: isKeyboardOpen ? 300 : 300,
        easing: Easing.out(Easing.cubic),
      }
    );
  }, [keyboardHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: bottom.value,
    left: 0,
    right: 0,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default KeyboardResponsiveView;
