import React, { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  RefreshControl,
  ViewStyle,
} from "react-native";
import { router } from "expo-router";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Shadow, Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { AppRoutes } from "@/constants/routes";
import { safeNavigate } from "@/utils/safe-navigation";
import AppText from "@/components/Texts/Text";
import { callPhone } from "@/utils/call-phone";
import { useAtomValue } from "jotai";
import { IThemeColors } from "@/theme/colors.interface";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ArrowIcon from "@/assets/icon/arrow";
import { useTranslation } from "react-i18next";
import { authStateAtom } from "@/service/user/register-login/controller";
import {
  useFetchUserData,
  userDataAtom,
  userDataStateAtom,
} from "@/service/user/get-user-info/controller";
import AppImage from "@/components/Image/Image";

const Profile = () => {
  const Colors = useThemeColors();
  const { t } = useTranslation();

  const cachedStyles = useMemo(() => styles(Colors), [Colors]);

  const userData = useAtomValue(userDataAtom);
  const fetchUserData = useFetchUserData();
  const [refreshing, setRefreshing] = useState(false);

  const handleNavigate = useCallback(
    (path: string) => safeNavigate(() => router.push(path)),
    []
  );

  const profileActions = useMemo(
    () => [
      {
        icon: (size: number, color: string) => (
          <Ionicons name="settings-sharp" size={size} color={color} />
        ),
        title: t("settings"), // 🧩 Sozlamalar
        handlePress: () =>
          safeNavigate(() =>
            router.push(AppRoutes.customer.profile.settings.index)
          ),
      },
      {
        icon: (size: number, color: string) => (
          <FontAwesome6 name="chart-simple" size={size} color={color} />
        ),
        title: t("statistics"), // 🧩 Ko‘rsatgichlaringiz
        handlePress: () =>
          safeNavigate(() =>
            router.push(AppRoutes.customer.profile.results.index)
          ),
      },
      {
        icon: (size: number, color: string) => (
          <Ionicons name="notifications" size={size} color={color} />
        ),
        title: t("notifications"), // 🧩 Bildirishnomalar
        handlePress: () =>
          safeNavigate(() =>
            router.push(AppRoutes.customer.profile.settings.notification)
          ),
      },
      {
        icon: (size: number, color: string) => (
          <FontAwesome6 name="phone" size={size} color={color} />
        ),
        title: t("contact_operator"), // 🧩 Operator bilan bog‘lanish
        handlePress: () => callPhone("+998903923625"),
      },
    ],
    [t]
  );

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchUserData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchUserData]);

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title={t("profile")} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#fff"]}
            progressBackgroundColor={Colors.primary}
            tintColor={Colors.primary}
          />
        }
        style={{
          marginTop: 5,
          paddingTop: Spacing.horizontal - 5,
          overflow: "hidden",
          marginHorizontal: Spacing.horizontal,
          flexGrow: 1,
          borderRadius: 5,
        }}
        contentContainerStyle={[cachedStyles.container]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => handleNavigate(AppRoutes.customer.profile.user.index)}
          style={[cachedStyles.profileBox]}
        >
          <View
            style={[
              {
                width: 80,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 40,
                backgroundColor: Colors.borderColor,
                overflow: "hidden",
              },
              Shadow.dark,
            ]}
          >
            {userData.image ? (
              <AppImage
                source={userData.image}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <AppText style={{ fontSize: 40 }}>
                {userData.username?.slice(0, 1)}
              </AppText>
            )}
          </View>
          <View style={cachedStyles.profileInfo}>
            <AppText style={cachedStyles.name}>{userData.username}</AppText>
            <AppText style={cachedStyles.phone}>{userData.phone}</AppText>
          </View>
        </Pressable>

        <View
          style={{
            height: 1,
            backgroundColor: Colors.Boxbackground,
            marginHorizontal: Spacing.horizontal,
          }}
        />

        <View style={cachedStyles.row}>
          {profileActions.map((item, index) => (
            <ProfileActionBox
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={item.handlePress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const ProfileActionBox = React.memo(
  ({
    icon,
    title,
    onPress,
    style,
  }: {
    icon: any;
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
  }) => {
    const Colors = useThemeColors();
    const cachedStyles = useMemo(() => styles(Colors), [Colors]);
    const { t } = useTranslation();

    const iconColor = useMemo(() => {
      switch (title) {
        case t("statistics"):
          return Colors.primary; // ko‘k
        case t("settings"):
          return Colors.textPrimary; // matn rangi
        case t("contact_operator"):
          return Colors.green; // yashil
        case t("notifications"):
          return Colors.textPrimary;
        default:
          return Colors.textPrimary;
      }
    }, [title, Colors, t]);

    // 🎨 Icon orqa fon rangi — tarjimadan keladigan qiymat orqali
    const iconBackColor = useMemo(() => {
      switch (title) {
        case t("statistics"):
          return Colors.primary02; // och ko‘k
        case t("settings"):
          return Colors.red04; // och qizil
        case t("contact_operator"):
          return Colors.green02; // och yashil
        case t("notifications"):
          return Colors.textSecondary04; // kulrang fon
        default:
          return Colors.Boxbackground;
      }
    }, [title, Colors, t]);

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[cachedStyles.smallBox, style]}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={[
              {
                backgroundColor: iconBackColor,
                borderRadius: 10,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              },
              Shadow.dark,
            ]}
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

export default Profile;

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 10,
    },
    profileBox: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      borderRadius: 20,
      gap: 10,
      backgroundColor: Colors.Boxbackground,
    },
    profileInfo: {
      marginLeft: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: "600",
      color: Colors.textPrimary,
    },
    phone: {
      fontSize: 16,
      marginTop: 5,
      color: Colors.textSecondary,
    },
    row: {
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 10,
    },
    smallBox: {
      flex: 1,
      borderRadius: 15,
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      padding: 10,
      backgroundColor: Colors.Boxbackground,
      flexDirection: "row",
      minHeight: 50,
    },
    boxText: {
      fontSize: 15,
      fontWeight: "600",
      textAlign: "center",
      color: Colors.textPrimary,
    },
    content: {
      padding: 20,
    },
    text: {
      fontSize: 18,
      marginVertical: 8,
      color: Colors.textPrimary,
    },
    errorText: {
      textAlign: "center",
      color: "red",
      fontSize: 16,
    },
  });
