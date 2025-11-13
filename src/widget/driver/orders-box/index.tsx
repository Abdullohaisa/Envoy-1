import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Spacing, screens } from "@/shared/token";
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const DriverOrdersButtonBox = ({ scrollX }: { scrollX: any }) => {
  const Colors = useThemeColors();

  // Tugma qutisi animatsiyasi
  const animatedButtonBox = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [0, screens.width * 0.5],
      [1, 0],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollX.value,
      [0, screens.width * 0.5],
      [0, 60],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: screens.height * 0.15,
          right: Spacing.horizontal,
          backgroundColor: Colors.pageBackground,
          padding: 5,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,

          // Yumshoq soyali effekt
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 8,
        },
        animatedButtonBox,
      ]}
    >
      {/* 🗺 Xarita tugmasi */}
      <Pressable
        onPress={() =>
          safeNavigate(() => router.push(AppRoutes.driver.orders.map))
        }
        style={{
          padding: 5,
          borderRadius: 100,
          backgroundColor: Colors.borderColor,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <FontAwesome name="map" size={20} color={Colors.primary} />
      </Pressable>

      {/* 🎨 Filter tugmasi */}
      <Pressable
        onPress={() =>
          safeNavigate(() => router.push(AppRoutes.driver.orders.search))
        }
        style={{
          padding: 5,
          borderRadius: 100,
          backgroundColor: Colors.borderColor,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Ionicons name="color-filter" size={23} color={Colors.primary} />
      </Pressable>
    </Animated.View>
  );
};

export default DriverOrdersButtonBox;

const styles = StyleSheet.create({});
