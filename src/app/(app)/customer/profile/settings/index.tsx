import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { useAtom, useSetAtom } from "jotai";
import { setThemeAtom, themeAtom } from "@/theme/theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { AppRoutes } from "@/constants/routes";
import { router } from "expo-router";

const SettingsCustomerPage = () => {
  const Colors = useThemeColors();
  const [isNotification, setIsNotification] = useState(true);
  const [theme] = useAtom(themeAtom);
  const setTheme = useSetAtom(setThemeAtom);

  // animatsiya qiymati
  const progress = useSharedValue(theme === "dark" ? 1 : 0);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    progress.value = withTiming(nextTheme === "dark" ? 1 : 0, {
      duration: 400,
    });
  };

  const lightStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1 - progress.value),
    transform: [{ scale: withTiming(1 - progress.value * 0.3) }],
  }));

  const darkStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value),
    transform: [{ scale: withTiming(0.7 + progress.value * 0.3) }],
  }));

  const settings = [
    {
      id: 1,
      title: "Rejim",
      icon: "dark-mode",
      type: "theme",
      onPress: toggleTheme,
    },
    {
      id: 2,
      title: "Tilni o‘zgartirish",
      icon: "language",
      type: "navigate",
      onPress: () => router.push(AppRoutes.customer.profile.settings.language),
    },
    {
      id: 3,
      title: "Bildirishnomalar",
      icon: "notifications",
      type: "toggle",
      value: isNotification,
      onPress: () =>
        router.push(AppRoutes.customer.profile.settings.notification),
    },
  ];

  const dangerSettings = [
    {
      id: 4,
      title: "Hisobdan chiqish",
      icon: "logout",
      type: "action",
      onPress: () => console.log("Hisobdan chiqish bosildi"),
    },
    {
      id: 5,
      title: "Akkauntni o‘chirish",
      icon: "delete",
      type: "action",
      onPress: () => console.log("Akkauntni o‘chirish bosildi"),
    },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader title="Sozlamalar" enableBack />

      <ScrollView style={{ paddingTop: 5 }}>
        <View style={{ gap: 5, marginTop: 10 }}>
          {settings.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.item,
                {
                  // borderColor: Colors.borderColor,
                  backgroundColor: pressed
                    ? Colors.Boxbackground06
                    : Colors.Boxbackground,
                },
              ]}
            >
              <View style={styles.itemContent}>
                {item.type === "theme" ? (
                  <View style={styles.iconWrapper}>
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFill,
                        lightStyle,
                        styles.iconCenter,
                      ]}
                    >
                      <MaterialIcons
                        name="light-mode"
                        size={24}
                        color={Colors.textPrimary}
                      />
                    </Animated.View>
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFill,
                        darkStyle,
                        styles.iconCenter,
                      ]}
                    >
                      <MaterialIcons
                        name="dark-mode"
                        size={24}
                        color={Colors.textPrimary}
                      />
                    </Animated.View>
                  </View>
                ) : (
                  <MaterialIcons
                    name={item.icon as any}
                    size={24}
                    color={Colors.textPrimary}
                    style={styles.icon}
                  />
                )}
                <Text style={[styles.itemText, { color: Colors.textPrimary }]}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          ))}
          s
        </View>

        <View style={styles.dangerSection}>
          {dangerSettings.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.item,
                {
                  // borderColor: Colors.borderColor,
                  backgroundColor: pressed
                    ? Colors.Boxbackground06
                    : Colors.Boxbackground,
                },
              ]}
            >
              <View style={styles.itemContent}>
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color="red"
                  style={styles.icon}
                />
                <Text style={[styles.itemText, { color: "red" }]}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsCustomerPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  itemContent: { flexDirection: "row", alignItems: "center", gap: 5 },
  iconWrapper: { width: 30, height: 30, marginRight: 12 },
  iconCenter: { justifyContent: "center", alignItems: "center" },
  icon: { marginRight: 12 },
  itemText: { fontSize: 16 },
  dangerSection: { marginTop: 30, gap: 5 },
});
