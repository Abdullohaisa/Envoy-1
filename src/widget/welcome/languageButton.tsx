import { Pressable, View } from "react-native";
import React from "react";
import { WelcomePageStyles as styles } from "./style";
import AppText from "@/components/Texts/Text";
import SunIcon from "@/assets/icon/sun";
import { useAtom } from "jotai";
import { themeAtom } from "@/theme/theme";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MoonIcon from "@/assets/icon/moon";

const WelcomeLanguageButton = ({ welcomeScrollX }: any) => {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === "dark";
  const sunOpacity = useSharedValue(isDark ? 0 : 1);
  const moonOpacity = useSharedValue(isDark ? 1 : 0);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    sunOpacity.value = withTiming(isDark ? 1 : 0, { duration: 150 });
    moonOpacity.value = withTiming(isDark ? 0 : 1, { duration: 150 });
  };

  const sunStyle = useAnimatedStyle(() => ({
    opacity: sunOpacity.value,
    transform: [
      { scale: withTiming(sunOpacity.value, { duration: 200 }) },
      {
        rotate: withTiming(sunOpacity.value === 1 ? "180deg" : "0deg", {
          duration: 300,
        }),
      },
    ],
    position: "absolute",
  }));

  const moonStyle = useAnimatedStyle(() => ({
    opacity: moonOpacity.value,
    transform: [
      { scale: withTiming(moonOpacity.value, { duration: 200 }) },
      {
        rotate: withTiming(sunOpacity.value === 1 ? "-120deg" : "30deg", {
          duration: 300,
        }),
      },
    ],

    position: "absolute",
  }));

  const animatedStyle = useAnimatedStyle(() => {
    const visibleValues = [0, 360, 720];
    const isVisible = visibleValues.includes(Math.round(welcomeScrollX.value));

    return {
      opacity: withTiming(isVisible ? 1 : 0, {
        duration: isVisible ? 300 : 50,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  return (
    <Animated.View style={[styles.langButton, animatedStyle]}>
      <Pressable
        style={{
          paddingVertical: 5,
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleTheme}
      >
        <Animated.View style={[sunStyle]}>
          <SunIcon color="#555" />
        </Animated.View>
        <Animated.View style={[moonStyle]}>
          <MoonIcon color="#555" />
        </Animated.View>
      </Pressable>
      <View style={{ width: "100%", height: 1, backgroundColor: "#555" }} />
      <Pressable
        style={{
          paddingVertical: 5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <AppText style={{ color: "#555", fontWeight: "300" }}>Uz</AppText>
      </Pressable>
    </Animated.View>
  );
};

export default WelcomeLanguageButton;
