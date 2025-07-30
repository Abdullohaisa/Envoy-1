import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TextStyle } from "react-native";
import AppText from "./Text";

type AnimatedErrorTextProps = {
  error?: string | null;
  style?: TextStyle; // 🔥 tashqi style prop
};

const AnimatedErrorText: React.FC<AnimatedErrorTextProps> = ({
  error,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-5)).current;

  useEffect(() => {
    if (error) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300, // ❗ Yoqolishda sekinroq
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -5,
          duration: 300, // ❗ Tepaga sekin chiqib ketadi
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  if (!error) return null;

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <AppText style={[styles.errorText, style]}>{error}</AppText>
    </Animated.View>
  );
};

export default AnimatedErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
