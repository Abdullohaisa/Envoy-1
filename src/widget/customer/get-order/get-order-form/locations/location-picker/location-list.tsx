import { View, Text, Image } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Spacing, screens } from "@/shared/token";
import LocationPickerRendererItem from "./location-renderer-item";
import LocationPickerSkeletonItem from "./location-renderer-item/skeleton";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

import { RefObject, useMemo } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import LocationIcon from "@/assets/icon/location";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import { useTranslation } from "react-i18next";
import { LocationSuggestion } from "@/service/customer/get-order/controller";

interface Props {
  isLoading: boolean;
  locations: LocationSuggestion[];
  setQuery: (location: string) => void;
  sheetRef: RefObject<BottomSheetModalMethods<any> | null>;
  openMap: () => void;
}

const LocationPickerList = ({
  isLoading,
  locations,
  setQuery,
  sheetRef,
  openMap,
}: Props) => {
  const theme = useAtomValue(themeAtom);
  const Colors = useThemeColors();
  const { t } = useTranslation();

  const skeletonData = useMemo(() => Array(10).fill(null), []);

  const renderItem = ({
    item,
    index,
  }: {
    item: LocationSuggestion | null;
    index: number;
  }) => {
    if (isLoading || !item) return <LocationPickerSkeletonItem key={index} />;

    return (
      <LocationPickerRendererItem
        key={item.id || index.toString()}
        item={item}
        setQuery={setQuery}
        sheetRef={sheetRef}
        openMap={openMap}
      />
    );
  };

  // 🔹 Empty component (bo‘sh holat)
  const EmptyComponent = () => (
    <View
      style={{
        flex: 1,
        height: screens.height * 0.4,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <LocationIcon size={60} color={Colors.primary} />
      <AppText
        style={{ color: theme === "dark" ? "white" : "gray", fontSize: 16 }}
      >
        {t("search_address")}
      </AppText>
    </View>
  );

  return (
    <BottomSheetFlatList
      indicatorStyle={theme === "dark" ? "white" : "black"}
      contentContainerStyle={{
        paddingBottom: !isLoading && locations.length !== 0 ? 400 : 0,
        paddingRight: Spacing.horizontal,
      }}
      data={isLoading ? skeletonData : locations}
      keyExtractor={(item: any, index: number) => item?.id || index.toString()}
      ListEmptyComponent={EmptyComponent}
      renderItem={renderItem}
      keyboardDismissMode="on-drag"
    />
  );
};

export default LocationPickerList;
