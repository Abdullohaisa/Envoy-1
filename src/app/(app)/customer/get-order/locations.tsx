import React, { useState, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Button,
  Linking,
  Alert,
  Platform,
} from "react-native";

import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { Spacing } from "@/shared/token";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PickUpLocation from "@/widget/customer/get-order/get-order-form/locations/pick-up-location";

const LocationForm = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const ref = useRef<BottomSheetModalMethods>(null);

  const openMap = (lat: number, lng: number) => {
    const yandexUrl = `yandexmaps://maps.yandex.com/?ll=${lng},${lat}&pt=${lng},${lat},pm2rdm`;
    const googleUrl =
      Platform.OS === "ios"
        ? `comgooglemaps://?q=${lat},${lng}&zoom=14`
        : `geo:${lat},${lng}?q=${lat},${lng}`;

    Linking.openURL(yandexUrl).catch(() => {
      // Yandex mavjud bo‘lmasa Google Maps ochish
      Linking.openURL(googleUrl).catch(() => {
        Alert.alert(
          "Xatolik",
          "Hech qanday xarita ilovasi o‘rnatilmagan. Iltimos, Yandex yoki Google Maps’ni o‘rnating."
        );
      });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Manzil" enableBack />
        <View style={styles.container}>
          <Button
            onPress={() => openMap(39.73333, 64.18333)}
            title="Yuk ortiladigan manzil"
          />
          <Button title="Yuk tushuriladigan manzil" />
        </View>
        <CustomBottomSheetModal ref={ref} snapPointsProp={["100%"]}>
          <PickUpLocation />
        </CustomBottomSheetModal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: Spacing.horizontal,
    flex: 1,
    gap: 10,
  },
});
