import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { StyleSheet, View } from "react-native";
import { Shadow, Spacing } from "@/shared/token";
import GivenOrderAddressItem from "./AddressItem";
import { IOrder } from "@/types/order";

const GivenOrderAddressSection = ({
  title,
  locations,
  type,
  times,
  order,
  allDeparted,
}: {
  order: IOrder;
  title: string;
  locations: any[];
  type: "pickup" | "dropoff";
  times: any;
  allDeparted: boolean;
}) => {
  const Colors = useThemeColors();

  return (
    <View
      style={[
        styles.addressContainer,
        { backgroundColor: Colors.Boxbackground },
        Shadow.dark,
      ]}
    >
      <AppText
        variant="semiBold"
        style={[styles.sectionTitle, { color: Colors.primary }]}
      >
        {title}
      </AppText>

      {locations.map((loc: any, i: number) => (
        <GivenOrderAddressItem
          key={loc.id + i}
          loc={loc}
          index={i}
          type={type}
          lastIndex={locations.length - 1} // 🔥 oxirgi index
          times={times}
          order={order}
          allDeparted={allDeparted}
        />
      ))}
    </View>
  );
};

export default GivenOrderAddressSection;

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: Spacing.horizontal,
  },
});
