import { View, ScrollView, StyleSheet, BackHandler } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import PickUpLocation from "@/widget/customer/get-order/get-order-form/locations/pick-up-location";
import { Spacing } from "@/shared/token";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { router, useFocusEffect } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { useCallback } from "react";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";
import { useTranslation } from "react-i18next";

const LocationForm = () => {
  const { t } = useTranslation();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        safeNavigate(() => router.replace(AppRoutes.customer.getOrder.index));

        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => sub.remove();
    }, [])
  );
  return (
    <View style={styles.container}>
      <PageHeader
        title={t("address")}
        enableBack
        routePath={AppRoutes.customer.getOrder.index}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <PickUpLocation locationType="pickup" />
          <PickUpLocation locationType="dropoff" />
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <GetOrderBackButton
              title={t("cargo")}
              onPress={() =>
                safeNavigate(() =>
                  router.push(AppRoutes.customer.getOrder.cargo)
                )
              }
            />
            <GetOrderNextButton
              title={t("cargo_truck")}
              onPress={() =>
                safeNavigate(() =>
                  router.push(AppRoutes.customer.getOrder.truck)
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.horizontal,
    paddingVertical: 20,
    paddingBottom: 200,
  },
  innerContainer: {
    flex: 1,
    minHeight: "100%", // scroll bo‘lishi uchun kerak
    gap: 20,
  },
});
