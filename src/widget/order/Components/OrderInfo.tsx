import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { TextStyle, View } from "react-native";
import { MaskedText } from "react-native-mask-text";
import { orderItemStyle as styles } from "@/styles/order-item-style";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

export const OrderItemInfo = ({ order }: { order: any }) => {
  // 🔹 Yuk mashina turlari
  const truckTypes = [
    "Tentli fura",
    "Refrejerator",
    "Platforma",
    "Samosval",
    "Cisterna",
    "Avtotransporter",
    "Izotermik",
    "Kontayner tashuvchi",
    "Gazel",
    "Yopiq kuzovli fura",
  ];

  const getTruckType = (truckNumber: number) => {
    if (truckNumber >= 1 && truckNumber <= 10) {
      return truckTypes[truckNumber - 1];
    }
    return "Noma’lum yuk mashinasi";
  };

  const renderFormattedPrice = (priceValue: number, currency: string) => (
    <MaskedText
      type="currency"
      options={{
        prefix: "",
        decimalSeparator: ".",
        groupSeparator: " ",
        precision: 0,
        suffix: ` ${currency}`,
      }}
      style={{ fontWeight: "bold" } as TextStyle}
    >
      {String(priceValue)}
    </MaskedText>
  );

  const rows = [
    [
      renderFormattedPrice(order?.price?.value, order?.price?.currency),
      order?.cargo?.type?.value,
      getTruckType(order?.truck), // 🔹 endi yuk mashina turi chiqadi
    ],
  ];

  return (
    <View style={styles.infoBox}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((text, idx) => (
            <InfoRow key={idx} text={text} />
          ))}
        </View>
      ))}
    </View>
  );
};

// 🔹 InfoRow (ichki komponent o‘z holida)
const InfoRow = ({ text }: { text: any }) => {
  const theme = useAtomValue(themeAtom);
  const Colors = useThemeColors();
  return (
    <View
      style={[
        styles.orderTypeBox,
        {
          backgroundColor:
            theme == "dark" ? Colors.borderColor : Colors.pageBackground,
        },
      ]}
    >
      <AppText style={[styles.orderType, { color: Colors.textPrimary }]}>
        {text}
      </AppText>
    </View>
  );
};
