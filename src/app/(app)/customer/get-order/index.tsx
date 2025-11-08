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
import { Feather } from "@expo/vector-icons";

const GetOrder = () => {
  const Colors = useThemeColors();
  const resetOrder = useSetAtom(resetOrderAtom);
  const { isFieldFilled, allFilled, anyFilled, order } = useOrderFields();
  const reviewSheetRef = useRef<BottomSheetModalMethods>(null);

  type TOrderButton = {
    key: string;
    title: string;
    icon: (color: string, size: number) => React.ReactNode;
    route: string;
    getValue: (order: any) => string | null;
  };

  const orderButtons: TOrderButton[] = [
    {
      key: "cargo",
      title: "Yuk",
      icon: (color, size) => <Feather name="box" size={size} color={color} />,
      route: AppRoutes.customer.getOrder.cargo,
      getValue: (order) => order?.cargo?.type?.value || null,
    },
    {
      key: "locations",
      title: "Manzillar",
      icon: (color, size) => (
        <Feather name="map-pin" size={size} color={color} />
      ),
      route: AppRoutes.customer.getOrder.locations.index,
      getValue: (order) => {
        const pickup = order?.locations?.pickup?.[0]?.short_title;
        const dropoff = order?.locations?.dropoff?.[0]?.short_title;
        if (pickup && dropoff) return `${pickup} → ${dropoff}`;
        if (pickup) return pickup;
        if (dropoff) return dropoff;
        return null;
      },
    },
    {
      key: "truck",
      title: "Mashina",
      icon: (color, size) => <Feather name="truck" size={size} color={color} />,
      route: AppRoutes.customer.getOrder.truck,
      getValue: (order) => order?.truck || null,
    },
    {
      key: "price",
      title: "Narx",
      icon: (color, size) => (
        <Feather name="dollar-sign" size={size} color={color} />
      ),
      route: AppRoutes.customer.getOrder.price,
      getValue: (order) =>
        order?.price?.value ? `${order.price.value} UZS` : null,
    },
    {
      key: "time",
      title: "Vaqt",
      icon: (color, size) => <Feather name="clock" size={size} color={color} />,
      route: AppRoutes.customer.getOrder.time,
      getValue: (order) =>
        order?.time?.deadline?.day
          ? `${order.time.deadline.day}.${order.time.deadline.month}.${order.time.deadline.year}`
          : null,
    },
    {
      key: "comment",
      title: "Izoh",
      icon: (color, size) => (
        <Feather name="message-square" size={size} color={color} />
      ),
      route: AppRoutes.customer.getOrder.comment,
      getValue: (order) => order?.comment || null,
    },
  ];

  // 🔹 BackHandler optimizatsiyasi
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
    [order, isFieldFilled]
  );

  // 🔹 Har bir tugma uchun render funksiyasi (memorized)
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
      <PageHeader title="Buyurtma berish" />

      <View style={{ flex: 1 }}>
        <FlatList
          data={buttons}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles(Colors).container}
          style={{
            marginTop: 5,
            paddingTop: Spacing.horizontal - 5,
            borderRadius: 5,
            overflow: "hidden",
            marginHorizontal: Spacing.horizontal,
          }}
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

const styles = (Colors: any) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      gap: 10,
      // marginHorizontal: Spacing.horizontal,
      paddingBottom: 20,
    },
  });
