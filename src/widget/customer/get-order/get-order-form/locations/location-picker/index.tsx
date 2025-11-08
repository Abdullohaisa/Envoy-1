import { BackHandler, Keyboard, View } from "react-native";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
} from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAtom, useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import LocationPickerInput from "./input";
import LocationPickerList from "./location-list";
import { useThemeColors } from "@/theme/useThemeColors";
import { Radius } from "@/shared/token";
import { locationPickerAtom } from "@/service/customer/get-order/controller";

// 🔹 Memo LocationPickerInput wrapper
const MemoLocationPickerInput = forwardRef(
  ({ value, onChangeText }: any, ref) => (
    <LocationPickerInput
      ref={ref}
      placeholder="Qayerdan..."
      value={value}
      onChangeText={onChangeText}
    />
  )
);

// 🔹 Memo LocationPickerList wrapper
const MemoLocationPickerList = React.memo(
  ({ sheetRef, isLoading, locations, setQuery }: any) => (
    <LocationPickerList
      sheetRef={sheetRef}
      isLoading={isLoading}
      locations={locations}
      setQuery={setQuery}
    />
  )
);

interface Props {
  sheetRef: React.RefObject<BottomSheetModalMethods<any> | null>;
}

const LocationPicker = ({ sheetRef }: Props) => {
  const topInsets = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const [query, setQuery] = useState("");
  const inputRef = useRef<any>(null);
  const theme = useAtomValue(themeAtom);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [{ locations, isLoading }, fetchLocation] = useAtom(locationPickerAtom);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen && sheetRef?.current) {
        sheetRef.current.dismiss();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isSheetOpen, sheetRef]);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  // 🔹 Debounced fetch
  const handleChangeText = useCallback(
    (text: string) => {
      setQuery(text);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => fetchLocation({ text }), 600);
    },
    [fetchLocation]
  );

  return (
    <CustomBottomSheetModal
      ref={sheetRef}
      index={0}
      handleComponent={null}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropAppearIndex={0}
      backdropDisappearIndex={-1}
      backdropOpacity={theme === "light" ? 0.5 : 1}
      pressBehavior="close"
      snapPoints={["100%"]}
      topInset={topInsets + 5}
      containerStyle={{
        borderTopLeftRadius: Radius.input,
        borderTopRightRadius: Radius.input,
        paddingTop: 0,
      }}
      onChange={(index) => {
        setIsSheetOpen(index >= 0);
      }}
      backgroundStyle={{
        backgroundColor: Colors.pageBackground,
        borderRadius: Radius.input,
      }}
      handleIndicatorStyle={{ height: 0 }}
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === 0) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 700);
        } else if (fromIndex === 0) {
          inputRef.current?.blur();
        }
      }}
    >
      <View style={{ flex: 1 }}>
        <MemoLocationPickerInput
          ref={inputRef}
          value={query}
          onChangeText={handleChangeText}
        />
        <MemoLocationPickerList
          sheetRef={sheetRef}
          isLoading={isLoading}
          locations={locations}
          setQuery={setQuery}
        />
      </View>
    </CustomBottomSheetModal>
  );
};

export default React.memo(LocationPicker);
