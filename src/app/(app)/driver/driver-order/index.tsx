import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { DRIVER_ORDER, Spacing, screens } from "@/shared/token";
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
          setUpdate((u) => u + 1);
          return;
        } else if (!loc.arrived) {
          loc.arrived = true;
          setUpdate((u) => u + 1);
          return;
        }
      }
    }
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
