// --- React Native UI va interaktiv komponentlar ---
import {
  Pressable,
  StyleSheet,
  PressableProps,
  TextStyle,
  ViewStyle,
} from "react-native";

// --- Ranglar to‘plami (design token) ---

// --- Animatsiya uchun kutubxona (Reanimated v2) ---
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

// --- React hook ---
import { useEffect } from "react";

// --- Qurilma vibratsiyasi uchun Haptic kutubxonasi (Expo) ---
import * as Haptics from "expo-haptics";
import CustomSpinner from "../Spinner/Spinner";
import { useThemeColors } from "@/theme/useThemeColors";

// --- Faqat 3 ta ruxsat etilgan vibratsiya turini ifodalovchi TypeScript enum ---
enum VibrationType {
  Light = "Light",
  Medium = "Medium",
  Heavy = "Heavy",
}

// --- Tugmaning qo‘shimcha xususiyatlarini belgilovchi interface ---
interface ButtonProps {
  text: string; // Tugmadagi matn
  isLoading?: boolean; // Yuklanish holati ko‘rsatiladimi
  vibration?: boolean; // Vibratsiya kerakmi
  vibrationType?: VibrationType; // Vibratsiya turi (enum)
  variant?: "primary" | "outline" | "danger" | "dangerOutline" | "silver";
  fullWidth?: boolean;
  width?: number | string; // Tugma uslubi (variant)
  disabled?: boolean;
  style?: ViewStyle;
}

// --- Tugma variantlari uchun tip ---
type ButtonVariant =
  | "primary"
  | "outline"
  | "danger"
  | "dangerOutline"
  | "silver";

// --- AnimatedPressable: Reanimated bilan ishlaydigan Pressable komponent ---
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --- Asosiy PrimaryButton komponenti ---
const AppButton = ({
  text,
  isLoading,
  vibration,
  vibrationType = VibrationType.Light,
  variant = "primary",
  fullWidth,
  width,
  disabled,
  fontStyle, // <--- Yangi prop qo'shildi
  style,
  ...props
}: PressableProps & ButtonProps & { fontStyle?: TextStyle }) => {
  const scale = useSharedValue(1);
  const Colors = useThemeColors();

  const textOpacity = useSharedValue(isLoading ? 0 : 1);
  const spinnerOpacity = useSharedValue(isLoading ? 1 : 0);
  const progress = useSharedValue(0);

  // --- variantga qarab rang, border va text rangini aniqlovchi funksiya ---
  const getVariantStyles = (variant: ButtonVariant = "primary") => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: Colors.primary,
          textColor: Colors.primary,
        };
      case "danger":
        return {
          backgroundColor: "red",
          borderWidth: 0,
          borderColor: "transparent",
          textColor: Colors.textPrimary,
        };
      case "dangerOutline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "red",
          textColor: "red",
        };
      case "silver":
        return {
          backgroundColor: Colors.borderColor,
          borderWidth: 0,
          borderColor: "transparent",
          textColor: Colors.textPrimary,
        };
      case "primary":
      default:
        return {
          backgroundColor: Colors.primary,
          borderWidth: 0,
          borderColor: "transparent",
          textColor: Colors.textPrimary,
        };
    }
  };

  const { backgroundColor, borderWidth, borderColor, textColor } =
    getVariantStyles(variant);

  useEffect(() => {
    if (isLoading) {
      textOpacity.value = withSpring(0);
      spinnerOpacity.value = withSpring(1);
    } else {
      textOpacity.value = withSpring(1);
      spinnerOpacity.value = withSpring(0);
    }
  }, [isLoading]);

  const textStyleAnim = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const handlePressIn = () => {
    if (!isLoading) {
      vibration &&
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle[vibrationType]);
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    !isLoading && (scale.value = withSpring(1));
  };

  useEffect(() => {
    progress.value = disabled || isLoading ? withTiming(1) : withTiming(0);
  }, [disabled, isLoading]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [backgroundColor, Colors.pageBackground]
    ),
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    color: interpolateColor(progress.value, [0, 1], ["#fff", "#e9e9e9"]),
  }));

  const spinnerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: spinnerOpacity.value,
  }));

  return (
    <AnimatedPressable
      android_ripple={{
        color: Colors.Boxbackground,
        borderless: false,
        radius: 200, // radiusni sozlasa bo‘ladi
      }}
      style={[
        styles.button,
        buttonAnimatedStyle,
        { backgroundColor: Colors.primary },
        isLoading && { opacity: 0.7 },
        { width: fullWidth ? "100%" : width || "auto" },
        { borderWidth, borderColor },
        { backgroundColor: "red" },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isLoading || disabled}
      {...props}
    >
      <Animated.Text
        style={[
          styles.buttonText,
          { color: Colors.textPrimary },
          textStyleAnim,
          textAnimatedStyle,
          fontStyle,
        ]}
      >
        {text}
      </Animated.Text>

      <Animated.View style={[styles.overlay, spinnerAnimatedStyle]}>
        <CustomSpinner />
      </Animated.View>
    </AnimatedPressable>
  );
};

export default AppButton;

// --- Umumiy uslublar (base styles) ---
const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 22,

    letterSpacing: 0.5,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // butun buttonni qoplaydi
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
