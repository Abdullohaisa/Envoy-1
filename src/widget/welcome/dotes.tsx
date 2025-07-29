import React from "react";
import { View } from "react-native";
import { welcomePages } from "./pages";
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  interpolateColor,
} from "react-native-reanimated";
import { WelcomePageStyles as styles } from "./style";
import { useThemeColors } from "@/theme/useThemeColors";
import { screens } from "@/shared/token";

const WelcomePageDotes = ({ welcomeScrollX }: { welcomeScrollX: any }) => {
  const Colors = useThemeColors();
  const dotSize = { active: screens.width * 0.6, inactive: 20 };

  return (
    <View style={styles.dotesBox}>
      {welcomePages.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * screens.width,
            index * screens.width,
            (index + 1) * screens.width,
          ];

          const width = interpolate(
            welcomeScrollX.value,
            inputRange,
            [dotSize.inactive, dotSize.active, dotSize.inactive],
            Extrapolate.CLAMP
          );

          const backgroundColor = interpolateColor(
            welcomeScrollX.value,
            inputRange,
            ["#fff", Colors.primary, "#fff"]
          );

          return {
            width,
            backgroundColor,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dotes,
              animatedStyle,
              { borderColor: Colors.primary },
            ]}
          />
        );
      })}
    </View>
  );
};

export default WelcomePageDotes;
