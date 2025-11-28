import AppText from "@/components/Texts/Text";
import { IThemeColors } from "@/theme/colors.interface";
import { StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { truckData } from "@/data/truck-data";

const MapOrderInfoTags = ({
  order,
  Colors,
  t,
}: {
  order: any;
  Colors: IThemeColors;
  t: any;
}) => (
  <View style={styles.infoRow}>
    <View
      style={[styles.infoTag, { backgroundColor: Colors.borderColor + "77" }]}
    >
      <FontAwesome5 name="truck" size={18} color={Colors.primary} />
      <AppText style={styles.sheetTitle}>
        {t(truckData[order?.truck]?.title)}
      </AppText>
    </View>
    <View
      style={[styles.infoTag, { backgroundColor: Colors.borderColor + "77" }]}
    >
      <FontAwesome5 name="money-bill" size={18} color={Colors.primary} />
      <AppText style={styles.sheetTitle}>
        {order.price.value} {order.price.currency}
      </AppText>
    </View>
  </View>
);

export default MapOrderInfoTags;

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
  },
  infoTag: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
  },
  sheetTitle: {
    fontSize: 14,
  },
});
