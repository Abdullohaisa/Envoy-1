import { Pressable, StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { authPages } from "@/app/(auth)/auth";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const AuthTabs = ({ ref, scrollX }: any) => {
  const insetsTop = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const tabWidth = width / authPages.length;

  const handleScrollTo = (index: number) => {
    ref.current?.scrollTo({
      x: width * index,
      animated: true,
    });
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, width],
      [0, tabWidth],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[
        styles.tabsWrapper,
        { paddingTop: insetsTop, backgroundColor: Colors.Boxbackground },
      ]}
    >
      <View style={styles.tabs}>
        {authPages.map((page, index) => {
          const inputRange = authPages.map((_, i) => i * width);

          const animatedTextStyle = useAnimatedStyle(() => {
            const color = interpolateColor(
              scrollX.value,
              inputRange,
              inputRange.map((_, i) =>
                i === index ? Colors.primary : Colors.textSecondary
              )
            );

            // const fontWeight = interpolate(
            //   scrollX.value,
            //   inputRange,
            //   inputRange.map((_, i) => (i === index ? 500 : 500)),
            //   Extrapolate.CLAMP
            // );

            return {
              color,
              // fontWeight: fontWeight.toString(), // fontWeight raqamli bo‘lsa, stringga o‘gir
            };
          });

          return (
            <Pressable
              key={page.id}
              onPress={() => handleScrollTo(index)}
              style={styles.tab}
            >
              <Animated.Text style={[{ fontSize: 16 }, animatedTextStyle]}>
                {page.title}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>

      <Animated.View
        style={[
          styles.indicator,
          { backgroundColor: Colors.primary, width: tabWidth },
          animatedIndicatorStyle,
        ]}
      />
    </View>
  );
};

export default AuthTabs;

const styles = StyleSheet.create({
  tabsWrapper: {
    position: "relative",
    // backgroundColor: "#333333", // To‘q fon
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  indicator: {
    height: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});
