import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import CustomerActiveOrderInfoList from "@/components/OrderInfoList/CustomerActiveOrderInfoList";
import SheetModal from "@/components/Modal/SheetModal";
import { useState, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppText from "@/components/Texts/Text";
import { useFetchSingleOrder } from "@/service/order/fetch-single-order/controller";
import api from "@/axios/axios.config";
import { useFetchCustomerOrders } from "@/service/customer/customer-orders/controller";

const ActiveOrder = () => {
  const Colors = useThemeColors();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchOrders = useFetchCustomerOrders();
  const params = useLocalSearchParams();
  const orderId = params.order_id as string;

  const { order, requestedDrivers, isLoading, error, refetch } =
    useFetchSingleOrder(orderId);

  // 🔁 Sahifani yangilash (har doim ishlaydi)
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const deleteOrder = async () => {
    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await api.delete(`/order/delete-order/${orderId}/`);
      setDeleteLoading(false);
      fetchOrders();
      router.back();
    } catch (err: any) {
      setDeleteError(err.response?.data || "Buyurtma o'chirishda xatolik");
      setDeleteLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader
        title="Yuk ma'lumotlari"
        enableBack
        rightIcon={
          <MaterialIcons
            name="delete-outline"
            size={24}
            color={Colors.textSecondary}
          />
        }
        onRightPress={() => setOpen(true)}
      />

      {/* 🔹 Loading holati */}
      {isLoading && !refreshing && (
        <View style={styles.centerBox}>
          <AppText style={{ color: Colors.textSecondary, textAlign: "center" }}>
            Ma'lumotlar yuklanmoqda...
          </AppText>
        </View>
      )}

      {/* 🔹 Xatolik holati */}
      {error && (
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
            Biz bu muammoni tez orada hal qilamiz. Iltimos, birozdan so‘ng qayta
            urinib ko‘ring.
          </AppText>
        </ScrollView>
      )}

      {/* 🔹 Asosiy ma'lumot */}
      {!isLoading && !error && order && (
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
          <CustomerActiveOrderInfoList
            order={order}
            requestedDrivers={requestedDrivers}
          />
        </ScrollView>
      )}

      {/* 🔹 O‘chirish tasdiqlovchi modal */}
      <SheetModal
        open={open}
        onDismiss={() => setOpen(false)}
        message={
          deleteLoading ? "O'chirilmoqda..." : "Buyurtmani o'chirmoqchimisiz"
        }
        type="yesno"
        onYes={() => deleteOrder()}
      />
    </View>
  );
};

export default ActiveOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
