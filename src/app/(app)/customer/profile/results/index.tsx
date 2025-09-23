// src/app/(app)/customer/profile/results/index.tsx
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import AppText from "@/components/Texts/Text";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { LineChart } from "react-native-chart-kit";

const summary = {
  totalOrders: 52,
  completed: 47,
  cancelled: 2,
  inProgress: 3,
  totalSpent: 12450.5,
  avgOrder: 238.3,
  maxOrder: 980,
  avgDeliveryMinutes: 205, // minutes
};

const ordersByDay = [
  { day: "09-16", orders: 4 },
  { day: "09-17", orders: 6 },
  { day: "09-18", orders: 5 },
  { day: "09-19", orders: 9 },
  { day: "09-20", orders: 8 },
  { day: "09-21", orders: 10 },
  { day: "09-22", orders: 10 },
];

const topRoutes = [
  { id: "r1", route: "Toshkent → Samarqand", count: 15 },
  { id: "r2", route: "Toshkent → Andijon", count: 7 },
  { id: "r3", route: "Samarqand → Buxoro", count: 5 },
];

const recentOrders = [
  {
    id: "1",
    title: "Buyurtma #1234",
    desc: "Toshkent → Samarqand, og‘irlik 1.2t",
    date: "2025-09-23 14:30",
  },
  {
    id: "2",
    title: "Buyurtma #1220",
    desc: "Toshkent → Andijon, express",
    date: "2025-09-22 19:10",
  },
  {
    id: "3",
    title: "Buyurtma #1211",
    desc: "Samarqand → Buxoro, standart",
    date: "2025-09-21 08:45",
  },
];

const ResultsPage = () => {
  const Colors = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <PageHeader title="Natijalar" enableBack />
      <ScrollView style={{ padding: 8 }}>
        <AppText style={[styles.header, { color: Colors.textPrimary }]}>
          Natijalaringiz
        </AppText>

        {/* Umumiy statistika */}
        <AppText style={[styles.sectionTitle, { color: Colors.textPrimary }]}>
          Umumiy statistikalar
        </AppText>
        <View style={styles.summaryGrid}>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textPrimary }}>
              Buyurtmalar: {summary.totalOrders}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.green }}>
              Bajarilgan: {summary.completed}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.yellow }}>
              Bekor qilingan: {summary.cancelled}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textSecondary }}>
              Jarayonda: {summary.inProgress}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textPrimary }}>
              Umumiy xarajat: ${summary.totalSpent}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textPrimary }}>
              O‘rtacha buyurtma: ${summary.avgOrder}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textPrimary }}>
              Eng katta buyurtma: ${summary.maxOrder}
            </AppText>
          </View>
          <View
            style={[styles.card, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textPrimary }}>
              O‘rtacha yetkazish: {summary.avgDeliveryMinutes} min
            </AppText>
          </View>
        </View>

        {/* Haftalik buyurtmalar */}
        <AppText style={[styles.sectionTitle, { color: Colors.textPrimary }]}>
          Haftalik buyurtmalar
        </AppText>
        <LineChart
          data={{
            labels: ordersByDay.map((d) => d.day),
            datasets: [{ data: ordersByDay.map((d) => d.orders) }],
          }}
          width={screens.width - 16}
          height={220}
          chartConfig={{
            backgroundColor: Colors.pageBackground,
            backgroundGradientFrom: Colors.Boxbackground,
            backgroundGradientTo: Colors.Boxbackground,
            decimalPlaces: 0,
            color: (opacity = 1) => Colors.primary,
            labelColor: (opacity = 1) => Colors.textSecondary,
          }}
          bezier
          style={styles.chart}
        />

        {/* Eng ko‘p yo‘nalishlar */}
        <AppText style={[styles.sectionTitle, { color: Colors.textPrimary }]}>
          Eng ko‘p yo‘nalishlar
        </AppText>
        {topRoutes.map((r) => (
          <View
            key={r.id}
            style={[styles.listItem, { backgroundColor: Colors.Boxbackground }]}
          >
            <AppText style={{ color: Colors.textPrimary }}>{r.route}</AppText>
            <AppText style={{ fontWeight: "600", color: Colors.textPrimary }}>
              {r.count} marta
            </AppText>
          </View>
        ))}

        {/* So‘nggi buyurtmalar */}
        <AppText style={[styles.sectionTitle, { color: Colors.textPrimary }]}>
          So‘nggi buyurtmalar
        </AppText>
        <FlatList
          data={recentOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[styles.orderItem, { borderColor: Colors.borderColor08 }]}
            >
              <AppText style={{ fontWeight: "600", color: Colors.textPrimary }}>
                {item.title}
              </AppText>
              <AppText style={{ color: Colors.textSecondary }}>
                {item.desc}
              </AppText>
              <AppText style={{ color: Colors.textSecondary, fontSize: 12 }}>
                {item.date}
              </AppText>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ResultsPage;

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  summaryGrid: { flexDirection: "row", flexWrap: "wrap" },
  card: {
    width: "48%",
    padding: 10,
    borderRadius: 8,
    margin: "1%",
  },
  chart: { marginVertical: 8, borderRadius: 12 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  orderItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
});
