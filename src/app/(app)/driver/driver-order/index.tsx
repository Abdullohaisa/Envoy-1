import { RefObject, memo, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Pressable, View } from "react-native";

// Theme va ranglar
import { useThemeColors } from "@/theme/useThemeColors";

// State management
import { useAtomValue } from "jotai";
import {
  driverOrdersAtom,
  useFetchDriverOrders,
} from "@/service/driver/driver-orders/controller";

// API
import api from "@/axios/axios.config";

// Reanimated
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";

// BottomSheet types
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// Components
import AnimationHeader from "@/components/Header/PageHeader/PageAnimationHeader";
import DriverOrderScrollContent from "@/widget/driver/driver-order-page/DriverOrderScrollContent";
import OrderBySheet from "@/components/OrderBySheet/OrderBySheet";
import DriverOrderButton from "@/widget/driver/driver-order-page/DriverOrderButton";
import { themeAtom } from "@/theme/theme";
import { useTranslation } from "react-i18next";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/Texts/Text";
import StarOutlineIcon from "@/assets/icon/star-outline";
import StarFillIcon from "@/assets/icon/star-fill";
import { vibration } from "@/utils/hapticks";
import CloseIcon from "@/assets/icon/close";
import { Spacing, screens } from "@/shared/token";
import {
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from "@gorhom/bottom-sheet";
import AppCommentInput from "@/components/Input/CommentInput";
import AppButton from "@/components/Buttons/Button";

const DriverOrder = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const scrollY = useSharedValue(0);
  const { t } = useTranslation();
  const { accepted: order } = useAtomValue(driverOrdersAtom);
  const fetchDriverOrder = useFetchDriverOrders();
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const reviewSheet = useRef<BottomSheetModalMethods>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [warningVisible, setWarningVisible] = useState(
    order?.status?.driver_status?.pickup[0].departed ? false : true
  );

  const handleCheckAllDeparted = () => {
    if (!order?.status?.driver_status) return false;
    const pickupStatuses =
      order.status.driver_status.pickup.map((item) => item.arrived === true) ||
      [];
    const dropoffStatuses =
      order.status.driver_status.dropoff.map((item) => item.arrived === true) ||
      [];

    return [...pickupStatuses, ...dropoffStatuses].every(Boolean);
  };

  useEffect(() => {
    handleCheckAllDeparted();
  }, []);

  const allDeparted = handleCheckAllDeparted();

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDriverOrder().finally(() => setRefreshing(false));
  };

  // Scroll handler (Reanimated)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Change driver status API call
  const changeDriverStatus = async () => {
    setLoading(true);
    try {
      await api.post(`order/modify-status/${order.id}/`);
      await fetchDriverOrder();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isBackPress = () => {
      if (sheetRef?.current && isSheetOpen) {
        sheetRef?.current.dismiss();
        setIsSheetOpen(false);
        return true;
      }
      // BackHandler.exitApp();
      return false;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      isBackPress
    );

    return () => subscription.remove();
  }, [isSheetOpen]);

  useEffect(() => {
    // reviewSheet.current?.present();
  }, []);

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? Colors.pageBackground : Colors.Boxbackground,
        flex: 1,
      }}
    >
      {/* Header animation */}
      <AnimationHeader scrollY={scrollY} title={t("your_cargo")} />

      {/* Scroll content */}
      <DriverOrderScrollContent
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        scrollHandler={scrollHandler}
        order={order}
        warningVisible={warningVisible}
        sheetRef={sheetRef}
        setWarningVisible={setWarningVisible}
        allDeparted={allDeparted}
      />

      {/* Bottom Sheet */}
      {order?.id && (
        <OrderBySheet
          sheetRef={sheetRef}
          order={order}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}

      {/* Action button */}
      {order?.id && (
        <DriverOrderButton
          warningVisible={warningVisible}
          changeDriverStatus={changeDriverStatus}
          loading={loading}
          allDeparted={allDeparted}
        />
      )}

      <ReviewSheet ref={reviewSheet} text={"Yuk egasiga baho va izoh bering"} />
    </View>
  );
};

