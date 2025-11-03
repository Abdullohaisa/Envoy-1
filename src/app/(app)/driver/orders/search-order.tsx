import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { memo, useCallback, useState, useMemo } from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import ActiveDriverOrderItem from "@/widget/order/driver/active-order/ActiveDriverOrderItem";
import { Fonts, ORDERS, Radius, screens } from "@/shared/token";

interface LatLng {
  lat: number;
  lng: number;
}

// 🔹 Har bir shahar uchun markaziy koordinata
const cityCenters: Record<string, LatLng> = {
  toshkent: { lat: 41.3111, lng: 69.2797 },
  samarqand: { lat: 39.6542, lng: 66.9597 },
  buxoro: { lat: 39.7736, lng: 64.4232 },
};

// 🔹 Normalize va transliteration (o'zbekcha/ruscha)
const normalizeText = (text: string) => {
  if (!text) return "";
  const map: Record<string, string> = {
    а: "a",
    о: "o",
    қ: "q",
    к: "k",
    ш: "sh",
    с: "s",
    й: "i",
    ё: "e",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("")
    .map((c) => map[c] || c)
    .join("")
    .replace(/[^\w\s]/g, "")
    .trim();
};

// 🔹 Haversine formula
const getDistanceKm = (p1: LatLng, p2: LatLng) => {
  const R = 6371;
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const DriverActiveOrderListWithSearch = ({ onRefreshOrders }: any) => {
  const Colors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      if (onRefreshOrders) await onRefreshOrders();
      else await new Promise((res) => setTimeout(res, 1500));
    } finally {
      setRefreshing(false);
    }
  };

  // 🔹 Filtered orders based on city center + 30km radius
  const filteredOrders = useMemo(() => {
    if (!searchQuery) return [];

    const normalizedQuery = normalizeText(searchQuery);

    // Tanlangan shahar markazi
    const cityCenterEntry = Object.entries(cityCenters).find(([name]) =>
      normalizeText(name).includes(normalizedQuery)
    );

    if (!cityCenterEntry) return []; // shahar topilmasa bo'sh

    const cityCenter = cityCenterEntry[1];

    return ORDERS.filter((order) => {
      const pickup = order.locations.pickup[0].coordinates;
      const dropoff = order.locations.dropoff[0].coordinates;
      return (
        getDistanceKm(cityCenter, pickup) <= 30 ||
        getDistanceKm(cityCenter, dropoff) <= 30
      );
    });
  }, [searchQuery]);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <ActiveDriverOrderItem
        index={index}
        order={item}
        path="(app)/driver/orders/"
      />
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <View style={{ flex: 1, width: screens.width, paddingTop: insets.top }}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: Colors.Boxbackground },
          ]}
        >
          <TextInput
            placeholder="Qidiruv..."
            placeholderTextColor={Colors.textSecondary}
            style={[
              styles.input,
              { color: Colors.textPrimary, fontFamily: Fonts.regular },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <FlatList
            style={{ borderRadius: Radius.primary, overflow: "hidden" }}
            showsVerticalScrollIndicator={false}
            data={filteredOrders}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ flexGrow: 1, gap: 5 }}
            renderItem={renderItem}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={30}
            windowSize={7}
            getItemLayout={(_, index) => ({
              length: 120,
              offset: 120 * index,
              index,
            })}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#fff"]}
                progressBackgroundColor={Colors.primary}
                tintColor={Colors.primary}
              />
            }
            nestedScrollEnabled
            scrollEnabled
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(DriverActiveOrderListWithSearch);

const styles = StyleSheet.create({
  searchContainer: { paddingHorizontal: 15, paddingVertical: 10 },
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
