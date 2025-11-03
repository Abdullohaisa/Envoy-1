import { View, TouchableOpacity, Text } from "react-native";
import { useRef } from "react";
import LocationPicker from "../location-picker";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useAtom } from "jotai";
import {
  getOrderLocationsAtom,
  getOrderLocationStatusAtom,
} from "@/atoms/get-order/locations";
import { useThemeColors } from "@/theme/useThemeColors";
import { locationStyles as styles } from "../location-picker/style";
import AppText from "@/components/Texts/Text";

const PickDownLocation = () => {
  const Colors = useThemeColors();
  const [locations, setLocations] = useAtom(getOrderLocationsAtom);
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const [, setLocationStatus] = useAtom(getOrderLocationStatusAtom);

  const openSheet = (index: number) => {
    setLocationStatus({ locationType: "dropoff", index }); // shu bo‘lishi kerak
    sheetRef.current?.present();
  };

  const addPickup = () => {
    setLocations((prev) => ({
      ...prev,
      dropoff: [
        ...prev.dropoff,
        {
          id: "",
          full_title: "",
          short_title: "",
          coordinates: { latitude: 0, longitude: 0 },
        },
      ],
    }));
  };

  const removePickup = (index: number) => {
    if (index === 0) return;
    setLocations((prev) => ({
      ...prev,
      dropoff: prev.dropoff.filter((_, i) => i !== index),
    }));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.Boxbackground06 }]}
    >
      {locations.dropoff.map((location, index) => (
        <View
          key={index}
          style={[
            styles.locationItem,
            { backgroundColor: Colors.Boxbackground },
          ]}
        >
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => openSheet(index)}
          >
            <AppText
              style={[styles.locationText, { color: Colors.textPrimary }]}
            >
              {location.full_title
                ? `${index + 1}. ${location.full_title}`
                : `Qayerdan (${index + 1})`}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, {}]}
            onPress={() => removePickup(index)}
          >
            <AppText style={styles.deleteText}>❌</AppText>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: Colors.primary }]}
        onPress={addPickup}
      >
        <AppText
          style={[
            // styles.addButtonText,
            { color: "#fff" },
          ]}
        >
          + Manzil qo‘shish
        </AppText>
      </TouchableOpacity>

      <LocationPicker sheetRef={sheetRef} />
    </View>
  );
};

export default PickDownLocation;
