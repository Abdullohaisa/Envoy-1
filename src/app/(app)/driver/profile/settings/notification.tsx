import React, { useState } from "react";
import { View, Text, Switch, FlatList } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import { useTranslation } from "react-i18next";

const notifications = [
  {
    id: "1",
    title: "Yangi yuk joylandi",
    desc: "Toshkent – Samarqand yo‘nalishida yangi yuk qo‘shildi",
    date: "2025-09-23 14:30",
  },
  {
    id: "2",
    title: "Buyurtma tasdiqlandi",
    desc: "Siz yuborgan buyurtma mijoz tomonidan qabul qilindi",
    date: "2025-09-22 19:10",
  },
  {
    id: "3",
    title: "Xizmat bajarildi",
    desc: "Haydovchi yukni yetkazib berdi",
    date: "2025-09-21 08:45",
  },
];

const NotificationsPage = () => {
  const Colors = useThemeColors();
  const [enabled, setEnabled] = useState(true);
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <PageHeader title={t("notifications")} enableBack />

      {/* Switch qismi */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.borderColor,
        }}
      >
        <AppText style={{ fontSize: 16, color: Colors.textPrimary }}>
          {t("enable_notifications")}
        </AppText>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ false: "#d1d1d6", true: "#34c759" }} // iOS yashil rang
          thumbColor={"#ffffff"}
        />
      </View>

      {/* Ro‘yxat qismi */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: Colors.Boxbackground,
              padding: 12,
              borderRadius: 12,
              marginBottom: 12,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <AppText
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: Colors.textPrimary,
                }}
              >
                {item.title}
              </AppText>
              <AppText style={{ fontSize: 12, color: Colors.textSecondary }}>
                {item.date}
              </AppText>
            </View>
            <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
              {item.desc}
            </AppText>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationsPage;
