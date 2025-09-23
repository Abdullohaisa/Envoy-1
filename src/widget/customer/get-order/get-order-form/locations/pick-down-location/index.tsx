import { StyleSheet, Text, View } from "react-native";
import React, { RefObject, useRef } from "react";
import LocationPicker from "../location-picker";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppButton from "@/components/Buttons/Button";

const PickDownLocation = () => {
  const fromRef = useRef<BottomSheetModalMethods>(null);
  return (
    <View>
      {/* <AppButton text="Qayerga" onPress={() => fromRef.current?.present()} /> */}
      {/* <LocationPicker ref={fromRef} /> */}
    </View>
  );
};

export default PickDownLocation;

const styles = StyleSheet.create({});
