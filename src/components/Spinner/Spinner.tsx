import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useThemeColors } from "@/theme/useThemeColors";

const DOTS = 8; // nechta nuqta
const RADIUS = 10; // doira radiusi (px)
const DOT_SIZE = 6; // nuqta diametri (px)
const DURATION = 1200; // 1 to‘liq “aylanish” (ms)

// Asosiy rang (variantga ko‘ra dinamik qilsa ham bo‘ladi)

export default function CustomSpinner({ color }: { color?: string }) {
  const Colors = useThemeColors();
  const COLOR = color || Colors.textPrimary;

  /** 0 → DOTS oralig‘ida cheksiz “aylanib” yuradigan qiymat */
  const progress = useSharedValue(0);

  // progress ni doimiy oshirib boramiz
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(DOTS, { duration: DURATION, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // Static nuqtalar massivini chizamiz
  return (
    <View style={styles.wrapper}>
      {Array.from({ length: DOTS }).map((_, i) => {
        /** Har bir nuqta uchun opacity hisobi */
        const dotStyle = useAnimatedStyle(() => {
          // progress.value 0-1-2-3… bo‘lib o‘sadi
          // diff 0 bo‘lsa – eng yorqin, diff → DOTS – eng xira
          const diff = (i - progress.value + DOTS) % DOTS;
          const opacity = interpolate(
            diff,
            [0, DOTS / 2, DOTS],
            [1, 0.3, 1] // gradatsiya: eng yorqin → xira → yana yorqin
          );
          return { opacity };
        });

        // Nuqtani doira bo‘ylab joylashtirish (absolute koord.)
        const angle = (2 * Math.PI * i) / DOTS;
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              dotStyle,
              {
                backgroundColor: COLOR,
                transform: [{ translateX: x }, { translateY: y }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: (RADIUS + DOT_SIZE) * 2,
    height: (RADIUS + DOT_SIZE) * 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
