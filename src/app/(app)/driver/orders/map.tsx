import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState, useMemo, useEffect } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import * as Location from "expo-location";
import AppText from "@/components/Texts/Text";

// 🔹 Buyurtmalar (butun O‘zbekiston bo‘ylab)
const ORDERS = [
  {
    id: 1,
    title: "Toshkent → Samarqand",
    city: "Toshkent",
    lat: 41.3111,
    lon: 69.2797,
    price: "200 000 so‘m",
    distance: "310 km",
  },
  {
    id: 2,
    title: "Samarqand → Buxoro",
    city: "Samarqand",
    lat: 39.6542,
    lon: 66.9597,
    price: "230 000 so‘m",
    distance: "270 km",
  },
  {
    id: 3,
    title: "Buxoro → Navoiy",
    city: "Buxoro",
    lat: 39.7747,
    lon: 64.4286,
    price: "150 000 so‘m",
    distance: "110 km",
  },
  {
    id: 4,
    title: "Farg‘ona → Andijon",
    city: "Farg‘ona",
    lat: 40.3736,
    lon: 71.7978,
    price: "90 000 so‘m",
    distance: "80 km",
  },
  {
    id: 5,
    title: "Namangan → Toshkent",
    city: "Namangan",
    lat: 41.0011,
    lon: 71.6726,
    price: "210 000 so‘m",
    distance: "290 km",
  },
  {
    id: 6,
    title: "Urganch → Xiva",
    city: "Xorazm",
    lat: 41.5565,
    lon: 60.631,
    price: "70 000 so‘m",
    distance: "35 km",
  },
  {
    id: 7,
    title: "Qarshi → Termiz",
    city: "Qashqadaryo",
    lat: 38.8606,
    lon: 65.7891,
    price: "250 000 so‘m",
    distance: "290 km",
  },
  {
    id: 8,
    title: "Nukus → Urganch",
    city: "Qoraqalpog‘iston",
    lat: 42.4619,
    lon: 59.616,
    price: "190 000 so‘m",
    distance: "160 km",
  },
];

export default function DriverOrdersMapScreen() {
  const Colors = useThemeColors();
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const theme = useAtomValue(themeAtom);
  const mapStyle = theme === "dark" ? darkMapStyle : lightMapStyle;

  const snapPoints = useMemo(() => ["25%"], []);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [region, setRegion] = useState<any>(null);

  // 🔹 Lokatsiyani olish
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    })();
  }, []);

  // 🔹 Marker bosilganda sheet ochish
  const handleMarkerPress = (order: any) => {
    setSelectedOrder(order);
    sheetRef.current?.expand();
  };

  // 🔹 Xarita harakatlansa sheetni yopish
  const handleMapPan = () => {
    sheetRef.current?.close();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 🔹 Xarita */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapType="standard"
        region={region}
        showsUserLocation
        initialRegion={{
          latitude: 41.3,
          longitude: 64.5,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        onPanDrag={handleMapPan}
        customMapStyle={mapStyle}
      >
        {ORDERS.map((order) => (
          <Marker
            key={order.id}
            coordinate={{ latitude: order.lat, longitude: order.lon }}
            onPress={() => handleMarkerPress(order)}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: Colors.primary, borderColor: "#fff" },
              ]}
            />
          </Marker>
        ))}
      </MapView>

      {/* 🔹 Back tugmasi */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { backgroundColor: Colors.Boxbackground }]}
      >
        <ArrowLeft size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      {/* 🔹 Bottom Sheet (buyurtma tafsiloti) */}
      <BottomSheet
        enableDynamicSizing={false}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: Colors.Boxbackground }}
        handleIndicatorStyle={{ backgroundColor: Colors.textSecondary }}
      >
        <View style={styles.sheetContent}>
          {selectedOrder ? (
            <>
              <AppText
                style={[styles.sheetTitle, { color: Colors.textPrimary }]}
              >
                {selectedOrder.title}
              </AppText>
              <AppText
                style={[styles.sheetItem, { color: Colors.textSecondary }]}
              >
                📍 Shahar: {selectedOrder.city}
              </AppText>
              <AppText
                style={[styles.sheetItem, { color: Colors.textSecondary }]}
              >
                🚗 Masofa: {selectedOrder.distance}
              </AppText>
              <AppText style={[styles.sheetItem, { color: Colors.primary }]}>
                💰 Narx: {selectedOrder.price}
              </AppText>
            </>
          ) : (
            <AppText
              style={[styles.sheetItem, { color: Colors.textSecondary }]}
            >
              Buyurtmani tanlang
            </AppText>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  sheetItem: {
    fontSize: 15,
    marginBottom: 4,
  },
});

// 🌑 DARK MODE XARITA
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];

// ☀️ LIGHT MODE XARITA
const lightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f5f1e6" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#fdfcf8" }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#c9c9c9" }],
  },
];
