import LocationIcon from "@/assets/icon/location";
import AppText from "@/components/Texts/Text";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { locationTypeMapping } from "./location-type-mapping";
import { useSetAtom } from "jotai";
import { clearLocationPickerAtom } from "@/service/get-order/controller";

interface RenderItemProps {
  item: any;
  setQuery: (text: string) => void;
  // ref: React.RefObject<BottomSheetModalMethods | null>;
}

const LocationPickerRendererItem = ({
  item,
  setQuery,
  // ref,
}: RenderItemProps) => {
  const animation = useSharedValue(0);
  const Colors = useThemeColors();
  const clearLocationsState = useSetAtom(clearLocationPickerAtom);

  const iconColors: Record<string, string> = {
    locality: Colors.borderColor,
    school: "#4caf50",
    university: "#4caf50",
    hospital: "#f44336",
    store: "#ff9800",
    factory: "#9c27b0",
    restaurant: "#7c9dff",
    unknown: "#ff4e4e",
  };

  const rawType =
    item.resultType === "locality"
      ? "locality"
      : item.categories?.[0]?.name || "unknown";

  const normalizedType = rawType.replace(/’/g, "'").toLowerCase();

  const type =
    Object.keys(locationTypeMapping).find(
      (key) => key.toLowerCase() === normalizedType
    ) || "unknown";

  const color = iconColors[locationTypeMapping[type] || "unknown"] || "gray";

  let icon: React.ReactNode;
  switch (locationTypeMapping[type]) {
    case "locality":
      icon = <FontAwesome5 name="city" size={20} color={color} />;
      break;
    case "school":
      icon = <Ionicons name="school" size={22} color={color} />;
      break;
    case "university":
      icon = <Ionicons name="school" size={22} color={color} />;
      break;
    case "hospital":
      icon = (
        <MaterialCommunityIcons name="hospital-box" size={22} color={color} />
      );
      break;
    case "store":
      icon = <FontAwesome6 name="cart-shopping" size={22} color={color} />;
      break;
    case "factory":
      icon = <AppText style={{ fontSize: 22, color }}>🏭</AppText>;
      break;
    case "restaurant":
      icon = (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={22}
          color={color}
        />
      );
      break;
    default:
      icon = <LocationIcon size={22} color={color} />;
      break;
  }

  const listStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
  }));

  const formatText = (str: string) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/(^|\s)([a-zA-Zа-яА-ЯёЁўқғҳїіʼ'])/g, (match) =>
        match.toUpperCase()
      );
  };

  return (
    <View style={listStyle}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setQuery(item.title);
          clearLocationsState();
          // if (ref.current) {
          //   // ref.current?.dismiss();
          // }
        }}
      >
        <View style={{ marginHorizontal: 15, paddingTop: 19 }}>{icon}</View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: Colors.Boxbackground06,
            paddingVertical: 15,
            gap: 5,
          }}
        >
          <AppText style={{ color: Colors.textPrimary }}>
            {formatText(item.title)}
          </AppText>
          <AppText style={[styles.subtitle, { width: "85%" }]}>
            {formatText(item.address?.label)}
          </AppText>
          <AppText
            style={[
              styles.subtitle,
              {
                textAlign: "right",
                position: "absolute",
                bottom: 5,
                right: 0,
              },
            ]}
          >
            {parseFloat((item.distance / 1000).toFixed(1))} km
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LocationPickerRendererItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
});
