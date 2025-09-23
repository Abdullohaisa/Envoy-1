import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Radius, Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";

const Profile = () => {
  const Colors = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <PageHeader title="Profil" />

      <View style={{ padding: 5 }}>
        <ScrollView
          style={{
            height: "100%",
            borderRadius: Radius.primary,
            overflow: "hidden",
          }}
          contentContainerStyle={[
            styles.container,
            { backgroundColor: Colors.pageBackground },
          ]}
          showsVerticalScrollIndicator={false} // scroll bar ni yashirish
        >
          {/* Birinchi box */}
          <Pressable
            onPress={() => router.push(AppRoutes.customer.profile.user)}
            style={[
              styles.profileBox,
              { backgroundColor: Colors.Boxbackground },
            ]}
          >
            <MaterialIcons
              name="account-circle"
              size={80}
              color={Colors.textSecondary}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: Colors.textPrimary }]}>
                Abdullah To'laganov
              </Text>
              <Text style={[styles.phone, { color: Colors.textSecondary }]}>
                +998 90 123 45 67
              </Text>
            </View>
          </Pressable>

          {/* Ikkinchi qator */}
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                router.push(AppRoutes.customer.profile.results.index)
              }
              style={[
                styles.smallBox,
                { backgroundColor: Colors.Boxbackground },
              ]}
            >
              <MaterialIcons
                name="insert-chart" // bar-chart o'rniga
                size={24}
                color={Colors.textPrimary}
              />
              <Text style={[styles.boxText, { color: Colors.textPrimary }]}>
                Ko'rsatgichlaringiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                router.push(AppRoutes.customer.profile.settings.index)
              }
              style={[
                styles.smallBox,
                { backgroundColor: Colors.Boxbackground },
              ]}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={Colors.textPrimary}
              />
              <Text style={[styles.boxText, { color: Colors.textPrimary }]}>
                Sozlamalar
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.helpBox, { backgroundColor: Colors.Boxbackground }]}
          >
            <MaterialIcons
              name="support-agent"
              size={24}
              color={Colors.textPrimary}
            />
            <Text style={[styles.boxText, { color: Colors.textPrimary }]}>
              Operator bilan bog'lanish
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1, // scrollable bo'lishi uchun
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: Radius.primary,
    height: 120,
    gap: 5,
  },
  profileInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  phone: {
    fontSize: 16,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  smallBox: {
    flex: 1,
    height: 80,
    borderRadius: Radius.primary,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  helpBox: {
    borderRadius: Radius.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
