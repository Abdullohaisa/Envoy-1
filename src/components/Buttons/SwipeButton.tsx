import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useThemeColors } from "@/theme/useThemeColors";
import ArrowIcon from "@/assets/icon/arrow";
import CustomSpinner from "../Spinner/Spinner";

const { width } = Dimensions.get("window");

const SwipeButton = ({
  onConfirm,
  isLoading,
  disabled = false,
  title,
}: {
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  title: string;
}) => {
  const Colors = useThemeColors();
  const translateX = useSharedValue(0);
  const confirmed = useSharedValue(false);
  const maxSwipe = width * 0.77;

  // Agar isLoading false bo'lsa, tugmani tiklaymiz
  useEffect(() => {
    if (!isLoading && confirmed.value) {
      confirmed.value = false;
      translateX.value = withSpring(0, { damping: 80 });
    }
  }, [isLoading]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (disabled) return;
      if (
        !confirmed.value &&
        e.translationX >= 0 &&
        e.translationX <= maxSwipe
      ) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (disabled) return;
      if (translateX.value > maxSwipe * 0.8) {
        confirmed.value = true;
        translateX.value = withSpring(maxSwipe, { damping: 40 });

        runOnJS(onConfirm)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.4 : 1,
  }));

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.primary + "22" }]}
    >
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.swipeCircle,
            { backgroundColor: Colors.primary, zIndex: 10 },
            animatedCircleStyle,
          ]}
        >
          {isLoading ? (
            <CustomSpinner />
          ) : (
            <ArrowIcon direction="right" color="#fff" />
          )}
        </Animated.View>
      </GestureDetector>

      <Animated.Text
        style={[styles.text, { color: Colors.primary }, animatedTextStyle]}
        numberOfLines={1}
      >
        {title}
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
