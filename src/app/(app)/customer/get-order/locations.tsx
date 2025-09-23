import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Spacing } from "@/shared/token";
import PickUpLocation from "@/widget/customer/get-order/get-order-form/locations/pick-up-location";
import PickDownLocation from "@/widget/customer/get-order/get-order-form/locations/pick-down-location";

const LocationForm = () => {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Manzil" enableBack />

      <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
        <PickUpLocation />
        <PickDownLocation />
      </View>
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.horizontal,
  },
});
