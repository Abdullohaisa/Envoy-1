import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const TabButton = ({
  title,
  index,
  scrollX,
  onPress,
  dataLength,
  pages,
}: any) => {
  const Colors = useThemeColors();

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange =
      pages.length > 1
        ? pages.map((_: any, i: any) => i * screens.width)
        : [0, screens.width];

    const outputRange =
      pages.length > 1
        ? pages.map((_: any, i: any) => (i === index ? "#ffffff" : "#bababa"))
        : ["#bababa", "#ffffff"];

    const color = interpolateColor(scrollX.value, inputRange, outputRange);

    return { color };
  });

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Animated.Text style={[styles.tabText, animatedStyle]}>
        {title}
      </Animated.Text>
      <Animated.Text style={[styles.tabTextLength, animatedStyle]}>
        {dataLength}
      </Animated.Text>
    </Pressable>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 12,
  },
  tabTextLength: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 5,
  },
});
