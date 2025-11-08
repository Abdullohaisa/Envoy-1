import AppText from "@/components/Texts/Text";
import { View } from "react-native";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { useThemeColors } from "@/theme/useThemeColors";

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
  const formattedDate = `${date.getDate()}-${months[date.getMonth()]} ${date.getFullYear()}`;
  const Colors = useThemeColors();

  return (
    <View style={styles.topSection}>
      <View style={styles.itemLengthBox}>
        <AppText style={[styles.itemLength, { color: Colors.textSecondary }]}>
          Raqam - {order.id}
        </AppText>
      </View>
      <AppText style={[styles.itemLength, { color: Colors.textSecondary }]}>
        {formattedDate}
      </AppText>
    </View>
  );
};
