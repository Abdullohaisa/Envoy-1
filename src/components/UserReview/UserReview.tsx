import { useThemeColors } from "@/theme/useThemeColors";
import {
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject, memo, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomBottomSheetModal from "../BottomSheets/BottomSheetModal";
import { Pressable, View } from "react-native";
import AppText from "../Texts/Text";
import { Spacing, screens } from "@/shared/token";
import AppButton from "../Buttons/Button";
import StarFillIcon from "@/assets/icon/star-fill";
import StarOutlineIcon from "@/assets/icon/star-outline";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { vibration } from "@/utils/hapticks";
import AppCommentInput from "../Input/CommentInput";
import CloseIcon from "@/assets/icon/close";
import api from "@/axios/axios.config";

const UserReviewSheet = ({
  ref,
  text,
  toUserId,
  handlePress,
}: {
  ref: RefObject<BottomSheetModalMethods | null>;
  text: string;
  toUserId: number;
  handlePress: () => void;
}) => {
  const topInset = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const snapPoints = useMemo(() => ["65%", "100%"], []);
  const scrollRef = useRef<BottomSheetScrollViewMethods | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReview = async () => {
    const postData = {
      rate: rating,
      comment,
      toUser: toUserId,
    };
    try {
      const { data } = await api.post("/preview/", postData);
      console.log(data);
      handlePress();
    } catch (error) {
      console.log(error);
    }
  };

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
            <AppButton
              title="Baholadim"
              variant="secondary"
              onPress={handleReview}
            />
          </View>
        </BottomSheetScrollView>
      </View>
    </CustomBottomSheetModal>
  );
};

export default UserReviewSheet;

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
