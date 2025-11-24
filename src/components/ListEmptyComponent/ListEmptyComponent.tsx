import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PalletIcon from "@/assets/icon/pallet";
import { useThemeColors } from "@/theme/useThemeColors";

const ListEmptyComponent = () => {
  const Colors = useThemeColors();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PalletIcon size={200} color={Colors.borderColor} />
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({});
