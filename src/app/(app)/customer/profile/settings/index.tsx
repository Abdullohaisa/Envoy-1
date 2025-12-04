import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  ReactNode,
  JSX,
} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  ListRenderItem,
} from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { themeAtom, setThemeAtom } from "@/theme/theme";
import { AppRoutes } from "@/constants/routes";
import { router } from "expo-router";
import AppText from "@/components/Texts/Text";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { safeNavigate } from "@/utils/safe-navigation";
import SheetModal from "@/components/Modal/SheetModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { Shadow, Spacing } from "@/shared/token";
import { IThemeColors } from "@/theme/colors.interface";
import { useTranslation } from "react-i18next";
import {
  authStateAtom,
  logoutAtom,
} from "@/service/user/register-login/controller";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";

// -------------------------
// 🔹 SettingsCustomerPage (FlatList optimized)
// -------------------------
const SettingsCustomerPage = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const setTheme = useSetAtom(setThemeAtom);
  const { data } = useAtomValue(authStateAtom);
  const role = data.role;
  const handleLogout = useSetAtom(logoutAtom);
  const { t } = useTranslation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [actionType, setActionType] = useState<"logout" | "delete_acc" | null>(
    null
  );

  // 🔹 Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // 🔹 Navigate helper
  const handleNavigate = useCallback((path: string) => {
    safeNavigate(() => router.push(path));
  }, []);

  // 🔹 Settings actions
  const settingsActions = useMemo(
    () => [
      {
        id: "theme",
        title: t("theme_mode"),
        icon: (size: number, color: string) => (
          <Ionicons name="invert-mode" size={size} color={color} />
        ),
        leftNode: () => (
          <ThemeSwitch isDark={theme === "dark"} onToggle={toggleTheme} />
        ),
        onPress: toggleTheme,
      },
      {
        id: "language",
        title: t("change_language"),
        leftNode: () => null,
        icon: (size: number, color: string) => (
          <MaterialIcons name="language" size={size} color={color} />
        ),
        onPress: () =>
          handleNavigate(
            role === "Customer"
              ? AppRoutes.customer.profile.settings.language
              : AppRoutes.driver.profile.settings.language
          ),
      },
      {
        id: "logout",
        title: t("logout"),
        leftNode: () => <></>,
        icon: (size: number, color: string) => (
          <AntDesign name="logout" size={size} color={color} />
        ),
        onPress: () => {
          setActionType("logout");
          setAlertVisible(true);
        },
      },
      {
        id: "delete",
        title: t("delete_account"),
        leftNode: () => <></>,
        icon: (size: number, color: string) => (
          <MaterialIcons name="delete" size={size} color={color} />
        ),
        onPress: () => {
          setActionType("delete_acc");
          setAlertVisible(true);
        },
      },
    ],
    [t, toggleTheme, handleNavigate, role]
  );

  const handleModalConfirm = useCallback(() => {
    if (actionType === "logout") handleLogout();
    else if (actionType === "delete_acc") () => {};

    setAlertVisible(false);
    setActionType(null);
  }, [actionType, handleLogout]);

  const cachedStyles = useMemo(() => styles(Colors), [Colors]);

  // 🔹 FlatList renderItem
  const renderItem: ListRenderItem<(typeof settingsActions)[0]> = useCallback(
    ({ item }) => (
      <ProfileActionBox
        icon={item.icon}
        title={item.title}
        onPress={item.onPress}
        leftNode={item.leftNode}
      />
    ),
    []
  );

  return (
    <View
      style={[
        cachedStyles.container,
        { backgroundColor: Colors.pageBackground },
      ]}
    >
      <PageHeader title={t("settings")} enableBack />

      <FlatList
        style={{
          marginTop: 5,
          paddingTop: Spacing.horizontal - 5,
          borderRadius: 5,
          overflow: "hidden",
          marginHorizontal: Spacing.horizontal,
        }}
        data={settingsActions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 30,
          gap: 10,
        }}
      />

      <SheetModal
        type="yesno"
        open={alertVisible}
        onDismiss={() => setAlertVisible(false)}
        onYes={handleModalConfirm}
        message={
          actionType === "logout"
            ? t("confirm_logout")
            : t("confirm_delete_account")
        }
      />
    </View>
  );
};

export default SettingsCustomerPage;

// -------------------------
// 🔹 ProfileActionBox (memoized)
// -------------------------
type ProfileActionBoxProps = {
  icon: (size: number, color: string) => React.ReactElement;
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  leftNode: () => ReactNode | JSX.Element;
};

const ProfileActionBox = memo(
  ({ icon, title, onPress, style, leftNode }: ProfileActionBoxProps) => {
    const Colors = useThemeColors();
    const cachedStyles = useMemo(() => styles(Colors), [Colors]);
    const { t } = useTranslation();

    const { iconColor, iconBackColor } = useMemo(() => {
      switch (title) {
        case t("theme_mode"):
          return { iconColor: Colors.yellow, iconBackColor: Colors.primary02 };
        case t("change_language"):
          return { iconColor: Colors.green, iconBackColor: Colors.green02 };
        case t("logout"):
        case t("delete_account"):
          return { iconColor: Colors.red, iconBackColor: Colors.red02 };
        default:
          return {
            iconColor: Colors.textPrimary,
            iconBackColor: Colors.Boxbackground,
          };
      }
    }, [title, Colors, t]);

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[cachedStyles.smallBox, style]}
        activeOpacity={0.8}
      >
        <View style={cachedStyles.iconRow}>
          <View
            style={[cachedStyles.iconBox, { backgroundColor: iconBackColor }]}
          >
            {icon(18, iconColor)}
          </View>
          <AppText style={[cachedStyles.boxText]}>{title}</AppText>
        </View>
        {leftNode()}
      </TouchableOpacity>
    );
  }
);

// -------------------------
// 🔹 Styles
// -------------------------
const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    container: { flex: 1 },
    smallBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 15,
      padding: 10,
      backgroundColor: Colors.Boxbackground,
      minHeight: 50,
    },
    iconRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    iconBox: {
      borderRadius: 10,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    boxText: { fontSize: 15, fontWeight: "600", color: Colors.textPrimary },
  });
