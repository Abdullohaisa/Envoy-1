import { StyleSheet, View, ActivityIndicator } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { Audio } from "expo-av";
import { useAtom } from "jotai";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppButton from "@/components/Buttons/Button";
import AppText from "@/components/Texts/Text";
import {
  makeOrderAtom,
  resetMakeOrderAtom,
} from "@/service/get-order/controller";
import { useThemeColors } from "@/theme/useThemeColors";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { Spacing, screens } from "@/shared/token";
import GetOrderInfoList from "@/components/OrderInfoList/GetOrderInfoList";
import SheetModal from "@/components/Modal/SheetModal";

// -------------------- 🔊 SUCCESS OVOZ FUNKSIYASI --------------------
const useSuccessSound = (trigger: boolean) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  useEffect(() => {
    const play = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("@/assets/sounds/success-1.mp3")
        );
        soundRef.current = sound;
        await sound.playAsync();
      } catch {}
    };
    if (trigger) play();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [trigger]);
};

// -------------------- 🌀 LOADING KOMPONENT --------------------
const LoadingView = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#00BEFF" />
    <AppText style={styles.loadingText}>Buyurtma yaratilmoqda...</AppText>
  </View>
);

// -------------------- 📋 BUYURTMA MA'LUMOTLARI KOMPONENT --------------------
const OrderDetailsView = ({ order, onConfirm }: any) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <GetOrderInfoList order={order} />
      <View style={styles.confirmButtonWrapper}>
        <AppButton text="Buyurtma berish" onPress={() => setModal(true)} />
      </View>

      <SheetModal
        type="yesno"
        open={modal}
        onDismiss={() => setModal(false)}
        message="Buyurtma bermoqchimisiz?"
        onYes={() => {
          setModal(false);
          onConfirm(order);
        }}
      />
    </>
  );
};

// -------------------- ✅ SUCCESS KOMPONENT --------------------
const SuccessView = ({ onClose }: { onClose: () => void }) => {
  const Colors = useThemeColors();

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.borderColor]}
        style={styles.gradientBox}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          entering={ZoomIn.springify().damping(20)}
          exiting={ZoomOut.duration(200)}
          style={styles.iconWrapper}
        >
          <View
            style={[styles.iconBackground, { shadowColor: Colors.textPrimary }]}
          >
            <FontAwesome name="check" size={50} color="#fff" />
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <AppText style={[styles.titleSuccess, { color: Colors.textPrimary }]}>
            Buyurtma yaratildi
          </AppText>
          <AppText
            style={[styles.subtitlesuccess, { color: Colors.textPrimary }]}
          >
            Buyurtmangiz muvaffaqiyatli qabul qilindi. Operator tez orada siz
            bilan bog‘lanadi.
          </AppText>
        </View>
      </LinearGradient>

      <AppButton
        variant="silver"
        text="Yopish"
        onPress={onClose}
        style={{
          marginTop: 30,
          width: "85%",
          alignSelf: "center",
          shadowColor: Colors.primary,
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 5,
        }}
      />
    </Animated.View>
  );
};

// -------------------- 🧩 ASOSIY KOMPONENT --------------------
const OrderReviewSheetComponent = ({ order, ref }: any) => {
  const topInset = useSafeAreaInsets().top;
  const [{ isLoading, makeOrder }, setMakeOrder] = useAtom(makeOrderAtom);
  const [, resetOrder] = useAtom(resetMakeOrderAtom);

  useSuccessSound(makeOrder && !isLoading);

  const reset = () => {
    ref.current?.dismiss();
    resetOrder();
    setTimeout(() => router.push(AppRoutes.customer.orders), 500);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["100%"]}
      topInset={topInset}
      enablePanDownToClose={!(isLoading || makeOrder)}
    >
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <LoadingView />
        ) : !makeOrder ? (
          <OrderDetailsView order={order} onConfirm={setMakeOrder} />
        ) : (
          <SuccessView onClose={reset} />
        )}
      </View>
    </CustomBottomSheetModal>
  );
};

export const OrderReviewSheet = memo(OrderReviewSheetComponent);
export default OrderReviewSheet;

// -------------------- 🎨 STYLES --------------------
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: 10,
  },
  gradientBox: {
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 80,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 5,
    gap: 8,
  },
  titleSuccess: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitlesuccess: {
    fontSize: 16,
    opacity: 0.85,
    textAlign: "center",
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  confirmButtonWrapper: {
    position: "absolute",
    width: screens.width,
    bottom: Spacing.horizontal + 10,
    paddingHorizontal: Spacing.horizontal,
  },
});
