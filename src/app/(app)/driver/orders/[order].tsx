import { StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import DriverActiveOrderInfoList from "@/components/OrderInfoList/DriverActiveOrderInfoList";
import { screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import { useCallback, useEffect, useState } from "react";
import SheetModal from "@/components/Modal/SheetModal";
import api from "@/axios/axios.config";
import { useLocalSearchParams } from "expo-router";
import { useFetchSingleOrder } from "@/service/order/fetch-single-order/controller";
import OrderLoading from "@/components/OrderLoading/OrderLoading";
import { useAtomValue } from "jotai";
import { driverOrdersAtom } from "@/service/driver/driver-orders/controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { themeAtom } from "@/theme/theme";
import { useTranslation } from "react-i18next";

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
    isLoading: loading,
    error,
    refetch,
  } = useFetchSingleOrder(orderId);
  const { accepted } = useAtomValue(driverOrdersAtom);
  const insets = useSafeAreaInsets();
  const theme = useAtomValue(themeAtom);
  const { t } = useTranslation();

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
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
        },
      ]}
    >
      <PageHeader title={t("cargo_information")} enableBack />
      {(isLoading || loading) && !refreshing && (
        <OrderLoading Colors={Colors} />
      )}
      {(!isLoading || !loading) && !error && order && (
        <View>
          <DriverActiveOrderInfoList
            order={order}
            isRequested={isRequested}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </View>
      )}

      {!accepted.id && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: Colors.Boxbackground,
            width: screens.width,
            padding: 10,
            paddingBottom: insets.bottom,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderColor: Colors.pageBackground,
          }}
        >
          <AppButton
            title={isRequested ? t("cancel_request") : t("send_request")}
            variant="secondary"
            onPress={() => setRequestVisible(true)}
            isLoading={isLoading || loading}
            titleStyle={{
              color: isRequested ? Colors.red : Colors.textPrimary,
            }}
            disabled={true}
          />
        </View>
      )}

      <SheetModal
        open={requestVisible}
        onDismiss={() => setRequestVisible(false)}
        type="yesno"
        message={t("confirm_send_request")}
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
