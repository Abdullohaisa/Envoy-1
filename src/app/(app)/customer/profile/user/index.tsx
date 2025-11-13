import { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  RefreshControl,
  BackHandler,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { AxiosError } from "axios";

// 🔸 Mavzular, tokenlar, yo‘nalishlar
import { useThemeColors } from "@/theme/useThemeColors";
import { Spacing, screens } from "@/shared/token";
import { AppRoutes } from "@/constants/routes";

// 🔸 Komponentlar
import ArrowIcon from "@/assets/icon/arrow";
import AppText from "@/components/Texts/Text";
import FullscreenImage from "@/components/FullScreenImage/FullScreenImage";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import SmsVerificationModal from "@/components/SmsVerificationModal/SmsVerifivationModal";

// 🔸 Profil vidjetlari
import UserHeader from "@/widget/profile/user/UserHeader";
import AvatarSection from "@/widget/profile/user/AvatarSection";
import UserInfoRow from "@/widget/profile/user/UserInfoRow";
import {
  UserCommentRow,
  UserRatingRow,
} from "@/widget/profile/user/UserRatingRow";

// 🔸 Xizmatlar
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import api from "@/axios/axios.config";
import {
  useFetchUserData,
  userDataAtom,
} from "@/service/user/get-user-info/controller";
import { themeAtom } from "@/theme/theme";
import UserBackButton from "@/widget/profile/user/BackButton";

// =====================================================
//                 EditCustomerProfilePage
// =====================================================
const EditCustomerProfilePage = () => {
  const Colors = useThemeColors();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheetModal>(null);
  const userData = useAtomValue(userDataAtom);
  const fetchUserData = useFetchUserData();

  // 🔹 State lar
  const [name, setName] = useState(userData.username);
  const [phone, setPhone] = useState(userData.phone);
  const [originalPhone] = useState(userData.phone);
  const [originalName] = useState(userData.username);
  const [rating] = useState(1);
  const [image, setImage] = useState({
    uri: null,
    fileName: null,
    mimeType: null,
  });
  const [f, setFullImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useAtomValue(themeAtom);

  // =====================================================
  //                     FUNKSIYALAR
  // =====================================================

  // 🔹 Foydalanuvchi ma'lumotlarini saqlash
  const handleSave = async () => {
    setEditMode(false);
    const newData: any = {};

    if (name !== originalName && phone === originalPhone) {
      newData.username = name;
      setIsLoading(true);
      try {
        const { data } = await api.post("/user/update/", newData);
        await fetchUserData();
      } catch (error) {
        if (error instanceof AxiosError) {
        }
      } finally {
        setIsLoading(false);
      }
    } else if (phone !== originalPhone) {
      sheetRef.current?.present();
    }
  };

  // 🔹 Telefon raqamini SMS orqali tasdiqlab saqlash
  const handleSaveNumber = async () => {
    const newData: any = {};

    if (name !== originalName) newData.username = name;
    if (phone !== originalPhone) newData.phone = phone;

    setIsLoading(true);

    try {
      const { data } = await api.post("/user/update/", newData);
      await fetchUserData();
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleSaveImage = async () => {
    if (!image || !image.uri) return;

    const formData = new FormData();

    // ✅ null bo‘lishining oldini olish
    const uri = image.uri;
    const name = image.fileName || "photo.jpg";
    const type = image.mimeType || "image/jpeg";

    // @ts-ignore
    formData.append("image", { uri, name, type });
    setIsLoading(true);
    try {
      const { data } = await api.post("/user/update/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchUserData();
      setImage({ uri: null, fileName: null, mimeType: null });
    } catch (error) {
      if (error instanceof AxiosError) {
      } else {
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSaveImage();
  }, [image?.uri]);

  // 🔹 Yangilash (pull-to-refresh)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  // 🔹 Back tugmasi orqali edit rejimni yopish
  useEffect(() => {
    const onBackPress = () => {
      if (editMode) {
        setEditMode(false);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, [editMode]);

  // 🔹 Animatsion stil (edit rejimda yuqoriga siljitish)
  const animatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(
      editMode ? insets.top + screens.height * 0.083 : 15
    );
    return { marginTop };
  });

  // =====================================================
  //                       RENDER
  // =====================================================
  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      {/* 🔸 Yuqori header */}
      <UserHeader
        handleSave={handleSave}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      {/* 🔸 Orqaga qaytish tugmasi */}
      <UserBackButton />

      {/* 🔸 Asosiy scroll qismi */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            progressBackgroundColor={Colors.Boxbackground}
            progressViewOffset={50}
          />
        }
      >
        {/* 🔹 Avatar qismi */}
        <AvatarSection
          image={image}
          setImage={setImage}
          setFullImage={setFullImage}
          editMode={editMode}
          setEditMode={setEditMode}
          isLoading={isLoading}
        />

        {/* 🔹 Foydalanuvchi ma'lumotlari */}
        <Animated.View
          style={[
            { paddingHorizontal: Spacing.horizontal, gap: 10 },
            animatedStyle,
          ]}
        >
          <UserInfoRow
            type="name"
            label={t("name")}
            value={name}
            onChange={setName}
            editMode={editMode}
          />
          <UserInfoRow
            type="phone"
            label={t("phone")}
            value={phone}
            originalValue={originalPhone}
            onChange={setPhone}
            editMode={editMode}
          />

          {/* 🔹 Telefon tasdiqlash eslatmasi */}
          {editMode && (
            <View
              style={{
                backgroundColor: Colors.Boxbackground,
                justifyContent: "flex-start",
                borderRadius: 20,
                padding: 10,
                elevation: 10,
              }}
            >
              <AppText
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: Colors.textSecondary,
                }}
              >
                {t("phone_verification_required")}
              </AppText>
            </View>
          )}

          {/* 🔹 Reyting va kommentlar */}
          {!editMode && (
            <>
              <UserRatingRow rating={rating} />
              <UserCommentRow
                commentsCount={12}
                onPress={() =>
                  safeNavigate(() =>
                    router.push(AppRoutes.customer.profile.user.comments)
                  )
                }
              />
            </>
          )}
        </Animated.View>
      </ScrollView>

      {/* 🔹 SMS Tasdiqlash oynasi */}
      <CustomBottomSheetModal
        insetsTopEnabled
        ref={sheetRef}
        snapPoints={["100%"]}
        topInset={insets.top}
      >
        <SmsVerificationModal
          onClose={() => sheetRef.current?.dismiss()}
          handleSaveNumber={handleSaveNumber}
        />
      </CustomBottomSheetModal>

      {/* 🔹 To‘liq rasm */}
      {/* {fullImage.uri && (
        <FullscreenImage uri={fullImage} onClose={() => setFullImage(null)} />
      )} */}
    </View>
  );
};

export default EditCustomerProfilePage;
