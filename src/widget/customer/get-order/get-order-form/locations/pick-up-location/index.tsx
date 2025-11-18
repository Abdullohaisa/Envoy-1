import { View } from "react-native";
import { useRef, memo, useCallback } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useAtom } from "jotai";
import {
  getOrderLocationsAtom,
  getOrderLocationStatusAtom,
} from "@/atoms/get-order/locations";
import { useThemeColors } from "@/theme/useThemeColors";
import LocationPicker from "../location-picker";
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import PickLocationHeader from "./header";
import PickLocationItem from "./location-item";
import { Spacing } from "@/shared/token";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppText from "@/components/Texts/Text";

const PickUpLocation = ({
  locationType,
}: {
  locationType: "pickup" | "dropoff";
}) => {
  const Colors = useThemeColors();
  const [locations, setLocations] = useAtom(getOrderLocationsAtom);
  const [a, setLocationStatus] = useAtom(getOrderLocationStatusAtom);
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const contactSheetRef = useRef<BottomSheetModalMethods>(null);

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
        contact: {
          name: "",
          phone: "",
        },
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
    <View
      style={[
        {
          backgroundColor: Colors.Boxbackground,
          borderRadius: 20,
          elevation: 10,
          overflow: "hidden",
          padding: 5,
          marginHorizontal: Spacing.horizontal,
        },
      ]}
    >
      <PickLocationHeader
        locationType={locationType}
        Colors={Colors}
        addPickup={addPickup}
      />

      <View>
        {currentLocations.map((location, index) => (
          <View key={index}>
            <PickLocationItem
              key={index}
              location={location}
              index={index}
              locationType={locationType}
              Colors={Colors}
              openSheet={openSheet}
              openMap={openMap}
              removePickup={removePickup}
              contactSheetRef={contactSheetRef}
            />
            <LocationPicker
              sheetRef={sheetRef}
              openMap={() => {
                (openMap(index), sheetRef.current?.close());
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(PickUpLocation);
