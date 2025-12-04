import React, { useRef, useState } from "react";
import { StyleSheet, View, Pressable, RefreshControl } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppText from "@/components/Texts/Text";
import ListEmptyComponent from "@/components/ListEmptyComponent/ListEmptyComponent";
import { AndroidRipple, Shadow, Spacing, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { formatDate } from "@/utils/date-formater";
import { IOrder } from "@/types/order";
import { useAtomValue, useSetAtom } from "jotai";
import { themeAtom } from "@/theme/theme";
import GivenOrderAddressSection from "./AddressSection";
import AppButton from "@/components/Buttons/Button";
import api from "@/axios/axios.config";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import SheetModal from "@/components/Modal/SheetModal";
import { ordersScrollToIndex } from "@/atoms/orders-scroll-to-index";
import { router } from "expo-router";
import { useFetchCustomerOrders } from "@/service/customer/customer-orders/controller";
import UserReviewSheet from "@/components/UserReview/UserReview";

const GivenOrderScrollContent = ({
  refreshing,
  handleRefresh,
  scrollHandler,
  order,
  warningVisible,
  sheetRef,
  setWarningVisible,
  allDeparted,
}: {
  refreshing: boolean;
  handleRefresh: () => void;
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
  order: IOrder;
  warningVisible: boolean;
  sheetRef: React.RefObject<BottomSheetModalMethods | null>;
  setWarningVisible: ($: boolean) => void;
  allDeparted: boolean;
}) => {
  const Colors = useThemeColors();
  const inset = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <Animated.ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          progressViewOffset={70}
          progressBackgroundColor={Colors.borderColor}
          colors={[Colors.primary, Colors.pageBackground]}
        />
      }
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: screens.height * 0.15, paddingTop: 50 + inset.top },
      ]}
      style={[styles.scroll, { paddingHorizontal: Spacing.horizontal }]}
    >
      {order.id ? (
        <>
          {allDeparted && <SuccesView id={order.id} />}
          <View
            pointerEvents={warningVisible ? "none" : "auto"}
            style={{ opacity: warningVisible ? 0.1 : 1 }}
          >
            <GivenOrderAddressSection
              title={t("pickup_addresses")}
              locations={order?.locations?.pickup}
              times={order?.time?.location_times?.pickup}
              type="pickup"
              order={order}
              allDeparted={allDeparted}
            />
            <GivenOrderAddressSection
              title={t("dropoff_addresses")}
              locations={order?.locations?.dropoff}
              times={order?.time?.location_times?.dropoff}
              type="dropoff"
              order={order}
              allDeparted={allDeparted}
            />
            <Button sheetRef={sheetRef} />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ListEmptyComponent />
          <AppText style={{ color: Colors.textSecondary }}>
            {refreshing ? t("loading") : t("no_data_found")}
          </AppText>
        </View>
      )}
    </Animated.ScrollView>
  );
};

export default GivenOrderScrollContent;

const Button = ({
  sheetRef,
}: {
  sheetRef: React.RefObject<BottomSheetModalMethods | null>;
}) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={() => sheetRef.current?.present()}
      android_ripple={AndroidRipple}
      style={styles.buttonContainer}
    >
      <AppText variant="regular" style={{ color: Colors.textSecondary }}>
        {t("cargo_information")}
      </AppText>
    </Pressable>
  );
};

const SuccesView = ({ id }: { id: number }) => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [finishState, setFinishState] = useState<{
    finished: boolean | null;
    isLoading: boolean;
    isError: string | null;
  }>({
    finished: null,
    isLoading: false,
    isError: null,
  });
  const setScrollIndex = useSetAtom(ordersScrollToIndex);
  const fetchOrders = useFetchCustomerOrders();
  const reviewSheetRef = useRef<BottomSheetModalMethods>(null);

  const finishedOrder = async () => {
    setFinishState({
      finished: null,
      isLoading: true,
      isError: null,
    });
    try {
      await api.post(`/customer/finish-order/${id}/`);
      setFinishState({
        finished: true,
        isLoading: false,
        isError: null,
      });
      setModalVisible(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setFinishState({
          finished: false,
          isLoading: false,
          isError: error.response?.data.message || "Tarmoq xatosi",
        });
      }
    }
  };

  const pressModal = () => {
    reviewSheetRef.current?.present();
  };

  const handlePress = () => {
    setTimeout(() => {
      reviewSheetRef.current?.dismiss();
    }, 500);
    setTimeout(() => {
      router.back();
    }, 1000);
    setTimeout(() => {
      setScrollIndex(2);
      fetchOrders();
    }, 1500);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors.Boxbackground },
        Shadow.dark,
      ]}
    >
      <AppText
        variant="semiBold"
        style={[
          styles.text,
          {
            color: theme === "dark" ? Colors.green : Colors.textPrimary,
            letterSpacing: 0.8,
          },
        ]}
      >
        {t("driver_delivered_cargo")}
      </AppText>
      <AppText
        style={{
          color: theme === "dark" ? Colors.textSecondary : Colors.textSecondary,
          fontSize: 14,
          textAlign: "center",
          marginTop: 5,
          letterSpacing: 0.8,
        }}
      >
        Iltimos, buyurtmani tugaganini tasdiqlang
      </AppText>
      <AppButton
        isLoading={finishState.isLoading}
        title="Tasdiqlash"
        onPress={finishedOrder}
        buttonStyle={{
          backgroundColor: Colors.borderColor,
          marginTop: Spacing.horizontal,
          paddingVertical: 15,
          paddingHorizontal: 12,
          borderRadius: 15,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        titleStyle={{ fontSize: 16 }}
      />
      <SheetModal
        type="ok"
        message="Buyurtma tugatildi"
        open={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onOk={pressModal}
      />
      <UserReviewSheet
        toUserId={2}
        ref={reviewSheetRef}
        text={"Yuk egasiga baho va izoh bering"}
        handlePress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  scroll: {
    overflow: "hidden",
    borderRadius: 5,
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: Spacing.horizontal,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  warningContainer: {
    padding: 10,
    marginTop: Spacing.horizontal,
    borderRadius: 20,
  },

  container: {
    padding: Spacing.horizontal * 1.2,
    marginTop: Spacing.horizontal,
    borderRadius: 20,
    alignItems: "center",
    gap: Spacing.horizontal * 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    marginTop: Spacing.horizontal,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
});
