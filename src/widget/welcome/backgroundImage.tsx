import { Image, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { welcomePages } from "./pages";
import { screens } from "@/shared/token";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";

const WelcomeBackgroundImage = ({
  activePage,
  welcomeScrollX,
}: {
  activePage: number;
  welcomeScrollX: any;
}) => {
  const current = useAtomValue(themeAtom);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const imageOpacity = { active: 1, inactive: 0 };


  return (
    <View style={styles.container}>
      {welcomePages.map((page, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * screens.width,
            index * screens.width,
            (index + 1) * screens.width,
          ];

          const opacity = interpolate(welcomeScrollX.value, inputRange, [
            imageOpacity.inactive,
            imageOpacity.active,
            imageOpacity.inactive,
          ]);
          return {
            opacity,
          };
        });

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
