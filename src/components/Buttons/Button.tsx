import {
  Pressable,
  PressableProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import AppText from "../Texts/Text";
import CustomSpinner from "../Spinner/Spinner";
import { useThemeColors } from "@/theme/useThemeColors";

interface IProps {
  title: string;
  isLoading?: boolean;
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  variant?: "primary" | "secondary" | "red";
}

export default function AppButton({
  title,
  isLoading,
  buttonStyle,
  titleStyle,
  variant = "primary",
  disabled,
  ...props
}: IProps & PressableProps) {
  const Colors = useThemeColors();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const variants = {
    primary: { backgroundColor: Colors.primary, textColor: Colors.textPrimary },
    secondary: {
      backgroundColor: Colors.borderColor,
      textColor: Colors.textPrimary,
    },
    red: { backgroundColor: Colors.red + "33", textColor: Colors.red },
    disabled: {
      backgroundColor: Colors.borderColor,
      textColor: Colors.textSecondary,
    },
  } as const;

  const currentVariant =
    disabled || isLoading ? "disabled" : (variant ?? "primary");
  const { backgroundColor, textColor } = variants[currentVariant];

  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, { backgroundColor }, animatedStyle, buttonStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <AppText
          variant="medium"
          style={[styles.text, { color: textColor }, titleStyle]}
        >
          {title}
        </AppText>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
});
