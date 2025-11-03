// components/Auth/SmsCodeBox.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import { Radius, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AppText from "@/components/Texts/Text";

interface SmsCodeBoxProps {
  code: string;
  animValues: any[];
  isCodeCorrect: boolean | null;
}

const SmsCodeBox: React.FC<SmsCodeBoxProps> = ({
  code,
  animValues,
  isCodeCorrect,
}) => {
  const Colors = useThemeColors();

  const borderColor = () => {
    if (isCodeCorrect === true) return "green";
    if (isCodeCorrect === false) return "red";
    return "transparent";
  };

  const animatedStyle = (index: number) =>
    useAnimatedStyle(() => {
      const visible = animValues[index].value === 1;
      return {
        opacity: withTiming(visible ? 1 : 0, { duration: 100 }),
        transform: [
          { translateY: withTiming(visible ? 0 : 20, { duration: 100 }) },
          { scale: withTiming(visible ? 1 : 0.8, { duration: 100 }) },
        ],
      };
    });

  return (
    <View style={styles.mainBox}>
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.box,
            {
              borderColor: borderColor(),
              backgroundColor: Colors.Boxbackground,
            },
          ]}
        >
          <Animated.View style={animatedStyle(i)}>
            <AppText style={styles.text}>{code[i] ?? ""}</AppText>
          </Animated.View>
        </View>
      ))}
    </View>
  );
};

export default SmsCodeBox;

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  box: {
    width: screens.width * 0.2,
    height: screens.width * 0.2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
  },
  text: {
    fontSize: 22,
  },
});
