import { View, TouchableOpacity, Text } from "react-native";
import { useRef, memo, useCallback } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useAtom } from "jotai";
import {
  getOrderLocationsAtom,
  getOrderLocationStatusAtom,
} from "@/atoms/get-order/locations";
import { useThemeColors } from "@/theme/useThemeColors";
import { locationStyles as styles } from "../location-picker/style";
import AntDesign from "@expo/vector-icons/AntDesign";
import AppText from "@/components/Texts/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LocationPicker from "../location-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { useTranslation } from "react-i18next";

// 🔹 Location Header
const LocationHeader = memo(({ locationType, Colors }: any) => {
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: "row", gap: 10, padding: 5 }}>
      {locationType === "pickup" ? (
        <>
          <MaterialIcons
            name="my-location"
            size={24}
            color={Colors.borderColor}
          />
          <AppText>{t("dropoff_locations")}</AppText>
        </>
      ) : (
        <>
          <Ionicons
            name="location-sharp"
            size={24}
            color={Colors.borderColor}
          />
          <AppText>{t("pickup_locations")}</AppText>
        </>
      )}
    </View>
  );
});

// 🔹 Location Item
const LocationItem = memo(
  ({
    location,
    index,
    locationType,
    Colors,
    openSheet,
    removePickup,
    addPickup,
    openMap,
  }: any) => {
    const { t } = useTranslation();
    return (
      <TouchableOpacity
        onPress={() => openSheet(index)}
        key={index}
        style={[styles.locationItem, { backgroundColor: Colors.Boxbackground }]}
      >
        <View style={styles.locationButton}>
          <AppText
            style={[
              styles.locationText,
              {
                color: location.full_title
                  ? Colors.textPrimary
                  : Colors.textSecondary,
              },
            ]}
          >
            <AppText style={{ color: Colors.green }}>{index + 1}</AppText>
            {location.full_title
              ? `  -  ${location.full_title}`
              : locationType === "pickup"
                ? `  - ${t("from")}`
                : `  - ${t("to")}`}
          </AppText>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => openMap(index)}
          >
            <FontAwesome name="map" size={20} color={Colors.primary} />
          </TouchableOpacity>
          {index !== 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => removePickup(index)}
            >
              <AntDesign name="close" size={20} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={addPickup}>
              <AntDesign name="plus" size={20} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

// 🔹 Main Component
const PickUpLocation = ({
  locationType,
}: {
  locationType: "pickup" | "dropoff";
}) => {
  const Colors = useThemeColors();
  const [locations, setLocations] = useAtom(getOrderLocationsAtom);
  const [a, setLocationStatus] = useAtom(getOrderLocationStatusAtom);
  const sheetRef = useRef<BottomSheetModalMethods>(null);

  const openSheet = useCallback(
    (index: number) => {
      setLocationStatus({ locationType, index });
      sheetRef.current?.present();
    },
    [locationType]
  );

  const openMap = useCallback(
    (index: number) => {
      setLocationStatus({ locationType, index });
      safeNavigate(() =>
        router.push(AppRoutes.customer.getOrder.locations.map)
      );
    },
    [locationType]
  );

  const addPickup = useCallback(() => {
    setLocations((prev) => {
      const newLoc = {
        id: "",
        full_title: "",
        short_title: "",
        coordinates: { latitude: 0, longitude: 0 },
      };
      return {
        ...prev,
        [locationType]: [...prev[locationType], newLoc],
      };
    });
  }, [locationType]);

  const removePickup = useCallback(
    (index: number) => {
      if (index === 0) return;
      setLocations((prev) => ({
        ...prev,
        [locationType]: prev[locationType].filter(
          (_: any, i: number) => i !== index
        ),
      }));
    },
    [locationType]
  );

  const currentLocations = locations[locationType];

  return (
    <View>
      <LocationHeader locationType={locationType} Colors={Colors} />

      <View
        style={[styles.container, { backgroundColor: Colors.pageBackground }]}
      >
        {currentLocations.map((location, index) => (
          <LocationItem
            key={index}
            location={location}
            index={index}
            locationType={locationType}
            Colors={Colors}
            openSheet={openSheet}
            openMap={openMap}
            removePickup={removePickup}
            addPickup={addPickup}
          />
        ))}
        <LocationPicker sheetRef={sheetRef} />
      </View>
    </View>
  );
};

export default memo(PickUpLocation);
