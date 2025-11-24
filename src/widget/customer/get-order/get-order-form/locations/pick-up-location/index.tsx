import { View } from "react-native";
import { useRef, memo, useCallback, useState } from "react";
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
import { Spacing } from "@/shared/token";
import ContactBottomSheet from "./contact-sheet";
import PickLocationItem from "./location-item";

const PickUpLocation = ({
  locationType,
}: {
  locationType: "pickup" | "dropoff";
}) => {
  const Colors = useThemeColors();
  const [locations, setLocations] = useAtom(getOrderLocationsAtom);
  const [a, setLocationStatus] = useAtom(getOrderLocationStatusAtom);
  const [activeIndex, setactiveIndex] = useState<number | null>(null);
  const locationSheetRef = useRef<BottomSheetModalMethods>(null);
  const contactSheetRef = useRef<BottomSheetModalMethods>(null);

  const openSheet = useCallback(
    (index: number) => {
      setactiveIndex(index);
      setLocationStatus({ locationType, index });
      locationSheetRef.current?.present();
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

  const openContact = (index: number) => {
    setactiveIndex(index); // <-- majburiy!
    setLocationStatus({ locationType, index });
    contactSheetRef.current?.present();
  };

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

  const activeLocation =
    activeIndex !== null ? currentLocations[activeIndex] : null;

  const saveContact = useCallback(
    (contact: { name: string; phone: string }) => {
      if (activeIndex === null) return;

      setLocations((prev) => {
        const arr = [...prev[locationType]];

        arr[activeIndex] = {
          ...arr[activeIndex],
          contact: {
            ...arr[activeIndex].contact,
            ...contact,
          },
        };

        return {
          ...prev,
          [locationType]: arr,
        };
      });

      contactSheetRef.current?.close();
    },
    [activeIndex, locationType]
  );

  return (
    <View
      style={[
        {
          backgroundColor: Colors.Boxbackground,
          borderRadius: 20,
          elevation: 10,
          overflow: "hidden",
          // padding: 5,
          marginHorizontal: Spacing.horizontal,
        },
      ]}
    >
      <PickLocationHeader
        locationType={locationType}
        Colors={Colors}
        addPickup={addPickup}
      />

      <View style={{}}>
        {currentLocations.map((location, index) => (
          <View key={index}>
            <PickLocationItem
              key={index}
              location={location}
              index={index}
              locationType={locationType}
              Colors={Colors}
              openSheet={openSheet}
              removePickup={removePickup}
              contactSheetRef={contactSheetRef}
              openContact={openContact}
            />
          </View>
        ))}
        <LocationPicker
          sheetRef={locationSheetRef}
          openMap={() => {
            if (activeIndex !== null) {
              (openMap(activeIndex), locationSheetRef.current?.close());
            }
          }}
        />
        <ContactBottomSheet
          location={activeLocation}
          locationType={locationType}
          index={activeIndex || 0}
          contactSheetRef={contactSheetRef}
          onSaveContact={saveContact}
        />
      </View>
    </View>
  );
};

export default memo(PickUpLocation);
