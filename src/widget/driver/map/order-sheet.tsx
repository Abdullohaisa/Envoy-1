import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { useThemeColors } from "@/theme/useThemeColors";
import { IOrder } from "@/types/order";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocationTags from "./location-tags";
import MapOrderInfoTags from "./map-order-info-tags";
import MapActionButtons from "./map-action-button";
import AppText from "@/components/Texts/Text";
import { Spacing } from "@/shared/token";
import { t } from "i18next";

const MapOrderSheet = ({
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

export default MapOrderSheet;

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: Spacing.horizontal,
    paddingVertical: Spacing.horizontal,
  },
  sheetItem: {
    fontSize: 15,
    textAlign: "center",
  },
});
