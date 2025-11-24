import AppText from "@/components/Texts/Text";
import { View } from "react-native";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { useThemeColors } from "@/theme/useThemeColors";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date-formater";

export const OrderItemHeader = ({ order }: { order: any }) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <View style={styles.topSection}>
      <View style={styles.itemLengthBox}>
        <AppText style={[styles.itemLength, { color: Colors.textSecondary }]}>
          {t("number")} - {order.id}
        </AppText>
      </View>
      <AppText style={[styles.itemLength, { color: Colors.textSecondary }]}>
        {formatDate(order?.time?.created)}
      </AppText>
    </View>
  );
};
