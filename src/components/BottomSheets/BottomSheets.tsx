import React, { forwardRef, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface Props {
  data: { id: string; name: string }[];
  onSelect: (item: { id: string; name: string }) => void;
  ref: React.RefObject<BottomSheetModalMethods | null>;
}

const SelectBottomSheet = forwardRef<BottomSheetModalMethods, Props>(
  ({ data, onSelect }, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        enableDynamicSizing={false}
      >
        <View style={{ padding: 16 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ paddingVertical: 12, borderBottomWidth: 0.5 }}
                onPress={() => {
                  onSelect(item); // Modalni yopish uchun dismiss ishlatiladi
                  ref?.current?.dismiss();
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetModal>
    );
  }
);

export default SelectBottomSheet;
