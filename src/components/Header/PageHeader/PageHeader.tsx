import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowIcon from "@/assets/icon/arrow";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PageHeaderProps = {
  title: string;
  hide?: boolean;
  animated?: boolean; // 🔹 default false
  enableBack?: boolean;
};

const PageHeader = ({
  title,
  hide,
  animated = false,
  enableBack,
}: PageHeaderProps) => {
  const Colors = useThemeColors();
  const insetsTop = useSafeAreaInsets().top;

  const translateY = useSharedValue(0);
  const paddingTop = useSharedValue(0);

  const duration = 300;

  useEffect(() => {
    if (hide) {
      translateY.value = withTiming(-(insetsTop + 55), { duration });
      paddingTop.value = withTiming(-55, { duration });
    } else {
      translateY.value = withTiming(0, { duration });
      paddingTop.value = withTiming(0, { duration });
    }
  }, [hide]);

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    marginBottom: paddingTop.value,
  }));

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      translateY.value = withTiming(-(insetsTop + 55), { duration });
      paddingTop.value = withTiming(-55, { duration });
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      translateY.value = withTiming(0, { duration });
      paddingTop.value = withTiming(0, { duration });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [insetsTop, hide]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: 55 + insetsTop,
          backgroundColor: Colors.Boxbackground,
          borderColor: Colors.borderColor,
        },
        animated && headerStyle,
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors.textPrimary }]}>
          {title}
        </Text>
        {enableBack && (
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowIcon color={Colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    zIndex: 10,
    paddingTop: 0,
    elevation: 3,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    justifyContent: "flex-end",
  },
  header: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
  backButton: {
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 70, // kattaroq qilish
    paddingHorizontal: 10,
  },
});
