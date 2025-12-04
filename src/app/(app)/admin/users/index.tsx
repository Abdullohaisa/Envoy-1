import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";

const AdminUsers = () => {
  const Colors = useThemeColors();

  // Backenddan keladigan sonlar
  const totalUsers = 120;
  const totalCustomers = 80;
  const totalDrivers = 40;

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <Text style={[styles.title, { color: Colors.textPrimary }]}>
        Foydalanuvchilar statistikasi
      </Text>

      <View style={styles.cardsWrapper}>
        {/* JAMI USERLAR */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: Colors.Boxbackground,
              borderColor: Colors.borderColor,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: Colors.textSecondary }]}>
            Jami foydalanuvchilar
          </Text>
          <Text style={[styles.cardValue, { color: Colors.primary }]}>
            {totalUsers}
          </Text>
        </View>

        {/* CUSTOMERS */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: Colors.Boxbackground,
              borderColor: Colors.borderColor,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: Colors.textSecondary }]}>
            Customer
          </Text>
          <Text style={[styles.cardValue, { color: Colors.green }]}>
            {totalCustomers}
          </Text>
        </View>

        {/* DRIVERS */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: Colors.Boxbackground,
              borderColor: Colors.borderColor,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: Colors.textSecondary }]}>
            Driver
          </Text>
          <Text style={[styles.cardValue, { color: Colors.yellow }]}>
            {totalDrivers}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AdminUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  cardsWrapper: {
    gap: 15,
  },

  card: {
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
  },

  cardLabel: {
    fontSize: 15,
    fontWeight: "500",
  },

  cardValue: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 6,
  },
});
