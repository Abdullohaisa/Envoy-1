import ArrowIcon from "@/assets/icon/arrow";
import AppText from "@/components/Texts/Text";
import { IThemeColors } from "@/theme/colors.interface";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";
import { ScrollView, StyleSheet, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

const LocationTags = ({
  data,
  iconName,
  color,
  Colors,
}: {
  data: any;
  iconName: any;
  color: string;
  Colors: IThemeColors;
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Octicons name={iconName} size={18} color={color} />
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {data.map((location: any, index: number) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {/* Location tag */}
            <View
              style={[
                styles.locationTag,
                { backgroundColor: Colors.borderColor + "77" },
              ]}
            >
              <AppText style={styles.sheetTitle}>
                {location.short_title}
              </AppText>
            </View>

            {index < data.length - 1 && (
              <View style={{ marginLeft: 5 }}>
                <ArrowIcon
                  direction="right"
                  size={12}
                  color={Colors.textSecondary}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { gap: 7 },
  locationTag: {
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

export default LocationTags;
