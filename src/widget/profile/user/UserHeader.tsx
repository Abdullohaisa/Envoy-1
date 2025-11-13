import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { screens } from "@/shared/token";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";

const UserHeader = ({ editMode, handleSave, setEditMode }: any) => {
  const Colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const theme = useAtomValue(themeAtom);

  const animatedStyleHeader = useAnimatedStyle(() => {
    const top = withTiming(!editMode ? -insets.top - 55 : 0);
    return { top };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: screens.width,
          height: 100,
          zIndex: 100,
        },
        animatedStyleHeader,
      ]}
    >
      <PageHeader
        title={t("edit")}
        enableBack
        onLeftPress={() => setEditMode(false)}
        rightIcon={
          <Feather
            name="check"
            size={24}
            color={
              theme === "light" ? Colors.Boxbackground : Colors.textSecondary
            }
          />
        }
        onRightPress={handleSave}
      />
    </Animated.View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({});
