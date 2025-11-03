import React, { RefObject } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { UNIT_ICONS, UNIT_OPTIONS, UnitType } from "@/constants/unit";
import { useThemeColors } from "@/theme/useThemeColors";
import { vibration } from "@/utils/hapticks";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Radius, screens } from "@/shared/token";
import AppText from "@/components/Texts/Text";

interface UnitPickerProps {
  modalRef: RefObject<BottomSheetModalMethods | null>;
  onUnitChange: (short: string) => void;
  type: UnitType;
  selectedUnit: string | null;
}

const UnitPicker: React.FC<UnitPickerProps> = ({
  modalRef,
  onUnitChange,
  type,
  selectedUnit,
}) => {
  const Colors = useThemeColors();

  const renderItem = ({
    item,
    index,
  }: {
    item: { label: string; short: string };
    index: number;
  }) => {
    return (
      <Pressable
        style={[
          styles.unitOption,
          {
            backgroundColor: Colors.Boxbackground,
            width: (screens.width - 35) / 3,
            flexDirection: "row",
            borderRadius: 15,
            gap: 5,
            borderWidth: 1,
            elevation: 5,
            borderColor:
              selectedUnit === item.short ? Colors.primary : "transparent",
          },
        ]}
        onPress={() => {
          onUnitChange(item.short);
          vibration.light();
          setTimeout(() => {
            modalRef.current?.close();
          }, 500);
        }}
      >
        <AppText style={{ fontSize: 16, color: Colors.textPrimary }}>
          {item.label}
        </AppText>
      </Pressable>
    );
  };

  return (
    <CustomBottomSheetModal
      ref={modalRef}
      backgroundStyle={{ backgroundColor: Colors.pageBackground }}
      index={0}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropAppearIndex={0}
      backdropDisappearIndex={-1}
      backdropOpacity={0.5}
      pressBehavior="close"
      snapPoints={["50%"]}
      handleComponent={null}
      containerStyle={{
        borderRadius: Radius.primary,
        paddingTop: 0,
      }}
    >
      <View style={styles.options}>
        <FlatList
          data={UNIT_OPTIONS[type]}
          keyExtractor={(item) => item.short}
          renderItem={renderItem}
          numColumns={3} // 🔹 3 ustunli grid
          columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    </CustomBottomSheetModal>
  );
};

export default UnitPicker;

const styles = StyleSheet.create({
  options: {
    // paddingHorizontal: 10,
  },
  unitOption: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 6,
  },
});
