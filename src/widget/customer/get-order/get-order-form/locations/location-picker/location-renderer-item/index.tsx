import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { useSetAtom, useAtomValue } from "jotai";
import {
  getOrderLocationStatusAtom,
  getOrderLocationsAtom,
} from "@/atoms/get-order/locations";
import { clearLocationPickerAtom } from "@/service/get-order/controller";
import { RefObject, memo, useMemo, useCallback } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppText from "@/components/Texts/Text";
import IconRenderer from "./iconRenderer";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";

interface LocationItem {
  id: string;
  title: string;
  address?: { label?: string };
  position?: { lat: number; lng: number };
  distance: number;
  resultType?: string;
  categories?: { name: string }[];
}

interface RenderItemProps {
  item: LocationItem;
  setQuery: (text: string) => void;
  sheetRef: RefObject<BottomSheetModalMethods | null>;
}

const LocationPickerRendererItem = memo(
  ({ item, setQuery, sheetRef }: RenderItemProps) => {
    const Colors = useThemeColors();
    const clearLocationsState = useSetAtom(clearLocationPickerAtom);
    const setLocations = useSetAtom(getOrderLocationsAtom);
    const status = useAtomValue(getOrderLocationStatusAtom);

    // 🔹 Memoize formatted texts
    const formattedTitle = useMemo(
      () =>
        item.title
          ?.toLowerCase()
          .replace(/(^|\s)([a-zA-Zа-яА-ЯёЁўқғҳїіʼ'])/g, (m) =>
            m.toUpperCase()
          ) || "",
      [item.title]
    );

    const formattedAddress = useMemo(
      () =>
        item.address?.label
          ?.toLowerCase()
          .replace(/(^|\s)([a-zA-Zа-яА-ЯёЁўқғҳїіʼ'])/g, (m) =>
            m.toUpperCase()
          ) || "",
      [item.address?.label]
    );

    const handleSelect = useCallback(() => {
      setQuery("");
      clearLocationsState();
      sheetRef.current?.close();

      // router.push(AppRoutes.customer.getOrder.locations.map);

      const newLocation = {
        id: item.id,
        full_title: item.title,
        short_title: item.title.split(",")[0] || "",
        coordinates: {
          latitude: item.position?.lat ?? 0,
          longitude: item.position?.lng ?? 0,
        },
      };

      setLocations((prev) => {
        const updated = { ...prev };
        if (!updated[status.locationType]) updated[status.locationType] = [];
        // 🔹 Minimal update
        updated[status.locationType] = [...updated[status.locationType]];
        updated[status.locationType][status.index] = newLocation;
        return updated;
      });
    }, [item, sheetRef, status, setLocations, clearLocationsState, setQuery]);

    // 🔹 Memoized styles
    const textWrapperStyle = useMemo(
      () => ({
        ...styles.textWrapper,
        borderColor: Colors.Boxbackground06,
      }),
      [Colors.Boxbackground06]
    );

    const textColorStyle = useMemo(
      () => ({
        color: Colors.textPrimary,
      }),
      [Colors.textPrimary]
    );

    return (
      <TouchableOpacity style={styles.item} onPress={handleSelect}>
        <View style={styles.iconWrapper}>
          <IconRenderer
            resultType={item.resultType || ""}
            categories={item.categories}
          />
        </View>

        <View style={textWrapperStyle}>
          <AppText style={textColorStyle}>{formattedTitle}</AppText>
          <AppText style={styles.subtitle}>{formattedAddress}</AppText>
          <AppText style={styles.distance}>
            {parseFloat((item.distance / 1000).toFixed(1))} km
          </AppText>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.title === nextProps.item.title &&
    prevProps.item.address?.label === nextProps.item.address?.label &&
    prevProps.item.distance === nextProps.item.distance &&
    JSON.stringify(prevProps.item.categories) ===
      JSON.stringify(nextProps.item.categories)
);

export default LocationPickerRendererItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconWrapper: {
    marginHorizontal: 15,
    paddingTop: 19,
  },
  textWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    gap: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    width: "85%",
  },
  distance: {
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 5,
    right: 0,
    textAlign: "right",
  },
});
