// components/PasswordRequirements.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "../Texts/Text";

type Props = {
  password: string;
};

const checks = [
  {
    id: "upper",
    text: "Kamida 1 ta KATTA harf",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    id: "lower",
    text: "Kamida 1 ta kichik harf",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    id: "digit",
    text: "Kamida 1 ta son",
    test: (pw: string) => /\d/.test(pw),
  },
  {
    id: "length",
    text: "Kamida 8 ta belgi",
    test: (pw: string) => pw.length >= 8,
  },
];

const PasswordRequirements: React.FC<Props> = ({ password }) => {
  const Colors = useThemeColors();

  return (
    <View style={styles.wrapper}>
      {checks.map((c) => (
        <ReqRow
          key={c.id}
          text={c.text}
          satisfied={c.test(password)}
          colors={Colors}
        />
      ))}
    </View>
  );
};

export default PasswordRequirements;

/* --- subcomponent for animated row --- */

const ReqRow = ({ text, satisfied, colors }: any) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(satisfied ? 1 : 0.6);

  useEffect(() => {
    // kichik animatsiya: satisfied bo'lsa kattalashtirish va opacity 1 ga o'tkazish
    if (satisfied) {
      scale.value = withSpring(1.05, { damping: 30 });
      opacity.value = withTiming(1, { duration: 200 });
      // keyin biroz normallashtirish
      setTimeout(() => {
        scale.value = withSpring(1, { damping: 12 });
      }, 200);
    } else {
      opacity.value = withTiming(0.6, { duration: 200 });
    }
  }, [satisfied]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.row, animatedStyle]}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: satisfied ? colors.primary : colors.borderColor,
            backgroundColor: satisfied ? colors.primary : "transparent",
          },
        ]}
      >
        <AppText
          style={[
            styles.checkmark,
            { color: satisfied ? "#fff" : colors.textSecondary },
          ]}
        >
          {satisfied ? "✓" : ""}
        </AppText>
      </View>
      <AppText
        style={[
          styles.rowText,
          { color: satisfied ? colors.textPrimary : colors.textSecondary },
        ]}
      >
        {text}
      </AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "700",
  },
  rowText: {
    fontSize: 14,
  },
});
