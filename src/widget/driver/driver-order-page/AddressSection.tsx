import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { StyleSheet, View } from "react-native";
import DriverOrderAddressItem from "./AddressItem";
import { Shadow, Spacing } from "@/shared/token";

const DriverOrderAddressSection = ({
  title,
  locations,
  type,
  times,
}: {
  title: string;
  locations: any[];
  type: "pickup" | "dropoff";
  times: any;
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
        <DriverOrderAddressItem
          key={loc.id + i}
          loc={loc}
          index={i}
          type={type}
          lastIndex={locations.length - 1} // 🔥 oxirgi index
          times={times}
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
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: Spacing.horizontal,
  },
});
