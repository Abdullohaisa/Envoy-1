import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { StyleSheet, View } from "react-native";
import DriverOrderAddressItem from "./AddressItem";
import { Spacing } from "@/shared/token";
import { DRIVER_ORDER } from "@/app/(app)/driver/driver-order";

const DriverOrderAddressSection = ({
  title,
  data,
  type, // "pickup" yoki "dropoff"
}: {
  title: string;
  data: any[];
  type: "pickup" | "dropoff";
}) => {
  const Colors = useThemeColors();

  return (
    <View
      style={[
        styles.addressContainer,
        { backgroundColor: Colors.Boxbackground },
      ]}
    >
      <AppText
        variant="semiBold"
        style={[styles.sectionTitle, { color: Colors.primary }]}
      >
        {title}
      </AppText>

      {data.map((loc: any, i: number) => (
        <DriverOrderAddressItem
          key={loc.id + i}
          loc={loc}
          index={i}
          type={type}
        />
      ))}
    </View>
  );
};

export default DriverOrderAddressSection;

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: 10,
    borderRadius: 20,
    padding: Spacing.horizontal,
    gap: 5,
  },
  sectionTitle: { fontSize: 15, textAlign: "center", marginBottom: 10 },
});
