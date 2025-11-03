import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  interpolate,
  Easing,
} from "react-native-reanimated";
import AppButton from "@/components/Buttons/Button";
import AppText from "@/components/Texts/Text";
import PointerIcon from "@/assets/icon/pointer";
import MapDoteIcon from "@/assets/icon/map-dote-icon";
import CiricleArrowIcon from "@/assets/icon/circle-arrow";
import CustomSpinner from "@/components/Spinner/Spinner";
import SheetModal from "@/components/Modal/SheetModal";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtom, useAtomValue } from "jotai";
import {
  ILocation,
  getOrderLocationStatusAtom,
  getOrderLocationsAtom,
} from "@/atoms/get-order/locations";
import { themeAtom } from "@/theme/theme";
import { darkMapStyle, lightMapStyle } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

// -------------------- 🔹 MarkerSelector --------------------
const MarkerSelector = ({ scaleValue }: { scaleValue: any }) => {
  const animatedMarkerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return (
    <View style={[styles.markFixedBox]}>
      <Animated.View style={animatedMarkerStyle}>
        <MapDoteIcon />
      </Animated.View>
    </View>
  );
};

// -------------------- 🔹 TopControls --------------------
const TopControls = ({
  onSelect,
  getUserLocation,
}: {
  onSelect: () => void;
  getUserLocation: () => void;
}) => {
  const Colors = useThemeColors();
  const locationIndexType = useAtomValue(getOrderLocationStatusAtom);

  const index = locationIndexType.index + 1;
  const type =
    locationIndexType.locationType === "pickup" ? "Yuklash" : "Tushirish";

  const title = `${index} chi ${type} manzili`;

  return (
    <View style={[styles.box2]} pointerEvents="box-none">
      <TouchableOpacity
        style={{
          ...styles.topButtons,
          left: 10,
          zIndex: 9999,
          backgroundColor: Colors.Boxbackground,
        }}
        onPress={() => router.back()}
      >
        <CiricleArrowIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.topButtons,
          right: 10,
          zIndex: 9999,
          backgroundColor: Colors.Boxbackground,
        }}
        onPress={getUserLocation}
      >
        <Ionicons name="locate" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={[styles.inputRow, { backgroundColor: Colors.borderColor }]}>
        <View style={styles.row} pointerEvents="box-none">
          <PointerIcon
            color={Platform.OS === "ios" ? Colors.red : Colors.borderColor}
          />
          <AppText variant="bold" style={styles.input}>
            {title}
          </AppText>
        </View>
        <AppButton text={"Tanlash"} onPress={onSelect} />
      </View>
    </View>
  );
};

