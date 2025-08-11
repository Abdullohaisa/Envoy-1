import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import React, { useEffect } from "react";
import { useThemeColors } from "@/theme/useThemeColors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type EyeCloseIconProps = {
  color?: string;
  isSecure: boolean;
};

function EyeCloseIcon({ isSecure, color }: EyeCloseIconProps) {
  const Colors = useThemeColors();

  // Chiziqning uzunligi taxminan (ko‘r-ko‘rona)
  const DASH_LENGTH = 30;
  const offset = useSharedValue(isSecure ? 0 : DASH_LENGTH);

  useEffect(() => {
    offset.value = withTiming(isSecure ? 0 : DASH_LENGTH, { duration: 300 });
  }, [isSecure]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: offset.value,
  }));

  return (
    <Svg width={22} height={22} viewBox="0 0 32 32" fill="none">
      {/* Ko‘z shakli */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.94 20.486a25.595 25.595 0 002.977-3.065c.518-.628.777-.943.777-1.421 0-.478-.259-.793-.776-1.42C25.024 12.28 20.848 8 16 8c-1.305 0-2.56.31-3.737.808l3.224 3.225a4 4 0 014.48 4.48l3.974 3.973zm-2.444 1.798l-3.089-3.089a4 4 0 01-5.602-5.602l-3.251-3.251c-1.943 1.373-3.505 3.063-4.471 4.237-.518.628-.777.943-.777 1.421 0 .478.26.793.777 1.42C6.976 19.72 11.153 24 16 24c1.98 0 3.85-.715 5.496-1.716z"
        fill={color || Colors.primary}
      />

      {/* Ustidan chiziq — animatsiyali */}
      <AnimatedPath
        d="M6.667 2.667L28 24"
        stroke={color || Colors.primary}
        strokeWidth={2}
        strokeDasharray={DASH_LENGTH}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}

export default EyeCloseIcon;
