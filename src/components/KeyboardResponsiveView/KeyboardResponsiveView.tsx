import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import React, { useEffect } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  offset?: number; // Keyboard ustidan necha px tepa bo‘lsin
  style?: StyleProp<ViewStyle>;
  disabled?: boolean; // 🔥 qo‘shilgan prop
};

const KeyboardResponsiveView: React.FC<Props> = ({
  children,
  offset = Platform.OS === "ios" ? -25 : 0,
  style,
  disabled = false, // default ishlaydi, lekin xohlasa o‘chirib qo‘yadi
}) => {
  const Colors = useThemeColors();
  const keyboardHeight = useKeyboardHeight();
  const bottom = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom !== 0 ? insets.bottom : 30;

  useEffect(() => {
    if (disabled) {
      bottom.value = 0; // ishlashni to‘xtatadi
      return;
    }

    const isKeyboardOpen = keyboardHeight > 0;
    bottom.value = withTiming(isKeyboardOpen ? keyboardHeight : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [keyboardHeight, disabled]);

  const animatedStyle = useAnimatedStyle(() => {
    const isKeyboardOpen = keyboardHeight > 0 && !disabled;

    return {
      position: "absolute",
      bottom: bottom.value,
      left: 0,
      right: 0,
      paddingHorizontal: screens.width * 0.04,
      height: isKeyboardOpen
        ? screens.height * 0.061 + bottomInset
        : screens.height * 0.081 + bottomInset,
      backgroundColor: Colors.Boxbackground,
      borderRadius: 30,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingTop: 10,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default KeyboardResponsiveView;
