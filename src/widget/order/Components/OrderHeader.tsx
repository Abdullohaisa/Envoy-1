import AppText from "@/components/Texts/Text";
import { View } from "react-native";
import { orderItemStyle as styles } from "@/styles/order-item-style";

export const OrderItemHeader = ({ order }: { order: any }) => {
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];
  const date = new Date(order.time.created);
  const formattedDate = `${date.getDate()}-${months[date.getMonth()]}, ${date.getFullYear()}`;

  return (
    <View style={styles.topSection}>
      <View style={styles.itemLengthBox}>
        <AppText style={styles.itemLength}>Raqam - {order.id}</AppText>
      </View>
      <AppText style={styles.itemLength}>{formattedDate}</AppText>
    </View>
  );
};
