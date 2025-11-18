import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  ListRenderItemInfo,
} from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { Spacing } from "@/shared/token";
import { useSetAtom } from "jotai";
import { resetOrderAtom } from "@/atoms/get-order";
import { OrderButton } from "@/widget/customer/get-order/get-order-button";
import { useOrderFields } from "@/hooks/useOrderFields";
import { OrderActions } from "@/widget/customer/get-order/order-action-button";
import { useFocusEffect } from "expo-router";
import OrderReviewSheet from "@/widget/customer/get-order/order-review-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AppRoutes } from "@/constants/routes";
import { useTranslation } from "react-i18next";
import MaterialsIcon from "@/assets/icon/materials";
import MapIcon from "@/assets/icon/map";
import RightTruckIcon from "@/assets/icon/right-truck";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TimeIcon from "@/assets/icon/time";
import CommentIcon from "@/assets/icon/comment";
import PalletIcon from "@/assets/icon/pallet";
import TruckIcon from "@/assets/icon/truck";
import { truckData } from "@/data/truck-data";
import { moneyFormatter } from "@/utils/money-formatter";
import { formatDate } from "@/utils/date-formater";

const GetOrder = () => {
  const Colors = useThemeColors();
  const resetOrder = useSetAtom(resetOrderAtom);
  const { isFieldFilled, allFilled, anyFilled, order } = useOrderFields();
  const reviewSheetRef = useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation();

  type TOrderButton = {
    key: string;
    title: string;
    icon: (color: string, size: number) => React.ReactNode;
    route: string;
    getValue: (order: any) => string | null;
  };

  // 🔹 Order buttons array
  const orderButtons: TOrderButton[] = useMemo(
    () => [
      {
        key: "cargo",
        title: t("cargo"),
        icon: (color, size) => (
          <MaterialsIconWrapper color={color} size={size} Colors={Colors} />
        ),
        route: AppRoutes.customer.getOrder.cargo,
        getValue: (order) => order?.cargo?.type?.value || null,
      },
      {
        key: "locations",
        title: t("locations"),
        icon: (color, size) => (
          <MapIconWrapper color={color} size={size} Colors={Colors} />
        ),
        route: AppRoutes.customer.getOrder.locations.index,
        getValue: (order) => {
          const pickup = order?.locations?.pickup?.[0]?.short_title;
          const dropoff = order?.locations?.dropoff?.[0]?.short_title;
          if (pickup && dropoff) return `${pickup} → ${dropoff}`;
          return pickup || dropoff || null;
        },
      },
      {
        key: "truck",
        title: t("truck"),
        icon: (color, size) => (
          <TruckIconWrapper color={color} size={size} Colors={Colors} />
        ),
        route: AppRoutes.customer.getOrder.truck,
        getValue: (order) => t(truckData[order.truck]?.title) || null,
      },
      {
        key: "price",
        title: t("price"),
        icon: (color, size) => (
          <PriceIconWrapper color={color} size={size} Colors={Colors} />
        ),
        route: AppRoutes.customer.getOrder.price,
        getValue: (order) =>
          order?.price?.value
            ? `${moneyFormatter(order?.price?.value)} ${order.price.currency}`
            : null,
      },
      {
        key: "time",
        title: t("time"),
        icon: (color, size) => (
          <TimeIconWrapper color={color} size={size} Colors={Colors} />
        ),
        route: AppRoutes.customer.getOrder.time,
        getValue: (order) => {
          return formatDate(order?.time?.expected_arrival_time);
        },
      },
      {
        key: "comment",
        title: t("comment"),
        icon: (color, size) => (
          <CommentIconWrapper color={color} size={size} Colors={Colors} />
        ),
        route: AppRoutes.customer.getOrder.comment,
        getValue: (order) => order?.comment || null,
      },
    ],
    [Colors, t, order]
  );

  // 🔹 BackHandler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => sub.remove();
    }, [])
  );

  const buttons = useMemo(
    () =>
      orderButtons.map((btn) => ({
        ...btn,
        filled: !!isFieldFilled[btn.key as keyof typeof isFieldFilled],
        value: btn.getValue(order),
      })),
    [order, isFieldFilled, orderButtons]
  );

  // 🔹 FlatList render item
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<(typeof buttons)[number]>) => (
      <OrderButton
        title={item.title}
        icon={item.icon}
        route={item.route}
        filled={item.filled}
        value={item.value}
      />
    ),
    []
  );

  return (
    <>
      <PageHeader title={t("make_order")} />

      <View style={styles.container}>
        <FlatList
          data={buttons}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          style={{ marginTop: 5 }}
        />

        <OrderActions
          onClear={resetOrder}
          onSubmit={() => reviewSheetRef.current?.present()}
          anyFilled={anyFilled}
          allFilled={allFilled}
        />

        <OrderReviewSheet order={order} ref={reviewSheetRef} />
      </View>
    </>
  );
};

export default React.memo(GetOrder);

// 🔹 Wrappers for icons to move inline styles to StyleSheet
const MaterialsIconWrapper = ({ color, size, Colors }: any) => (
  <View
    style={[
      iconWrapperStyles.wrapper,
      { backgroundColor: Colors.pageBackground },
    ]}
  >
    <PalletIcon color={color} size={40} />
  </View>
);
const MapIconWrapper = ({ color, size, Colors }: any) => (
  <View
    style={[
      iconWrapperStyles.wrapper,
      { backgroundColor: Colors.pageBackground },
    ]}
  >
    <MapIcon color={color} size={35} />
  </View>
);
const TruckIconWrapper = ({ color, size, Colors }: any) => (
  <View
    style={[
      iconWrapperStyles.wrapper,
      {
        backgroundColor: Colors.pageBackground,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: Colors.pageBackground,
      },
    ]}
  >
    <View style={{ marginRight: 60 }}>
      <TruckIcon color={color} size={90} />
    </View>
  </View>
);
const PriceIconWrapper = ({ color, size, Colors }: any) => (
  <View
    style={[
      iconWrapperStyles.wrapper,
      { backgroundColor: Colors.pageBackground },
    ]}
  >
    <FontAwesome6 name="coins" size={25} color={color} />
  </View>
);
const TimeIconWrapper = ({ color, size, Colors }: any) => (
  <View
    style={[
      iconWrapperStyles.wrapper,
      { backgroundColor: Colors.pageBackground },
    ]}
  >
    <TimeIcon color={color} size={size} />
  </View>
);
const CommentIconWrapper = ({ color, size, Colors }: any) => (
  <View
    style={[
      iconWrapperStyles.wrapper,
      { backgroundColor: Colors.pageBackground },
    ]}
  >
    <CommentIcon color={color} size={size} />
  </View>
);

const iconWrapperStyles = StyleSheet.create({
  wrapper: {
    borderRadius: 13,
    maxWidth: 45,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    gap: 10,
    paddingBottom: 20,
    paddingTop: Spacing.horizontal - 5,
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: Spacing.horizontal,
  },
});
