import Svg, { Path } from "react-native-svg";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import React, { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type EyeCloseIconProps = {
  color?: string;
  isOpen?: boolean;
};

function EyeCloseIcon({ color, isOpen = false }: EyeCloseIconProps) {
  const Colors = useThemeColors();

  // chiziq animatsiyasi uchun qiymatlar
  const dashOffset = useSharedValue(isOpen ? 20 : 0);
  const iconScale = useSharedValue(1);

  useEffect(() => {
    dashOffset.value = withTiming(isOpen ? 20 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });

    iconScale.value = withTiming(0.95, { duration: 150 }, () => {
      iconScale.value = withTiming(1, { duration: 150 });
    });
  }, [isOpen]);

  const animatedLineProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
    strokeOpacity: isOpen ? 0 : 1,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <AnimatedSvg
      width={28}
      height={28}
      viewBox="0 0 32 32"
      fill="none"
      style={animatedIconStyle}
    >
      {/* Ko‘z shakli */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.774 8c0-.35-.191-.59-.575-1.073C21.465 4.747 17.105 0 12 0 6.896 0 2.536 4.746.802 6.927.417 7.41.225 7.651.225 8c0 .35.192.59.576 1.073C2.535 11.253 6.895 16 12 16c5.105 0 9.465-4.746 11.2-6.927.383-.483.575-.724.575-1.073zM12 12a4 4 0 100-8 4 4 0 000 8z"
        fill={color ? color : Colors.primary}
      />

      {/* Ustidan chiziq */}
      <AnimatedPath
        d="M6.667 2.667L28 24"
        stroke={color || Colors.primary}
        strokeWidth={2}
        strokeDasharray={30}
        animatedProps={animatedLineProps}
      />
    </AnimatedSvg>
  );
}

export default EyeCloseIcon;
