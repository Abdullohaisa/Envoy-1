import React, { useCallback, useRef } from "react";
import { StyleSheet, View, FlatList, BackHandler } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { TruckItem } from "@/widget/customer/get-order/get-order-form/truck/data";
import CustomerGetOrderTruckList from "@/widget/customer/get-order/get-order-form/truck/truck-list";
import { router, useFocusEffect } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { safeNavigate } from "@/utils/safe-navigation";

const TruckList: React.FC = () => {
  const Colors = useThemeColors();
  const flatListRef = useRef<FlatList<TruckItem> | null>(null);

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
    <View style={[{ flex: 1, backgroundColor: Colors.pageBackground }]}>
      <PageHeader
        title="Yuk mashina"
        enableBack
        routePath={AppRoutes.customer.getOrder.index}
      />

      <CustomerGetOrderTruckList flatListRef={flatListRef} />
    </View>
  );
};

export default TruckList;

const styles = StyleSheet.create({});
