import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { Spacing, screens } from "@/shared/token";
import SwipeButton from "@/components/Buttons/SwipeButton";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DriverOrderAddressSection from "@/widget/driver/driver-order-page/AddressSection";

// ======================= 📦 MOCK DATA =======================
export let DRIVER_ORDER = {
  id: 1,
  cargo: {
    weight: { value: 10, unit: "ton" },
    quantity: { value: 100, unit: "dona" },
    type: { value: "Olma", unit: null },
    height: null,
    length: null,
    width: null,
    volume: null,
  },
  truck: 1,
  locations: {
    pickup: [
      {
        id: "p1",
        full_title: "Toshkent, Chilonzor, 10-tuman",
        short_title: "Toshkent",
        coordinates: { lat: 41.2856, lng: 69.2033 },
        contact: { name: "Javlonbek", phone: "+998901000000" },
      },
      {
        id: "p2",
        full_title: "Toshkent, Sergeli, 3-mavze",
        short_title: "Sergeli",
        coordinates: { lat: 41.23, lng: 69.25 },
        contact: { name: "Oybek", phone: "+998901112233" },
      },
    ],
    dropoff: [
      {
        id: "d1",
        full_title: "Samarqand shahar, Registon ko‘chasi",
        short_title: "Samarqand",
        coordinates: { lat: 39.6542, lng: 66.9597 },
        contact: { name: "Sherzod", phone: "+99893550000" },
      },
      {
        id: "d2",
        full_title: "Buxoro viloyati, G‘ijduvon tumani",
        short_title: "Buxoro",
        coordinates: { lat: 39.75, lng: 64.43 },
        contact: { name: "Bekzod", phone: "+99893551111" },
      },
    ],
  },
  driver: {
    name: "Olim",
    phone_number: "+998903923636",
    photo: null,
    driver_coordinates: { lat: 39.6542, lng: 66.9597 },
    rating: { score: 4.2, count: 10 },
    comment_count: 10,
  },
  owner: {
    name: "Ali",
    phone: "+998901234567",
    rating: { score: 4.2, count: 10 },
    comment_count: 10,
  },
  time: {
    created: "2025-08-25T10:00:00Z",
    assigned: "",
    loaded: "",
    delivered: "",
    deadline: null,
  },
  status: {
    order_status: "yakunlangan",
    driver_status: {
      pickup: [
        { location_id: "p1", departed: false, arrived: false },
        { location_id: "p2", departed: false, arrived: false },
      ],
      dropoff: [
        { location_id: "d1", departed: false, arrived: false },
        { location_id: "d2", departed: false, arrived: false },
      ],
    },
  },
  distances: { total: 100 },
  price: { value: 1200000, currency: "USD" },
  note: "Maxsus yuk, ehtiyotkorlik bilan",
};

const DriverOrder = () => {
  const Colors = useThemeColors();
  const scrollY = useSharedValue(0);
  const inset = useSafeAreaInsets();

  const [, setUpdate] = useState(0); // componentni rerender qilish uchun

  // Scroll event
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Header animatsiyasi
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 80],
      [0, -80],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  // ---------------------- DRIVER STATUS UPDATE ----------------------
  const updateDriverStatus = () => {
    const stages: ("pickup" | "dropoff")[] = ["pickup", "dropoff"];

    for (let stage of stages) {
      const locs = DRIVER_ORDER.status.driver_status[stage];
      for (let i = 0; i < locs.length; i++) {
        const loc = locs[i];
        if (!loc.departed) {
          loc.departed = true;
          console.log(`🚚 ${stage} manzil ${loc.location_id} yo‘lga chiqdi`);
          setUpdate((u) => u + 1);
          return;
        } else if (!loc.arrived) {
          loc.arrived = true;
          console.log(`✅ ${stage} manzil ${loc.location_id} ga yetib bordi`);
          setUpdate((u) => u + 1);
          return;
        }
      }
    }
    console.log("🎉 Barcha manzillar bajarildi!");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      {/* HEADER */}
      <Animated.View style={[styles.headerWrapper, headerAnimatedStyle]}>
        <PageHeader title="Buyurtma tafsilotlari" />
      </Animated.View>

      {/* SCROLL CONTENT */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: screens.height * 0.1,
          paddingTop: 50 + inset.top,
        }}
        style={{
          marginHorizontal: Spacing.horizontal,
          overflow: "hidden",
          borderRadius: 5,
          marginTop: 5,
          marginBottom: screens.height * 0.2,
        }}
      >
        <DriverOrderAddressSection
          title="Yukni olish manzillari"
          data={DRIVER_ORDER.locations.pickup}
          type="pickup"
        />
        <DriverOrderAddressSection
          title="Yetkazish manzillari"
          data={DRIVER_ORDER.locations.dropoff}
          type="dropoff"
        />
      </Animated.ScrollView>

      {/* SWIPE BUTTON */}
      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: Colors.Boxbackground },
        ]}
      >
        <SwipeButton onConfirm={updateDriverStatus} />
      </View>
    </View>
  );
};

export default DriverOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: screens.height * 0.09,
    width: screens.width,
    padding: Spacing.horizontal,
  },
});
