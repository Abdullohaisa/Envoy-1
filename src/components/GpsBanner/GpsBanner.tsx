import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import AppText from "../Texts/Text";

export const GPSBanner = ({ visible }: { visible: boolean }) => {
  const insets = useSafeAreaInsets();
  const height = 50;

  const translateY = useSharedValue(-height - insets.top); // boshlang'ich holat

  // ✅ visible o'zgarganda animatsiya ishga tushadi
  useEffect(() => {
    translateY.value = visible
      ? withSpring(0, { damping: 15, stiffness: 120 })
      : withSpring(-height - insets.top, { damping: 15, stiffness: 120 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.banner,
        { paddingTop: insets.top, height: height + insets.top },
        animatedStyle,
      ]}
    >
      <AppText style={styles.text}>User aka, GPSni yoqing</AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ff4c4c",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
