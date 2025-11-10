import { Pressable, StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import DriverActiveOrderInfoList from "@/components/OrderInfoList/DriverActiveOrderInfoList";
import AppText from "@/components/Texts/Text";
import { ORDERS, screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import { useEffect, useState } from "react";
import SheetModal from "@/components/Modal/SheetModal";
import api from "@/axios/axios.config";

const requestURL = "/driver/request-order/";

const DriverActiveOrder = () => {
  const Colors = useThemeColors();
  const [requestVisible, setRequestVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resVisible, setResVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRequested, setIsRequested] = useState(null);

  console.log(isRequested);

  const handleRequestOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post(requestURL, {
        order_id: 63,
      });
      // console.log(data);
      if (data.message === "request is sent successfully") {
        setModalMessage("So'rov yuborildi");
      } else if (data.message === "request is returned back successfully") {
        setModalMessage("So'rov bekor qilindi");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setResVisible(true);
      fetchRequestOrder();
    }
  };

  const fetchRequestOrder = async () => {
    try {
      const { data } = await api.get(requestURL + "63/");
      setIsRequested(data.is_requested);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestOrder();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader title="Yuk ma'lumotlari" enableBack />
      <DriverActiveOrderInfoList order={ORDERS[0]} isRequested={isRequested} />
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
          isLoading={isLoading}
          titleStyle={{ color: isRequested ? "red" : "red" }}
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
