import { RefreshControl, StyleSheet, View } from "react-native";

import {
  OrderListAddress,
  OrderListCargo,
  OrderListCustomer,
} from "./Components/Components";
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";
import { Spacing } from "@/shared/token";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import AppText from "../Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { driverOrdersAtom } from "@/service/driver/driver-orders/controller";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";

const DriverActiveOrderInfoList = ({
  order,
  isRequested,
  onRefresh,
  refreshing,
}: any) => {
  const theme = useAtomValue(themeAtom);
  const indicatorStyle = theme === "dark" ? "white" : "black";
  const Colors = useThemeColors();
  const { accepted } = useAtomValue(driverOrdersAtom);
  const { t } = useTranslation();

  return (
    <Animated.ScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      scrollIndicatorInsets={{ right: -4 }}
      style={styles.scrollView}
      indicatorStyle={indicatorStyle}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
          colors={["#fff"]}
          progressBackgroundColor={Colors.primary}
        />
      }
    >
      <Animated.View
        layout={Layout.springify().duration(400)}
        style={styles.scrollContent}
      >
        {accepted.id && <WarningBox />}

        {isRequested && (
          <Animated.View
            entering={FadeInDown.duration(600)}
            exiting={FadeOutUp.duration(600)}
            layout={Layout.springify().duration(400)}
            style={[
              styles.statusCard,
              { backgroundColor: Colors.primary + "33" },
            ]}
          >
            <AppText
              style={[styles.statusTitle, { color: Colors.textSecondary }]}
            >
              {t("request_status")}
            </AppText>
            <AppText style={[styles.statusText, { color: Colors.primary }]}>
              {t("you_sent_request")}
            </AppText>
          </Animated.View>
        )}
        <OrderListCustomer order={order} title={t("cargo_owner")} />
        <OrderListCargo order={order} />
        <OrderListAddress
          locations={order?.locations}
          isVisibleContact={false}
        />
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default DriverActiveOrderInfoList;

const WarningBox = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const { t } = useTranslation();
  return (
    <View style={{ padding: 10, alignItems: "center" }}>
      <Feather
        name="alert-circle"
        size={24}
        color={theme === "dark" ? Colors.yellow : Colors.textPrimary}
      />
      <AppText
        variant="semiBold"
        style={{
          marginTop: 5,
          textAlign: "center",
          color: theme === "dark" ? Colors.yellow : Colors.textPrimary,
          fontSize: 18,
        }}
      >
        {t("cannot_send_new_request")}
      </AppText>
      <AppText
        style={{
          textAlign: "center",
          color: Colors.textSecondary,
          fontSize: 14,
        }}
      >
        {t("complete_current_cargo_first")}
      </AppText>
    </View>
  );
};

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  scrollView: {
    overflow: "hidden",
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 150,
    padding: Spacing.horizontal,
  },
  statusCard: {
    padding: 15,
    borderRadius: 16,
  },
  statusTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
