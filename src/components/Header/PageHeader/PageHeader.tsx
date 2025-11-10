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
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { Radius } from "@/shared/token";
import { safeNavigate } from "@/utils/safe-navigation";
import AppText from "@/components/Texts/Text";

type PageHeaderProps = {
  title: string;
  hide?: boolean;
  animated?: boolean;
  enableBack?: boolean;
  rightIcon?: React.ReactNode; // 🔹 qo'shildi
  onRightPress?: () => void; // 🔹 qo'shildi
  rightDisabled?: boolean; // 🔹 qo'shildi
  routePath?: string;
};

const PageHeader = ({
  title,
  hide,
  animated = false,
  enableBack,
  rightIcon,
  onRightPress,
  rightDisabled = false,
  routePath,
}: PageHeaderProps) => {
  const Colors = useThemeColors();
  const insetsTop = useSafeAreaInsets().top;
  const theme = useAtomValue(themeAtom);

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
          backgroundColor:
            theme === "light" ? Colors.primary08 : Colors.Boxbackground,
          borderColor: Colors.borderColor,
          borderBottomLeftRadius:
            Platform.OS === "ios" ? Radius.primary : Radius.primary,
          borderBottomRightRadius:
            Platform.OS === "ios" ? Radius.primary : Radius.primary,
        },
        animated && headerStyle,
      ]}
    >
      <View style={styles.header}>
        {enableBack && (
          <Pressable
            style={styles.backButton}
            onPress={() =>
              safeNavigate(() =>
                routePath ? router.push(routePath) : router.back()
              )
            }
          >
            <ArrowIcon
              color={
                theme === "light" ? Colors.Boxbackground : Colors.textSecondary
              }
            />
          </Pressable>
        )}

        <AppText
          variant="semiBold"
          style={[
            styles.title,
            {
              color:
                theme === "light" ? Colors.Boxbackground : Colors.textPrimary,
            },
          ]}
        >
          {title}
        </AppText>

        {rightIcon && (
          <Pressable
            style={styles.rightButton}
            onPress={onRightPress}
            disabled={rightDisabled}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    elevation: 3,
    borderBottomWidth: Platform.OS === "ios" ? 0 : 0,
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
    alignItems: "flex-start",
    height: 55,
    width: 70,
    paddingHorizontal: 10,
    paddingLeft: 15,
  },
  rightButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    height: 55,
    width: 70,
    paddingHorizontal: 15,
  },
});
