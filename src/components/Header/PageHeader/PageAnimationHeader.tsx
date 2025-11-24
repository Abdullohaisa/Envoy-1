import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import PageHeader from "./PageHeader";
import { StyleSheet } from "react-native";

const AnimationHeader = ({ scrollY }: { scrollY: SharedValue<number> }) => {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 80],
      [0, -80],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  return (
    <Animated.View style={[styles.headerWrapper, headerAnimatedStyle]}>
      <PageHeader title="Yukingiz" />
    </Animated.View>
  );
};

export default AnimationHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
