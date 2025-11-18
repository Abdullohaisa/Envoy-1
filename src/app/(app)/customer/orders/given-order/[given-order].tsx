import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useState, useCallback, memo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import SheetModal from "@/components/Modal/SheetModal";
import { useFetchSingleOrder } from "@/service/order/fetch-single-order/controller";
import { useFetchCustomerOrders } from "@/service/customer/customer-orders/controller";
import api from "@/axios/axios.config";
import OrderLoading from "@/components/OrderLoading/OrderLoading";
import CustomerGivenOrderInfoList from "@/components/OrderInfoList/CustomerGivenOrderInfoList";

/* ===============================
   🔹 Asosiy sahifa komponenti
=============================== */
const GivenOrder = () => {
  const Colors = useThemeColors();
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderId = params.order_id as string;

  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchOrders = useFetchCustomerOrders();
  const { order, requestedDrivers, isLoading, error, refetch } =
    useFetchSingleOrder(orderId);

  /* 🔁 Yangilash */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  /* ❌ Buyurtmani o‘chirish */
  const deleteOrder = useCallback(async () => {
    try {
      setDeleteLoading(true);
      setDeleteError(null);
      await api.delete(`/order/delete-order/${orderId}/`);
      fetchOrders();
      router.back();
    } catch (err: any) {
      setDeleteError(err.response?.data || "Buyurtma o‘chirishda xatolik");
    } finally {
      setDeleteLoading(false);
    }
  }, [orderId, fetchOrders, router]);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <HeaderSection Colors={Colors} onDelete={() => setOpen(true)} />

      {isLoading && !refreshing && <OrderLoading Colors={Colors} />}

      {error && (
        <ErrorView
          error={error}
          Colors={Colors}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      {!isLoading && !error && order && (
        <OrderContent
          order={order}
          requestedDrivers={requestedDrivers}
          deleteError={deleteError}
          refreshing={refreshing}
          onRefresh={onRefresh}
          Colors={Colors}
        />
      )}

      <SheetModal
        open={open}
        onDismiss={() => setOpen(false)}
        message={
          deleteLoading ? "O‘chirilmoqda..." : "Buyurtmani o‘chirmoqchimisiz?"
        }
        type="yesno"
        onYes={deleteOrder}
      />
    </View>
  );
};

/* ===============================
   🔹 Header bo‘limi
=============================== */
const HeaderSection = memo(({ Colors, onDelete }: any) => (
  <PageHeader title="Yuk ma'lumotlari" enableBack />
));

/* ===============================
   🔹 Xatolik holati
=============================== */
const ErrorView = memo(({ error, Colors, refreshing, onRefresh }: any) => (
  <ScrollView
    contentContainerStyle={styles.centerBox}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={Colors.primary}
        colors={["#fff"]}
        progressBackgroundColor={Colors.primary}
      />
    }
  >
    <AppText style={{ color: "red", textAlign: "center", fontSize: 16 }}>
      {error === "Network Error"
        ? "Tarmoq bilan bog‘lanishda muammo yuz berdi."
        : error}
    </AppText>
    <AppText
      style={{
        color: Colors.textSecondary,
        textAlign: "center",
        marginTop: 6,
      }}
    >
      Iltimos, birozdan so‘ng qayta urinib ko‘ring.
    </AppText>
  </ScrollView>
));

/* ===============================
   🔹 Asosiy ma’lumotlar qismi
=============================== */
const OrderContent = memo(
  ({
    order,
    requestedDrivers,
    deleteError,
    refreshing,
    onRefresh,
    Colors,
  }: any) => (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
          colors={["#fff"]}
          progressBackgroundColor={Colors.primary}
        />
      }
    >
      {deleteError && (
        <View style={{ padding: 20 }}>
          <AppText style={{ color: "red", textAlign: "center" }}>
            {deleteError}
          </AppText>
        </View>
      )}
      <CustomerGivenOrderInfoList order={order} />
    </ScrollView>
  )
);

export default GivenOrder;

/* ===============================
   🔹 Styles
=============================== */
const styles = StyleSheet.create({
  container: { flex: 1 },
  centerBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
