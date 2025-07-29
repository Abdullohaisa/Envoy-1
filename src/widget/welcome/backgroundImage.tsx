import { Image, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { welcomePages } from "./pages";
import { screens } from "@/shared/token";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";

const WelcomeBackgroundImage = ({ activePage }: { activePage: number }) => {
  const current = useAtomValue(themeAtom);
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const opacities = welcomePages.map(() => useSharedValue(0));

  useEffect(() => {
    opacities.forEach((opacity, index) => {
      opacity.value = withTiming(index === activePage ? 1 : 0, {
        duration: 500,
      });
    });
  }, [activePage]);

  return (
    <View style={styles.container}>
      {welcomePages.map((page, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: opacities[index].value,
        }));

        return (
          <AnimatedImage
            key={index}
            source={page.img}
            resizeMode="cover"
            blurRadius={100}
            style={[styles.image, animatedStyle]}
          />
        );
      })}
      <View
        style={{
          backgroundColor:
            current === "dark" ? "rgba(0, 0, 0, 0.5)" : "transparent",
          position: "absolute",
          width: screens.width,
          height: screens.height,
        }}
      />
    </View>
  );
};

export default WelcomeBackgroundImage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: screens.width,
    height: screens.height,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    width: screens.width,
    height: screens.height,
  },
});
