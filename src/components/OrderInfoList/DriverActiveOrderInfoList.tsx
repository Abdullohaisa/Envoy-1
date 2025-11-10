import { StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  OrderListAddress,
  OrderListCargo,
  OrderListRequestDriver,
} from "./Components/Components";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";
import { screens } from "@/shared/token";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import AppText from "../Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";

const DriverActiveOrderInfoList = ({ order, isRequested }: any) => {
  const modalRef = useRef<any>(null);
  const theme = useAtomValue(themeAtom);
  const indicatorStyle = theme === "dark" ? "white" : "black";
  const Colors = useThemeColors();
  const [showStatus, setShowStatus] = useState(isRequested);

  useEffect(() => {
    if (isRequested) {
      setShowStatus(true);
    } else {
      // animatsiyaga vaqt berish
      setTimeout(() => setShowStatus(false), 600); // FadeOut bilan bir xil
    }
  }, [isRequested]);

  return (
    // <Animated.ScrollView
    //   entering={FadeInDown.duration(600)}
    //   exiting={FadeOutUp.duration(600)}
    //   scrollIndicatorInsets={{ right: -4 }}
    //   style={styles.scrollView}
    //   contentContainerStyle={styles.scrollContent}
    //   indicatorStyle={indicatorStyle}
    // >
    //   {showStatus && (
    //     <Animated.View
    //       entering={FadeInDown.duration(600)}
    //       exiting={FadeOutUp.duration(600)}
    //       style={[
    //         styles.statusCard,
    //         { backgroundColor: Colors.primary + "33" },
    //       ]}
    //     >
    //       <AppText
    //         style={[styles.statusTitle, { color: Colors.textSecondary }]}
    //       >
    //         Buyurtma holati
    //       </AppText>
    //       <AppText style={[styles.statusText, { color: Colors.primary }]}>
    //         So'rov yuborgansiz
    //       </AppText>
    //     </Animated.View>
    //   )}

    //   <OrderListCargo order={order} />
    //   <OrderListAddress locations={order.locations} />
    // </Animated.ScrollView>
    <Animated.ScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      scrollIndicatorInsets={{ right: -4 }}
      style={styles.scrollView}
      indicatorStyle={indicatorStyle}
    >
      <Animated.View
        layout={Layout.springify().duration(400)} // ✨ ichki layout ham silliq bo‘ladi
        style={styles.scrollContent}
      >
        {showStatus && (
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
              So'rov holati
            </AppText>
            <AppText style={[styles.statusText, { color: Colors.primary }]}>
              Siz so'rov yuborgansiz
            </AppText>
          </Animated.View>
        )}

        <OrderListCargo order={order} />
        <OrderListAddress locations={order.locations} />
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default DriverActiveOrderInfoList;

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  scrollView: {
    overflow: "hidden",
    marginTop: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: screens.height * 0.1 + 5,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 150,
    paddingTop: 5,
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
