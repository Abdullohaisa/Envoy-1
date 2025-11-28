import React from "react";
import { StyleSheet, View, Pressable, RefreshControl } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppText from "@/components/Texts/Text";
import ListEmptyComponent from "@/components/ListEmptyComponent/ListEmptyComponent";
import { AndroidRipple, Shadow, Spacing, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { formatDate } from "@/utils/date-formater";
import DriverOrderAddressSection from "./AddressSection";
import { IOrder } from "@/types/order";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useTranslation } from "react-i18next";
import i18n from "@/locales/_i18n";

const DriverOrderScrollContent = ({
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
          {warningVisible && (
            <WarningView order={order} setWarningVisible={setWarningVisible} />
          )}
          {allDeparted && <SuccesView />}
          <View
            pointerEvents={warningVisible ? "none" : "auto"}
            style={{ opacity: warningVisible ? 0.1 : 1 }}
          >
            <DriverOrderAddressSection
              title={t("pickup_addresses")}
              locations={order?.locations?.pickup}
              times={order?.time?.location_times?.pickup}
              type="pickup"
              allDeparted={allDeparted}
            />
            <DriverOrderAddressSection
              title={t("dropoff_addresses")}
              locations={order?.locations?.dropoff}
              times={order?.time?.location_times?.dropoff}
              type="dropoff"
              allDeparted={allDeparted}
            />
            <Button sheetRef={sheetRef} />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ListEmptyComponent />
          <AppText style={{ color: Colors.textSecondary }}>
            {refreshing ? `${t("loading")}...` : t("no_data_found")}
          </AppText>
        </View>
      )}
    </Animated.ScrollView>
  );
};

export default DriverOrderScrollContent;

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

const WarningView = ({
  setWarningVisible,
  order,
}: {
  setWarningVisible: ($: boolean) => void;
  order: IOrder;
}) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();
  const expectedTime = formatDate(order.time.expected_arrival_time);
  const textParts = i18n
    .t("first_pickup_must_arrive_by", { expected_time: "%%TIME%%" }) // placeholder qo'yamiz
    .split("%%TIME%%");
  return (
    <View
      style={[
        styles.warningContainer,
        { backgroundColor: Colors.Boxbackground },
        Shadow.dark,
      ]}
    >
      <AppText style={{ textAlign: "center", color: Colors.textSecondary }}>
        {textParts[0]}
        <AppText style={{ color: Colors.primary }}>{expectedTime}</AppText>
        {textParts[1]}
      </AppText>
      <Pressable
        onPress={() => setWarningVisible(false)}
        android_ripple={AndroidRipple}
        style={[styles.buttonContainer, { marginTop: Spacing.horizontal }]}
      >
        <AppText variant="regular" style={{ color: Colors.primary }}>
          {t("understood")}
        </AppText>
      </Pressable>
    </View>
  );
};

const SuccesView = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const { t } = useTranslation();
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
        {t("you_delivered_successfully")}
      </AppText>

      <AppText
        style={{
          color: theme === "dark" ? Colors.textSecondary : Colors.textSecondary,
          fontSize: 14,
          textAlign: "left",
          marginTop: 5,
          letterSpacing: 0.8,
        }}
      >
        {t("order_must_be_confirmed")}
      </AppText>
      <AppText
        style={{
          color: theme === "dark" ? Colors.textSecondary : Colors.textSecondary,
          fontSize: 14,
          textAlign: "left",
          marginTop: 5,
          letterSpacing: 0.8,
        }}
      >
        {t("contact_operator_if_not_confirmed")}
      </AppText>
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
