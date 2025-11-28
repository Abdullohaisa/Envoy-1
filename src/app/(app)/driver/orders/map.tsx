import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView from "react-native-maps";
import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  RefObject,
} from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import * as Location from "expo-location";
import AppText from "@/components/Texts/Text";
import { allActiveOrdersAtom } from "@/service/driver/fetch-all-active-orders/controller";
import { Spacing } from "@/shared/token";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocationTags from "@/widget/driver/map/location-tags";
import { MapUserLocationButton } from "@/widget/driver/map/map-user-location-bitton-component";
import MapActionButtons from "@/widget/driver/map/map-action-button";
import MapOrderInfoTags from "@/widget/driver/map/map-order-info-tags";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { IOrder } from "@/types/order";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { t } from "i18next";
import CombineOrderMarkers from "@/widget/driver/map/markers/combine-markers";
import SelectedOrderPickupMarkers from "@/widget/driver/map/markers/pickup-markers";
import SelectedOrderDropoffMarkers from "@/widget/driver/map/markers/dropoff-markers";

export default function DriverOrdersMapScreen() {
  const Colors = useThemeColors();
  const mapRef = useRef<MapView | null>(null);
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const navigation = useNavigation();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const allActiveOrders = useAtomValue(allActiveOrdersAtom);
  const combineOrder = useMemo(
    () => [...allActiveOrders.nearby, ...allActiveOrders.other],
    [allActiveOrders]
  );
  const [markerReady, setMarkerReady] = useState(true);

  // 🔹 Lokatsiyani olish va xaritani boshlang‘ich joylashtirish
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        const loc = await Location.getCurrentPositionAsync({});
        mapRef.current?.animateToRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 13,
          longitudeDelta: 13,
        });
      } catch (error) {
        Alert.alert("Joylashuvingizni topa olmadik ");
      }
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
    sheetRef.current?.present();
  }, []);

  const handleMapPan = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
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
        {!selectedOrder && (
          <CombineOrderMarkers
            combineOrder={combineOrder}
            markerReady={markerReady}
            Colors={Colors}
            handleMarkerPress={handleMarkerPress}
          />
        )}

        {selectedOrder?.locations?.pickup && (
          <SelectedOrderPickupMarkers
            pickupLocations={selectedOrder.locations.pickup}
            markerReady={markerReady}
            Colors={Colors}
          />
        )}

        {selectedOrder?.locations?.dropoff && (
          <SelectedOrderDropoffMarkers
            dropoffLocations={selectedOrder.locations.dropoff}
            markerReady={markerReady}
            Colors={Colors}
          />
        )}
      </MapView>

      {/* 🔹 Back tugmasi */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { backgroundColor: Colors.Boxbackground }]}
      >
        <ArrowLeft size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          (sheetRef.current?.dismiss(), setSelectedOrder(null));
        }}
        style={[
          {
            position: "absolute",
            left: 10,
            backgroundColor: Colors.Boxbackground,
            bottom: 50,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          },
        ]}
      >
        <ArrowLeft size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      {/* 🔹 User location button */}
      <MapUserLocationButton mapRef={mapRef} />

      <OrderSheet sheetRef={sheetRef} selectedOrder={selectedOrder} />
    </View>
  );
}

const OrderSheet = ({
  sheetRef,
  selectedOrder,
}: {
  sheetRef: RefObject<BottomSheetModalMethods | null>;
  selectedOrder: IOrder;
}) => {
  const snapPoints = useMemo(() => ["35%"], []);
  const Colors = useThemeColors();
  const inset = useSafeAreaInsets();
  return (
    <CustomBottomSheetModal
      enableDynamicSizing={false}
      ref={sheetRef}
      index={0}
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

              <MapOrderInfoTags order={selectedOrder} Colors={Colors} t={t} />
            </View>
            <MapActionButtons Colors={Colors} order={selectedOrder} />
          </View>
        ) : (
          <AppText style={[styles.sheetItem, { color: Colors.textSecondary }]}>
            Buyurtmani tanlang
          </AppText>
        )}
      </View>
    </CustomBottomSheetModal>
  );
};

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
  sheetItem: {
    fontSize: 15,
    textAlign: "center",
  },
});
