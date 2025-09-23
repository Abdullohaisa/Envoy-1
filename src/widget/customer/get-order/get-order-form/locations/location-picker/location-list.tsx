import React from "react";
import { View } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Spacing, screens } from "@/shared/token";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import LocationPickerRendererItem from "./location-renderer-item";
import LocationPickerSkeletonItem from "./location-renderer-item/skeleton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

interface Props {
  isLoading: boolean;
  suggestions: object[];
  setQuery: (location: string) => void;
  ref: any;
}

interface RenderItemProps {
  item: any;
  setQuery: (text: string) => void;
  // ref: React.RefObject<BottomSheetModalMethods | null>;
}

const LocationPickerList = ({
  isLoading,
  suggestions,
  setQuery,
  // ref,
}: Props) => {
  const theme = useAtomValue(themeAtom);

  const SkeletonItem = () => <LocationPickerSkeletonItem />;

  const RenderItem = (props: RenderItemProps) => {
    return <LocationPickerRendererItem {...props} />;
  };

  return (
    <BottomSheetFlatList
      indicatorStyle={theme === "dark" ? "white" : "black"}
      contentContainerStyle={{
        paddingBottom: 400,
        paddingRight: Spacing.horizontal,
      }}
      data={isLoading ? Array(10).fill(null) : suggestions}
      keyExtractor={(item: any, index: number) => item?.id || index.toString()}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            height: screens.height,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
      renderItem={({ item }: { item: any }) => (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
        >
          {isLoading ? (
            <SkeletonItem />
          ) : (
            // <></>
            <RenderItem item={item} setQuery={setQuery} />
          )}
        </Animated.View>
      )}
      keyboardDismissMode="on-drag"
    />
  );
};

export default LocationPickerList;
