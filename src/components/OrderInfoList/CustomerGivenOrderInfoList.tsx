import { StyleSheet, View } from "react-native";
import {
  OrderListAddress,
  OrderListCargo,
  OrderListUser,
} from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import AppText from "../Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";

const CustomerGivenOrderInfoList = ({ order }: any) => {
  const Colors = useThemeColors();
  const { picked_up, departed, delivered } = order?.status?.driver || {};

  const getStatus = () => {
    if (!picked_up && !departed && !delivered)
      return { text: "Haydovchi hali yo‘lga chiqmagan", color: "#FFD93D" };
    if (departed && !picked_up && !delivered)
      return {
        text: "Haydovchi yukni olish uchun yo'lga chiqdi",
        color: "#00B4D8",
      };
    if (departed && picked_up && !delivered)
      return { text: "Haydovchi yukni olib  ketmoqda", color: "#0077B6" };
    if (departed && picked_up && delivered)
      return { text: "Yuk yetkazildi ✅", color: "#38B000" };
    return { text: "Ma’lumot kutilmoqda...", color: "#ADB5BD" };
  };

  const status = getStatus();
  return (
    <Animated.ScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <View
        style={[styles.statusCard, { backgroundColor: status.color + "33" }]}
      >
        <AppText style={[styles.statusTitle, { color: Colors.textSecondary }]}>
          Buyurtma holati
        </AppText>
        <AppText style={[styles.statusText, { color: status.color }]}>
          {status.text}
        </AppText>
      </View>
      <OrderListUser order={order} title={"Haydovchi"} />
      <OrderListCargo order={order} />
      <OrderListAddress locations={order.locations} />
    </Animated.ScrollView>
  );
};

export default CustomerGivenOrderInfoList;

const styles = StyleSheet.create({
  scrollView: {
    overflow: "hidden",
    marginTop: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 50,
    paddingTop: 5,
  },
  statusCard: {
    padding: 15,
    borderRadius: 16,
  },
  statusTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
