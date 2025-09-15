import { View, StyleSheet } from "react-native";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";

export default function DateHeader({
  selectedYear,
  monthNames,
  selectedMonth,
}: {
  selectedYear: number;
  monthNames: string[];
  selectedMonth: number;
}) {
  const Colors = useThemeColors();

  console.log(typeof monthNames);
  console.log(typeof selectedMonth);
  return (
    <View style={[styles.header]}>
      <AppText style={[styles.yearText, { color: Colors.primary }]}>
        {selectedYear} - {""}
      </AppText>
      <AppText
        style={{ fontSize: 20, fontWeight: "600", color: Colors.primary }}
      >
        {monthNames[selectedMonth]}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  yearText: { fontSize: 25, fontWeight: "600" },
});
