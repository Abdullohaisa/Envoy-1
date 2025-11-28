import { useThemeColors } from "@/theme/useThemeColors";
import { RefObject, memo, useCallback, useState } from "react";
import * as Location from "expo-location";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MapView from "react-native-maps";

interface Props {
  mapRef: RefObject<MapView | null>;
}

const MapUserLocationButtonComponent = ({ mapRef }: Props) => {
  const Colors = useThemeColors();
  const [hasError, setHasError] = useState(false);

  const handlePress = useCallback(async () => {
    try {
      setHasError(false);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasError(true);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion(
        {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        500
      );
    } catch (error) {
      setHasError(true);
    }
  }, [mapRef]);

  return (
    <Pressable
      style={[styles.userLocationButton, { backgroundColor: Colors.primary }]}
      onPress={handlePress}
    >
      {hasError ? (
        <Entypo name="help" size={24} color="#fff" />
      ) : (
        <MaterialIcons
          name={hasError ? "help" : "my-location"}
          size={24}
          color="#fff"
        />
      )}
    </Pressable>
  );
};

export const MapUserLocationButton = memo(MapUserLocationButtonComponent);

const styles = StyleSheet.create({
  userLocationButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
