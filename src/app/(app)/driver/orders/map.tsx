import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  RefObject,
  memo,
} from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import * as Location from "expo-location";
import AppText from "@/components/Texts/Text";
import { allActiveOrdersAtom } from "@/service/driver/fetch-all-active-orders/controller";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { truckData } from "@/data/truck-data";
import { useTranslation } from "react-i18next";
import { Spacing } from "@/shared/token";
import { IThemeColors } from "@/theme/colors.interface";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import ArrowIcon from "@/assets/icon/arrow";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

export default function DriverOrdersMapScreen() {
  const Colors = useThemeColors();
  const mapRef = useRef<MapView | null>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const allActiveOrders = useAtomValue(allActiveOrdersAtom);
  const combineOrder = useMemo(
    () => [...allActiveOrders.nearby, ...allActiveOrders.other],
    [allActiveOrders]
  );
  const snapPoints = useMemo(() => ["35%"], []);
  const inset = useSafeAreaInsets();
  const [markerReady, setMarkerReady] = useState(true);

  // 🔹 Lokatsiyani olish va xaritani boshlang‘ich joylashtirish
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 13,
        longitudeDelta: 13,
      });
    })();
  }, []);

  // 🔹 Marker render tayyorligi
  useEffect(() => {
    const timer = setTimeout(() => setMarkerReady(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // 🔹 Marker bosilganda sheet ochish
  const handleMarkerPress = useCallback((order: any) => {
    setSelectedOrder(order);
    sheetRef.current?.expand();
  }, []);

  const handleMapPan = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔹 Xarita */}
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: 41.3,
          longitude: 64.5,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onPanDrag={handleMapPan}
      >
        {/* Combine order markerlari */}
        {!selectedOrder &&
          combineOrder.map((order, index) => {
            console.log("order ==>", order);
            let latitude =
              order?.locations?.pickup[index]?.coordinates?.latitude;
            let longitude =
              order?.locations?.dropoff[index]?.coordinates?.longitude;
            return (
              <Marker
                key={order.id}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                onPress={() => handleMarkerPress(order)}
                tracksViewChanges={!markerReady}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: "#fff", borderColor: Colors.primary },
                  ]}
                />
              </Marker>
            );
          })}

        {/* Selected order pickup markerlari */}
        {selectedOrder?.locations?.pickup.map((order: any, index: number) => {
          let latitude = order?.locations?.pickup[index]?.coordinates?.latitude;
          let longitude =
            order?.locations?.dropoff[index]?.coordinates?.longitude;

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              tracksViewChanges={!markerReady}
            >
              <View
                style={[
                  styles.dot,
                  { backgroundColor: "#fff", borderColor: Colors.red },
                ]}
              />
            </Marker>
          );
        })}
        {/* Selected order dropoff markerlari */}
        {selectedOrder?.locations?.dropoff.map((order: any, index: number) => {
          let latitude = order?.locations?.pickup[index]?.coordinates?.latitude;
          let longitude =
            order?.locations?.dropoff[index]?.coordinates?.longitude;
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              tracksViewChanges={!markerReady}
            >
              <View
                style={[
                  styles.dot,
                  { backgroundColor: "#fff", borderColor: Colors.green },
                ]}
              />
            </Marker>
          );
        })}
      </MapView>

      {/* 🔹 Back tugmasi */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { backgroundColor: Colors.Boxbackground }]}
      >
        <ArrowLeft size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      {/* 🔹 User location button */}
      <UserLocationButton mapRef={mapRef} />

      {/* 🔹 Bottom Sheet */}
      <BottomSheet
        enableDynamicSizing={false}
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleComponent={null}
        handleStyle={{ height: 10 }}
        backgroundStyle={{
          backgroundColor: Colors.pageBackground,
          elevation: 20,
        }}
      >
        <View style={styles.sheetContent}>
          {selectedOrder ? (
            <View
              style={{
                gap: 5,
                height: "100%",
                justifyContent: "space-between",
                paddingBottom: inset.bottom + 5,
              }}
            >
              <View style={{ gap: 10 }}>
                <View
                  style={{
                    gap: 5,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderColor: Colors.borderColor,
                  }}
                >
                  <LocationTags
                    data={selectedOrder.locations.pickup}
                    iconName="upload"
                    color={Colors.yellow}
                    Colors={Colors}
                  />
                  <LocationTags
                    data={selectedOrder.locations.dropoff}
                    iconName="download"
                    color={Colors.green}
                    Colors={Colors}
                  />
                </View>

                <OrderInfoTags order={selectedOrder} Colors={Colors} t={t} />
              </View>
              <ActionButtons Colors={Colors} order={selectedOrder} />
            </View>
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

// 🔹 Pickup yoki dropoff joylarini ko‘rsatish
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
  const theme = useAtomValue(themeAtom);
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

// 🔹 Yuk turi va narx ma’lumotlari
const OrderInfoTags = ({
  order,
  Colors,
  t,
}: {
  order: any;
  Colors: IThemeColors;
  t: any;
}) => (
  <View style={styles.infoRow}>
    <View
      style={[styles.infoTag, { backgroundColor: Colors.borderColor + "77" }]}
    >
      <FontAwesome5 name="truck" size={18} color={Colors.primary} />
      <AppText style={styles.sheetTitle}>
        {t(truckData[order?.truck]?.title)}
      </AppText>
    </View>
    <View
      style={[styles.infoTag, { backgroundColor: Colors.borderColor + "77" }]}
    >
      <FontAwesome5 name="money-bill" size={18} color={Colors.primary} />
      <AppText style={styles.sheetTitle}>
        {order.price.value} {order.price.currency}
      </AppText>
    </View>
  </View>
);

// 🔹 Sheet ichidagi butonlar
const ActionButtons = ({
  Colors,
  order,
}: {
  Colors: IThemeColors;
  order: any;
}) => {
  const theme = useAtomValue(themeAtom);
  const inOrder = () => {
    safeNavigate(() =>
      router.push({
        pathname: "(app)/driver/orders/" + order.id,
        params: { order_id: JSON.stringify(order.id) },
      })
    );
  };
  return (
    <View style={styles.actionRow}>
      <Pressable
        style={[styles.buttonPrimary, { backgroundColor: Colors.primary }]}
      >
        <AppText variant="semiBold" style={styles.buttonText}>
          So‘rov yuborish
        </AppText>
      </Pressable>
      <Pressable
        onPress={inOrder}
        style={[
          styles.buttonSecondary,
          { backgroundColor: Colors.borderColor + "77" },
        ]}
      >
        <AppText style={styles.buttonSecondaryText}>Tafsilotlari</AppText>
      </Pressable>
    </View>
  );
};

interface Props {
  mapRef: RefObject<MapView | null>;
}

const UserLocationButtonComponent = ({ mapRef }: Props) => {
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

export const UserLocationButton = memo(UserLocationButtonComponent);

// 🔹 Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
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
    paddingHorizontal: Spacing.horizontal,
    paddingVertical: Spacing.horizontal,
  },
  sheetTitle: {
    fontSize: 14,
  },
  sheetItem: {
    fontSize: 15,
    textAlign: "center",
  },
  scrollContainer: { gap: 7 },
  locationTag: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
  },
  infoTag: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  buttonPrimary: {
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonSecondary: {
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: { fontSize: 16, color: "#fff" },
  buttonSecondaryText: { fontSize: 16 },
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