// -------------------- 🔹 MapComponent --------------------
const MapComponent = ({
  onSelect,
  setNewLocation,
  setRegion,
  region,
  newLocation,
}: {
  onSelect: () => void;
  setNewLocation: (data: any) => void;
  setRegion: (data: any) => void;
  region: any;
  newLocation: any;
}) => {
  const Colors = useThemeColors();
  const mapRef = useRef<MapView>(null);
  const HERE_API_KEY = process.env.EXPO_PUBLIC_HERE_API_KEY;
  const theme = useAtomValue(themeAtom);

  const [loading, setLoading] = useState(false);

  const scaleValue = useSharedValue(1);
  const opacityMarkerText = useSharedValue(0);
  const animatedWidth = useSharedValue(0);

  // ---------------- Pulsing
  const startPulsing = () => {
    scaleValue.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1,
      true
    );
  };
  const stopPulsing = () => {
    scaleValue.value = withTiming(1, { duration: 400 });
  };

  const animateWidth = (width: number, opacity: number) => {
    animatedWidth.value = withTiming(
      width,
      { duration: 400, easing: Easing.out(Easing.ease) },
      () => {
        opacityMarkerText.value = withTiming(opacity, {
          duration: 200,
          easing: Easing.out(Easing.circle),
        });
      }
    );
  };

  const animatedMarkerTextStyle = useAnimatedStyle(() => ({
    opacity: opacityMarkerText.value,
  }));

  const animatedWidthStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
    transform: [
      { translateX: interpolate(animatedWidth.value, [60, 300], [-30, -150]) },
    ],
  }));

  const animatedPointerStyle = useAnimatedStyle(() => ({
    opacity: loading
      ? withTiming(0, { duration: 300 })
      : withTiming(1, { duration: 300 }),
  }));

  const animatedSpinnerStyle = useAnimatedStyle(() => ({
    opacity: loading
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 }),
  }));

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Joylashuvga ruxsat berilmadi!");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const userLat = loc.coords.latitude;
    const userLng = loc.coords.longitude;

    // Xarita markazini foydalanuvchi joylashuviga o'rnatish
    setRegion({
      latitude: userLat,
      longitude: userLng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

    // HERE API orqali manzilni olish
    fetchAddress(userLat, userLng);
  };

  const onRegionChange = (newRegion: Region) => {
    startPulsing();
    setRegion(newRegion);
    animateWidth(51, 0);
  };

  const getCenterCoordinates = async () => {
    if (mapRef.current) {
      const cam = await mapRef.current.getCamera();
      if (cam?.center) {
        fetchAddress(cam.center.latitude, cam.center.longitude);
      }
    }
  };

  const fetchAddress = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&lang=uz&apiKey=${HERE_API_KEY}`
      );
      const data = await res.json();
      const location = data.items[0];
      if (!location) return;

      const newLocation = {
        id: location.id,
        full_title: location.address.label, // to'liq manzil
        short_title: location.address.city || location.address.county, // qisqa nom
        coordinates: {
          latitude: location.position.lat,
          longitude: location.position.lng,
        },
      };

      // 🔹 Faqat setNewLocation ga yozish
      setNewLocation(newLocation);
    } catch (err) {
      alert("Manzilni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Animated marker row */}
      <Animated.View
        style={[
          styles.inputRowMark,
          animatedWidthStyle,
          { backgroundColor: Colors.borderColor },
        ]}
      >
        <Animated.View style={[styles.markIcon, animatedPointerStyle]}>
          <PointerIcon color={"#000"} />
        </Animated.View>

        <Animated.View style={[styles.markIcon, animatedSpinnerStyle]}>
          <CustomSpinner color="#000" />
        </Animated.View>

        <Animated.Text style={[styles.inputMark, animatedMarkerTextStyle]}>
          {newLocation.full_title || ""}
        </Animated.Text>
      </Animated.View>

      <MarkerSelector scaleValue={scaleValue} />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        mapType="standard"
        onRegionChange={onRegionChange}
        onRegionChangeComplete={async () => {
          await getCenterCoordinates();
          stopPulsing();
          animateWidth(300, 1);
        }}
        customMapStyle={theme === "dark" ? darkMapStyle : lightMapStyle}
      />
      <TopControls onSelect={onSelect} getUserLocation={getUserLocation} />
    </View>
  );
};

import * as Location from "expo-location";

// -------------------- 🔹 MapScreen --------------------
export default function MapScreen() {
  const [visible, setVisible] = useState(false);
  const locationIndexType = useAtomValue(getOrderLocationStatusAtom);
  const [locations, setLocations] = useAtom(getOrderLocationsAtom);

  const initialLocation: ILocation =
    locations[locationIndexType.locationType][locationIndexType.index];

  const [newLocation, setNewLocation] = useState<ILocation | null>(null);
  const [region, setRegion] = useState({
    latitude: 41.2995, // default Toshkent
    longitude: 69.2401,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // 🔹 Foydalanuvchining hozirgi joylashuvini olish
  useEffect(() => {
    (async () => {
      let lat = initialLocation.coordinates.latitude;
      let lon = initialLocation.coordinates.longitude;

      if (!lat || !lon) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({});
          lat = loc.coords.latitude;
          lon = loc.coords.longitude;
        }
      }

      const updatedLocation: ILocation = {
        id: initialLocation.id || "",
        full_title: initialLocation.full_title || "Manzil tanlanmagan",
        short_title: initialLocation.short_title || "",
        coordinates: {
          latitude: lat,
          longitude: lon,
        },
      };

      setNewLocation(updatedLocation);
      setRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, [locationIndexType, locations]);

  // 🔹 onSelect funksiyasi: newLocation ni umumiy locations ga saqlash va modalni yopish
  const handleSelect = () => {
    if (!newLocation) return;

    setLocations((prev) => {
      const updated = { ...prev };
      const { locationType, index } = locationIndexType;

      if (!updated[locationType]) updated[locationType] = [];
      updated[locationType] = [...updated[locationType]];

      updated[locationType][index] = newLocation;
      return updated;
    });

    setVisible(false);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      {newLocation && (
        <MapComponent
          onSelect={handleSelect}
          setNewLocation={setNewLocation}
          setRegion={setRegion}
          newLocation={newLocation}
          region={region}
        />
      )}

      <SheetModal
        message="Xato"
        type="ok"
        open={visible}
        onDismiss={() => setVisible(false)}
      />
    </View>
  );
}

// -------------------- 🔹 Styles --------------------
const styles = StyleSheet.create({
  map: { flex: 1, zIndex: 0 },
  box2: {
    minHeight: screens.height * 0.15,
    padding: 10,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    gap: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputRow: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    height: 130,
    zIndex: 9999,
    justifyContent: "space-between",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  inputRowMark: {
    position: "absolute",
    top: "40.4%",
    left: "50%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    borderColor: "#ffffff",
    overflow: "hidden",
    gap: 10,
    transform: [{ translateX: -150 }],
    zIndex: 4,
    elevation: 10,
  },
  inputMark: { flex: 1, color: "#fff", paddingLeft: 60 },
  input: { flex: 1, color: "#fff", fontSize: 12 },
  topButtons: {
    position: "absolute",
    top: -screens.height * 0.08,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    elevation: 10,
  },
  markFixedBox: {
    position: "absolute",
    top: "45%",
    left: "50%",
    width: 87,
    height: 97,
    borderRadius: 15,
    zIndex: 1,
    transform: [{ translateX: -43.5 }, { translateY: -48.5 }],
  },
  markIcon: {
    backgroundColor: "#f4f400",
    borderRadius: 10,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 5,
  },
});