const ReviewSheet = ({
  ref,
  text,
}: {
  ref: RefObject<BottomSheetModalMethods | null>;
  text: string;
}) => {
  const topInset = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const snapPoints = useMemo(() => ["65%", "100%"], []);
  const scrollRef = useRef<BottomSheetScrollViewMethods | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  return (
    <CustomBottomSheetModal
      index={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropOpacity={0.7}
      topInset={topInset}
      backgroundStyle={{ backgroundColor: Colors.Boxbackground }}
      enablePanDownToClose={false}
      enableDismissOnClose={false}
    >
      <View>
        <AppText variant="medium" style={{ fontSize: 19, textAlign: "center" }}>
          {text}
        </AppText>

        <BottomSheetScrollView
          ref={scrollRef}
          style={{ flexGrow: 1, height: "100%" }}
          contentContainerStyle={{ paddingBottom: screens.height * 0.18 }}
        >
          <View
            style={{
              marginTop: 20,
              borderTopWidth: 1,
              paddingTop: 20,
              borderColor: Colors.borderColor,
            }}
          >
            <RatingInput rating={rating} setRating={setRating} />
          </View>
          <View
            style={{
              marginTop: 20,
              borderTopWidth: 1,
              borderColor: Colors.borderColor,
              padding: 20,
              flex: 1,
              height: "auto",
            }}
          >
            <CommentInput
              sheetRef={ref}
              scrollRef={scrollRef}
              comment={comment}
              setComment={setComment}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              borderTopWidth: 1,
              paddingTop: 20,
              borderColor: Colors.borderColor,
              padding: 20,
            }}
          >
            <AppButton title="Baholadim" variant="secondary" />
          </View>
        </BottomSheetScrollView>
      </View>
    </CustomBottomSheetModal>
  );
};

const CommentInput = memo(
  ({
    sheetRef,
    scrollRef,
    comment,
    setComment,
  }: {
    sheetRef: RefObject<BottomSheetModalMethods | null>;
    scrollRef: RefObject<BottomSheetScrollViewMethods | null>;
    comment: string;
    setComment: (comment: string) => void;
  }) => {
    const Colors = useThemeColors();

    const handleFocus = () => {
      sheetRef.current?.snapToIndex(1); // 100% ga ko‘tarish
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100); // animatsiya tugashini kutish uchun kichik delay
    };

    return (
      <View>
        <AppCommentInput
          onChangeText={setComment}
          onFocus={handleFocus}
          backColor={Colors.Boxbackground}
          maxLength={400}
          label={"Yuk egasi qanday edi ?"}
          value={comment}
          multiline
          numberOfLines={10}
        />
      </View>
    );
  }
);

const RatingInput = memo(
  ({
    rating,
    setRating,
  }: {
    rating: number;
    setRating: (rating: number) => void;
  }) => {
    const Colors = useThemeColors();

    const handleRating = (num: number) => {
      setRating(num);

      vibration.light();
    };

    const texts: { text: string; color: string }[] = [
      { text: "Baholang", color: Colors.textSecondary },
      { text: "Yomon", color: "#FF4D4F" }, // qizil
      { text: "Qoniqarsiz", color: "#FA8C16" }, // apelsin
      { text: "O‘rtacha", color: "#FFC53D" }, // sariq
      { text: "Yaxshi", color: "#52C41A" }, // yashil
      { text: "A’lo", color: Colors.primary }, // to‘q yashil
    ];

    const AnimatedText = Animated.createAnimatedComponent(AppText);

    return (
      <View style={{ paddingHorizontal: Spacing.horizontal * 2 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          {[1, 2, 3, 4, 5].map((num) => {
            const filled = num <= rating;

            return (
              <Pressable key={num} onPress={() => handleRating(num)}>
                {filled ? (
                  <StarFillIcon size={35} color={Colors.primary} />
                ) : (
                  <StarOutlineIcon size={35} />
                )}
              </Pressable>
            );
          })}
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 20,
            }}
          >
            <AnimatedText
              entering={FadeInUp.duration(200)}
              exiting={FadeOutDown.duration(200)}
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: texts[rating].color,
              }}
            >
              {texts[rating].text}
            </AnimatedText>
          </View>
          <Pressable
            onPress={() => setRating(0)}
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: Colors.borderColor,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 20,
            }}
          >
            <CloseIcon color={rating > 0 ? "red" : Colors.textSecondary} />
          </Pressable>
        </View>
      </View>
    );
  }
);

export default DriverOrder;
