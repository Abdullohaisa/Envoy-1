// import React, { useState } from "react";
// import { View, Switch, FlatList, Pressable } from "react-native";
// import PageHeader from "@/components/Header/PageHeader/PageHeader";
// import { useThemeColors } from "@/theme/useThemeColors";
// import AppText from "@/components/Texts/Text";
// import { useTranslation } from "react-i18next";

// // To'liq Notification modeli asosida ma'lumotlar
// const notifications = [
//   {
//     id: "n1",
//     title: "Yangi xabar",
//     message: "Profil qoidalarimiz yangilandi.",
//     type: "system",
//     is_read: false,
//     created_at: "2025-11-16T12:33:11Z",
//     action_type: "none",
//   },
//   {
//     id: "n2",
//     title: "Buyurtma tasdiqlandi",
//     message: "Buyurtmangiz muvaffaqiyatli qabul qilindi.",
//     type: "order",
//     is_read: false,
//     created_at: "2025-11-16T12:40:58Z",
//     action_type: "navigate",
//     action_payload: {
//       screen: "OrderDetails",
//       params: {
//         order_id: 3129,
//       },
//     },
//   },
//   {
//     id: "n3",
//     title: "Yangi izoh",
//     message: "Bir foydalanuvchi postga komment qoldirdi.",
//     type: "comment",
//     is_read: true,
//     created_at: "2025-11-16T10:15:22Z",
//     action_type: "navigate",
//     action_payload: {
//       screen: "Comments",
//       params: {
//         post_id: "p-8841",
//         comment_id: "c-117",
//       },
//     },
//   },
//   {
//     id: "n4",
//     title: "Yangilangan shartlar",
//     message: "Ilova shartlari yangilandi. Batafsil saytimizda o‘qing.",
//     type: "info",
//     is_read: false,
//     created_at: "2025-11-16T11:00:42Z",
//     action_type: "open_url",
//     action_payload: {
//       url: "https://envoyapp.com/terms",
//     },
//   },
// ];

// const NotificationsPage = () => {
//   const Colors = useThemeColors();
//   const [enabled, setEnabled] = useState(true);
//   const { t } = useTranslation();

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
//       <PageHeader title={t("notifications")} enableBack />

//       {/* Switch bo'limi */}
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           paddingHorizontal: 16,
//           paddingVertical: 20,
//           borderBottomWidth: 0.5,
//           borderBottomColor: Colors.borderColor,
//         }}
//       >
//         <AppText style={{ fontSize: 16, color: Colors.textPrimary }}>
//           {t("enable_notifications")}
//         </AppText>

//         <Switch
//           value={enabled}
//           onValueChange={setEnabled}
//           trackColor={{ false: "#d1d1d6", true: "#34c759" }}
//           thumbColor={"#ffffff"}
//         />
//       </View>

//       {/* Ro'yxat */}
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ padding: 16 }}
//         renderItem={({ item }) => (
//           <Pressable
//             style={{
//               backgroundColor: Colors.Boxbackground,
//               padding: 14,
//               borderRadius: 12,
//               marginBottom: 12,
//               shadowColor: "#000",
//               shadowOpacity: 0.05,
//               shadowRadius: 4,
//               shadowOffset: { width: 0, height: 2 },
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginBottom: 4,
//               }}
//             >
//               <AppText
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "600",
//                   color: Colors.textPrimary,
//                 }}
//               >
//                 {item.title}
//               </AppText>
//               <AppText style={{ fontSize: 12, color: Colors.textSecondary }}>
//                 {new Date(item.created_at).toLocaleString()}
//               </AppText>
//             </View>

//             <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
//               {item.message}
//             </AppText>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// };

// export default NotificationsPage;

import React, { useState } from "react";
import { View, Switch, FlatList, Pressable, Linking } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import { useTranslation } from "react-i18next";

const initialNotifications = [
  {
    id: "n1",
    title: "Yangi xabar",
    message: "Profil qoidalarimiz yangilandi.",
    type: "system",
    is_read: false,
    created_at: "2025-11-16T12:33:11Z",
    action_type: "none",
  },
  {
    id: "n2",
    title: "Buyurtma tasdiqlandi",
    message: "Buyurtmangiz muvaffaqiyatli qabul qilindi.",
    type: "order",
    is_read: false,
    created_at: "2025-11-16T12:40:58Z",
    action_type: "navigate",
    action_payload: {
      screen: "OrderDetails",
      params: {
        order_id: 3129,
      },
    },
  },
  {
    id: "n3",
    title: "Yangi izoh",
    message: "Bir foydalanuvchi postga komment qoldirdi.",
    type: "comment",
    is_read: true,
    created_at: "2025-11-16T10:15:22Z",
    action_type: "navigate",
    action_payload: {
      screen: "Comments",
      params: {
        post_id: "p-8841",
        comment_id: "c-117",
      },
    },
  },
  {
    id: "n4",
    title: "Yangilangan shartlar",
    message: "Ilova shartlari yangilandi. Batafsil saytimizda o‘qing.",
    type: "info",
    is_read: false,
    created_at: "2025-11-16T11:00:42Z",
    action_type: "open_url",
    action_payload: {
      url: "https://envoyapp.com/terms",
    },
  },
];

const NotificationsPage = ({ navigation }) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState(initialNotifications);

  // Bosilganda bajariladigan action
  const handlePress = (item) => {
    // is_read = true ga o‘zgartiramiz
    setData((prev) =>
      prev.map((n) =>
        n.id === item.id
          ? {
              ...n,
              is_read: true,
            }
          : n
      )
    );

    // ACTION TYPE bo‘yicha harakat
    if (item.action_type === "navigate") {
      navigation.navigate(
        item.action_payload.screen,
        item.action_payload.params
      );
    }

    if (item.action_type === "open_url") {
      Linking.openURL(item.action_payload.url);
    }

    // none bo‘lsa hech narsa qilmaydi
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <PageHeader title={t("notifications")} enableBack />

      {/* Switch */}
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
          trackColor={{ false: "#d1d1d6", true: "#34c759" }}
          thumbColor={"#ffffff"}
        />
      </View>

      {/* Notifications List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={{
              backgroundColor: Colors.Boxbackground,
              padding: 14,
              borderRadius: 12,
              marginBottom: 12,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              flexDirection: "row",
              gap: 10,
            }}
          >
            {/* O‘qilmagan belgi (ko'k nuqta) */}
            {!item.is_read && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#007aff",
                  borderRadius: 50,
                  marginTop: 6,
                }}
              />
            )}

            <View style={{ flex: 1 }}>
              {/* Title + Date */}
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
                    fontWeight: item.is_read ? "400" : "700", // O‘qilmagan qalin bo‘ladi
                    color: Colors.textPrimary,
                  }}
                >
                  {item.title}
                </AppText>

                <AppText style={{ fontSize: 12, color: Colors.textSecondary }}>
                  {new Date(item.created_at).toLocaleString()}
                </AppText>
              </View>

              {/* Message */}
              <AppText
                style={{
                  fontSize: 14,
                  color: item.is_read
                    ? Colors.textSecondary
                    : Colors.textPrimary,
                }}
              >
                {item.message}
              </AppText>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default NotificationsPage;
