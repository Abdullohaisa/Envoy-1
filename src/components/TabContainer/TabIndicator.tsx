import { screens } from "@/shared/token";
import { themeAtom } from "@/theme/theme";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const TabIndicator = ({ scrollX, pages }: any) => {
  const theme = useAtomValue(themeAtom);
  const Colors = useThemeColors();

  if (pages.length === 1) {
    return null;
  }

  const indicatorWidth = screens.width / pages.length;

  const translateX = useDerivedValue(() => {
    return (scrollX.value / screens.width) * indicatorWidth;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <Animated.View
      style={[
        styles(pages).indicator,
        {
          width: indicatorWidth, // 🔥 yangi kenglik
          backgroundColor: theme === "light" ? "#ffffff" : Colors.primary,
        },
        animatedStyle,
      ]}
    />
  );
};

export default TabIndicator;

const styles = (pages: any) =>
  StyleSheet.create({
    indicator: {
      position: "absolute",
      bottom: 0,
      height: 4,
      width: screens.width / pages.length, // 2 ta page uchun teng bo‘lib turadi
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });
