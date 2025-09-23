import { BackHandler, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { APIKEY } from "@/constants/locations";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LocationPickerInput from "./input";
import LocationPickerList from "./location-list";
import { runOnJS } from "react-native-reanimated";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtom, useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { locationPickerAtom } from "@/service/get-order/controller";
import { Radius } from "@/shared/token";

interface Props {
  ref: any;
}
const LocationPicker = ({ ref }: Props) => {
  const topInsets = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const [query, setQuery] = useState("");
  const inputRef = useRef<any>(null);
  const theme = useAtomValue(themeAtom);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null); // ⬅️ debounce uchun
  const [{ locations, isLoading }, fetchLocation] = useAtom(locationPickerAtom);

  useEffect(() => {
    const backAction = () => {
      if (ref.current) {
        // Agar sheet ochiq bo‘lsa yopamiz
        ref.current.dismiss();
        return true; // default back action ishlamasin
      }
      return false; // agar sheet ochiq bo‘lmasa default ishlasin
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [ref]);

  const handleChangeText = (text: string) => {
    setQuery(text);

    // Agar yozayotgan bo‘lsa, eski timeoutni to‘xtatamiz
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Yangi timeout → 0.5 soniyadan keyin fetch ishlaydi
    typingTimeout.current = setTimeout(() => {
      fetchLocation({ text });
    }, 600);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      index={0}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropAppearIndex={0}
      backdropDisappearIndex={-1}
      backdropOpacity={theme === "light" ? 0.5 : 1}
      pressBehavior="close"
      snapPoints={["100%"]}
      topInset={topInsets + 5}
      handleComponent={null}
      containerStyle={{
        borderTopLeftRadius: Radius.primary,
        borderTopRightRadius: Radius.primary,
        paddingTop: 0,
      }}
      backgroundStyle={{ backgroundColor: Colors.pageBackground }}
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === 0) {
          inputRef.current?.focus();
        } else if (fromIndex === 0) {
          inputRef.current.blur();
        }
      }}
    >
      <View style={{ flex: 1 }}>
        <LocationPickerInput
          ref={inputRef}
          placeholder="Qayerdan..."
          value={query}
          onChangeText={handleChangeText}
        />
        <LocationPickerList
          isLoading={isLoading}
          suggestions={locations}
          setQuery={setQuery}
          ref={ref}
        />
      </View>
    </CustomBottomSheetModal>
  );
};

export default LocationPicker;
