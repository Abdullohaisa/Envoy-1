import { Pressable, StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import DriverActiveOrderInfoList from "@/components/OrderInfoList/DriverActiveOrderInfoList";
import AppText from "@/components/Texts/Text";
import { ORDERS, screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import { useCallback, useEffect, useState } from "react";
import SheetModal from "@/components/Modal/SheetModal";
import api from "@/axios/axios.config";
import { useLocalSearchParams } from "expo-router";
import { useFetchSingleOrder } from "@/service/order/fetch-single-order/controller";
import OrderLoading from "@/components/OrderLoading/OrderLoading";
import { useAtomValue } from "jotai";
import { authAtom } from "@/service/user/register-login/controller";

const requestURL = "/driver/request-order/";

const DriverActiveOrder = () => {
  const Colors = useThemeColors();
  const [requestVisible, setRequestVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resVisible, setResVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRequested, setIsRequested] = useState(null);
  const params = useLocalSearchParams();
  const orderId = params.order_id as string;
  const [refreshing, setRefreshing] = useState(false);
  const {
    order,
    requestedDrivers,
    isLoading: loading,
    error,
    refetch,
  } = useFetchSingleOrder(`/order/all-active-orders/${orderId}/`, "post");
  const { access } = useAtomValue(authAtom);
  console.log(access);

  const handleRequestOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post(requestURL, {
        order_id: orderId,
      });
      if (data.message === "request is sent successfully") {
        setModalMessage("So'rov yuborildi");
      } else if (data.message === "request is returned back successfully") {
        setModalMessage("So'rov bekor qilindi");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      setResVisible(true);
      fetchRequestOrder();
    }
  };

  const fetchRequestOrder = async () => {
    try {
      const { data } = await api.get(requestURL + `${orderId}/`);
      setIsRequested(data.is_requested);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequestOrder();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    await fetchRequestOrder();
    setRefreshing(false);
  }, [refetch]);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader title="Yuk ma'lumotlari" enableBack />
      {(isLoading || loading) && !refreshing && (
        <OrderLoading Colors={Colors} />
      )}
      {(!isLoading || !loading) && !error && order && (
        <DriverActiveOrderInfoList
          order={order}
          isRequested={isRequested}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: screens.height * 0.1,
          backgroundColor: Colors.Boxbackground,
          width: screens.width,
          padding: 12,
          paddingTop: 7,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderColor: Colors.pageBackground,
        }}
      >
        <AppButton
          title={isRequested ? "So'rovni bekor qilish" : "So'rov yuborish"}
          variant="secondary"
          onPress={() => setRequestVisible(true)}
          isLoading={isLoading || loading}
          titleStyle={{ color: isRequested ? Colors.red : Colors.textPrimary }}
        />
      </View>
      <SheetModal
        open={requestVisible}
        onDismiss={() => setRequestVisible(false)}
        type="yesno"
        message="Siz so'rov yubormoqchimisiz ?"
        onYes={handleRequestOrder}
      />
      <SheetModal
        open={resVisible}
        onDismiss={() => setResVisible(false)}
        type="ok"
        message={modalMessage}
        onYes={handleRequestOrder}
      />
    </View>
  );
};

export default DriverActiveOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
