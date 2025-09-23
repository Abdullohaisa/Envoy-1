import { Button, StyleSheet, Text, View } from "react-native";
import React, { RefObject, useRef, useState } from "react";
import LocationPicker from "../location-picker";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const PickUpLocation = () => {
  const [pickups, setPickups] = useState([null]); // 1 ta boshlang‘ich manzil
  const ref = useRef<BottomSheetModalMethods>(null);

  const addPickup = () => {
    setPickups((prev) => [...prev, null]); // yangi bo‘sh manzil qo‘shamiz
  };

  const handleSelect = (index: number, location: any) => {
    setPickups((prev) => {
      const updated = [...prev];
      updated[index] = location; // o‘sha indexdagi manzilni yangilaymiz
      return updated;
    });
  };

  console.log(pickups);

  const openSheet = () => {
    if (ref.current) {
      ref.current.present();
    }
  };

  return (
    <View>
      <LocationPicker ref={ref} />
      {/* {pickups.map((location, index) => (
        <View key={index}>
          <Button
            title={location ? location?.title : `Qayerdan (${index + 1})`}
            onPress={() => openSheet(index)}
          />
          <LocationPicker
            ref={(el: any) => (ref.current[index] = el!)}
            onSelect={(loc: any) => handleSelect(index, loc)}
          />
        </View>
      ))} */}

      {/* Qo‘shimcha manzil qo‘shish tugmasi */}
      <Button title="+ Manzil qo‘shish" onPress={openSheet} />
    </View>
  );
};

export default PickUpLocation;

const styles = StyleSheet.create({});
