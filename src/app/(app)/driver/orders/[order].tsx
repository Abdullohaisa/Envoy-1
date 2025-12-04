import { Alert, StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import DriverActiveOrderInfoList from "@/components/OrderInfoList/DriverActiveOrderInfoList";
import { Spacing, screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import { useCallback, useEffect, useState } from "react";
import SheetModal from "@/components/Modal/SheetModal";
import api from "@/axios/axios.config";
import { router, useLocalSearchParams } from "expo-router";
import { useFetchSingleOrder } from "@/service/order/fetch-single-order/controller";
import OrderLoading from "@/components/OrderLoading/OrderLoading";
import { useAtomValue, useSetAtom } from "jotai";
import {
  driverOrdersAtom,
  useFetchDriverOrders,
} from "@/service/driver/driver-orders/controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { themeAtom } from "@/theme/theme";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { ordersScrollToIndex } from "@/atoms/orders-scroll-to-index";

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
  const setScrollToIndex = useSetAtom(ordersScrollToIndex);
  const fetchDriverOrders = useFetchDriverOrders();

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

  const handleOk = () => {
    if (modalMessage === "So'rov yuborildi") {
      setTimeout(() => {
        router.back();
      }, 750);
      setTimeout(() => {
        setScrollToIndex(1);
      }, 1200);
    } else if (modalMessage === "So'rov bekor qilindi") {
      setScrollToIndex(0);
      router.back();
      setTimeout(() => {
        fetchDriverOrders();
      }, 700);
    }
  };

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
        <LinearGradient
          colors={
            theme === "dark"
              ? ["rgba(0,0,0,.0)", "rgba(0,0,0,1)"]
              : ["rgba(255,255,255, .1)", "rgba(255,255,255,1)"]
          }
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            width: screens.width,
            padding: Spacing.horizontal,
            paddingBottom: insets.bottom,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <AppButton
            title={isRequested ? t("cancel_request") : t("send_request")}
            variant="secondary"
            onPress={() => setRequestVisible(true)}
            isLoading={isLoading || loading}
            buttonStyle={{
              backgroundColor:
                theme === "light"
                  ? !isRequested
                    ? Colors.primary
                    : Colors.red04
                  : Colors.borderColor,
            }}
            titleStyle={{
              color: isRequested
                ? Colors.red
                : theme === "light"
                  ? "#fff"
                  : Colors.textPrimary,
            }}
            disabled={true}
          />
        </LinearGradient>
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
        onOk={handleOk}
      />
    </View>
  );
};

export default DriverActiveOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
