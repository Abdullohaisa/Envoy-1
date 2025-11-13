import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { useEffect } from "react";
import MoonIcon from "@/assets/icon/moon";
import SunIcon from "@/assets/icon/sun";
import { useThemeColors } from "@/theme/useThemeColors";

const ThemeSwitch = ({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) => {
  const Colors = useThemeColors();
  const progress = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isDark ? 1 : 0, { duration: 250 });
  }, [isDark]);

  const sunStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1 - progress.value, { duration: 250 }),
  }));

  const moonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 250 }),
  }));

  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={[
          {
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: "center",
            padding: 3,
            overflow: "hidden",
          },
        ]}
      >
        <Animated.View style={[sunStyle, { position: "absolute" }]}>
          <SunIcon size={28} color={Colors.textSecondary} />
        </Animated.View>
        <Animated.View style={[moonStyle, { position: "absolute" }]}>
          <MoonIcon size={28} color={Colors.textSecondary} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default ThemeSwitch;
