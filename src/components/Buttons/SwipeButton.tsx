import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useDerivedValue,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useThemeColors } from "@/theme/useThemeColors";
import ArrowIcon from "@/assets/icon/arrow";

const { width } = Dimensions.get("window");

const SwipeButton = ({ onConfirm }: { onConfirm: () => void }) => {
  const Colors = useThemeColors();
  const translateX = useSharedValue(0);
  const confirmed = useSharedValue(false);
  const maxSwipe = width * 0.77;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (
        !confirmed.value &&
        e.translationX >= 0 &&
        e.translationX <= maxSwipe
      ) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value > maxSwipe * 0.8) {
        confirmed.value = true;
        translateX.value = withSpring(maxSwipe, { damping: 40 });

        // OnConfirm chaqiramiz
        runOnJS(onConfirm)();

        // 1.2 sekunddan keyin qayta tiklaymiz
        setTimeout(() => {
          confirmed.value = false;
          translateX.value = withSpring(0, { damping: 80 });
        }, 1200);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: confirmed.value ? 0.5 : 1,
  }));

  const displayText = useDerivedValue(() => {
    return confirmed.value ? "Yo‘lga chiqdingiz" : "Yo‘lga chiqish";
  });

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.primary + "22" }]}
    >
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.swipeCircle,
            { backgroundColor: Colors.primary },
            animatedCircleStyle,
          ]}
        >
          <ArrowIcon direction="right" />
        </Animated.View>
      </GestureDetector>

      <Animated.Text
        style={[styles.text, { color: Colors.primary }, animatedTextStyle]}
        numberOfLines={1}
      >
        {displayText.value}
      </Animated.Text>
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    overflow: "hidden",
  },
  swipeCircle: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
