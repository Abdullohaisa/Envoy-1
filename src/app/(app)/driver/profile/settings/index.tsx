import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";
import { memo, useMemo, useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { setThemeAtom, themeAtom } from "@/theme/theme";
import { AppRoutes } from "@/constants/routes";
import { router } from "expo-router";
import AppText from "@/components/Texts/Text";
import { safeNavigate } from "@/utils/safe-navigation";
import { authStateAtom, logoutAtom } from "@/service/auth/controller";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Shadow } from "@/shared/token";
import ArrowIcon from "@/assets/icon/arrow";
import { IThemeColors } from "@/theme/colors.interface";
import { useTranslation } from "react-i18next";
import SheetModal from "@/components/Modal/SheetModal";

const SettingsCustomerPage = () => {
  const Colors = useThemeColors();
  const [theme] = useAtom(themeAtom);
  const setTheme = useSetAtom(setThemeAtom);
  const { data } = useAtomValue(authStateAtom);
  const role = data.role;
  const { t } = useTranslation();
  const handleLogout = useSetAtom(logoutAtom);
  const [alertVisible, setAlertVisible] = useState(false);
  const [actionType, setActionType] = useState<"logout" | "delete_acc" | null>(
    null
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const settingsActions = [
    {
      id: 1,
      title: t("theme_mode"),
      icon: (size: number, color: string) => (
        <Ionicons name="invert-mode" size={size} color={color} />
      ),
      onPress: toggleTheme,
    },
    {
      id: 2,
      title: t("change_language"),
      icon: (size: number, color: string) => (
        <MaterialIcons name="language" size={size} color={color} />
      ),
      onPress: () =>
        safeNavigate(() =>
          role === "Customer"
            ? router.push(AppRoutes.customer.profile.settings.language)
            : router.push(AppRoutes.driver.profile.settings.language)
        ),
    },
    {
      id: 3,
      title: t("logout"),
      icon: (size: number, color: string) => (
        <AntDesign name="logout" size={size} color={color} />
      ),
      onPress: () => {
        setActionType("logout");
        setAlertVisible(true);
      },
    },
    {
      id: 4,
      title: t("delete_account"),
      icon: (size: number, color: string) => (
        <MaterialIcons name="delete" size={size} color={color} />
      ),
      onPress: () => {
        setActionType("delete_acc");
        setAlertVisible(true);
      },
    },
  ];

  const cachedStyles = useMemo(() => styles(Colors), [Colors]);

  const handleModalConfirm = () => {
    if (actionType === "logout") {
      handleLogout();
    } else if (actionType === "delete_acc") {
      console.log("delete_acc");
    }
    setAlertVisible(false);
    setActionType(null);
  };

  return (
    <View
      style={[
        cachedStyles.container,
        { backgroundColor: Colors.pageBackground },
      ]}
    >
      <PageHeader title="Sozlamalar" enableBack />

      <ScrollView
        style={cachedStyles.scroll}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={{ gap: 10 }}>
          {settingsActions.map((item) => (
            <ProfileActionBox
              key={item.id}
              icon={item.icon}
              title={item.title}
              onPress={item.onPress}
            />
          ))}
        </View>
      </ScrollView>
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
// 🔹 ProfileActionBox
// -------------------------

type ProfileActionBoxProps = {
  icon: (size: number, color: string) => React.ReactElement;
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const ProfileActionBox = memo(
  ({ icon, title, onPress, style }: ProfileActionBoxProps) => {
    const Colors = useThemeColors();
    const cachedStyles = useMemo(() => styles(Colors), [Colors]);

    // 🔸 Icon va fon ranglarini boshqaruvchi funksiya
    const { iconColor, iconBackColor, shadow } = getIconColors(title, Colors);

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
          <AppText style={cachedStyles.boxText}>{title}</AppText>
        </View>

        <ArrowIcon
          color={Colors.textSecondary}
          direction="right"
          type="chevron"
        />
      </TouchableOpacity>
    );
  }
);

// -------------------------
// 🎨 Ranglar funksiyasi
// -------------------------

const getIconColors = (title: string, Colors: IThemeColors) => {
  const { t } = useTranslation();
  switch (title) {
    case t("theme_mode"):
      return {
        iconColor: Colors.primary,
        iconBackColor: Colors.primary02,
        shadow: Shadow.medium,
      };
    case t("change_language"):
      return {
        iconColor: Colors.green,
        iconBackColor: Colors.green02,
        shadow: Shadow.medium,
      };
    case t("logout"):
      return {
        iconColor: Colors.red,
        iconBackColor: Colors.red02,
        shadow: Shadow.light,
      };
    case t("delete_account"):
      return {
        iconColor: Colors.red,
        iconBackColor: Colors.red02,
        shadow: Shadow.light,
      };
    default:
      return {
        iconColor: Colors.textPrimary,
        iconBackColor: Colors.Boxbackground,
        shadow: Shadow.light,
      };
  }
};

// -------------------------
// 🧱 StyleSheet
// -------------------------

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    container: { flex: 1 },
    scroll: {
      marginTop: 15,
      borderRadius: 15,
      overflow: "hidden",
      marginHorizontal: 12,
    },
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
    boxText: {
      fontSize: 15,
      fontWeight: "600",
      color: Colors.textPrimary,
    },
  });
