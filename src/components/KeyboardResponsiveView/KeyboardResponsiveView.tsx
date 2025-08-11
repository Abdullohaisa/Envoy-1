import React, { useEffect } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";

type Props = {
  children: React.ReactNode;
  offset?: number; // Keyboard ustidan necha px tepa bo‘lsin
  style?: StyleProp<ViewStyle>;
};

const KeyboardResponsiveView: React.FC<Props> = ({
  children,
  offset = Platform.OS === "ios" ? 0 : 15,
  style,
}) => {
  const keyboardHeight = useKeyboardHeight();
  const bottom = useSharedValue(0);
  const Colors = useThemeColors();

  useEffect(() => {
    const isKeyboardOpen = keyboardHeight > 0;
    bottom.value = withTiming(isKeyboardOpen ? keyboardHeight + offset : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [keyboardHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    const isKeyboardOpen = keyboardHeight > 0;

    return {
      position: "absolute",
      bottom: bottom.value,
      left: 0,
      right: 0,
      paddingHorizontal: screens.width * 0.04,
      height: isKeyboardOpen ? screens.height * 0.09 : screens.height * 0.12,
      backgroundColor: Colors.Boxbackground,
      borderRadius: isKeyboardOpen ? 30 : 30,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingTop: isKeyboardOpen ? 10 : 10,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default KeyboardResponsiveView;
