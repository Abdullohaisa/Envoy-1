import { Pressable, PressableProps, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { WelcomePageStyles as styles } from "./style";
import { useThemeColors } from "@/theme/useThemeColors";
import ArrowIcon from "@/assets/icon/arrow";
import AppText from "@/components/Texts/AppText";

interface Props {
  handleNext: () => void;
  handlePrev: () => void;
  activePage: number;
}

const WelcomeButton = ({ handleNext, handlePrev, activePage }: Props) => {
  const Colors = useThemeColors();
  const backButtonWidth = useSharedValue(0);
  const backButtonOpacity = useSharedValue(0);
  const backButtonTextOpacity = useSharedValue(0);

  const AnimtedPressable =
    Animated.createAnimatedComponent<PressableProps>(Pressable);

  const backAnimatedStyle = useAnimatedStyle(() => ({
    width: backButtonWidth.value,
    opacity: backButtonOpacity.value,
  }));

  useEffect(() => {
    backButtonWidth.value = withTiming(activePage === 0 ? 0 : 65, {
      duration: 300,
    });
    backButtonOpacity.value = withTiming(activePage === 0 ? 0 : 1, {
      duration: 250,
    });
    backButtonTextOpacity.value = withTiming(activePage === 0 ? 0 : 1, {
      duration: activePage === 0 ? 100 : 500,
    });
  }, [activePage]);

  return (
    <View
      style={[styles.mainButtonBox, { backgroundColor: Colors.background }]}
    >
      <Pressable
        onPress={handleNext}
        style={[styles.mainButton, { backgroundColor: Colors.primary }]}
      >
        <AppText style={[styles.mainButtonText, { color: "#fff" }]}>
          Boshlash
        </AppText>

        <AnimtedPressable
          onPress={handlePrev}
          style={[
            styles.back,
            { backgroundColor: Colors.background },
            backAnimatedStyle,
          ]}
        >
          <AppText
            style={[
              { color: Colors.textPrimary, fontSize: 20 },
              backAnimatedStyle,
            ]}
          >
            <ArrowIcon color={Colors.primary} />
          </AppText>
        </AnimtedPressable>
      </Pressable>
    </View>
  );
};

export default WelcomeButton;
