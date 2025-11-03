// import { useState, useCallback, useRef, useEffect } from "react";
// import {
//   View,
//   ScrollView,
//   Pressable,
//   RefreshControl,
//   BackHandler,
// } from "react-native";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { Spacing, screens } from "@/shared/token";
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import ArrowIcon from "@/assets/icon/arrow";
// import FullscreenImage from "@/components/FullScreenImage/FullScreenImage";
// import AvatarSection from "@/widget/profile/user/AvatarSection";
// import UserInfoRow from "@/widget/profile/user/UserInfoRow";
// import {
//   UserCommentRow,
//   UserRatingRow,
// } from "@/widget/profile/user/UserRatingRow";
// import UserHeader from "@/widget/profile/user/UserHeader";
// import { safeNavigate } from "@/utils/safe-navigation";
// import { router } from "expo-router";
// import { AppRoutes } from "@/constants/routes";
// import AppText from "@/components/Texts/Text";
// import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import SmsVerificationModal from "@/components/SmsVerificationModal/SmsVerifivationModal";
// import { useAtomValue } from "jotai";
// import { authStateAtom } from "@/service/auth/controller";

// const EditCustomerProfilePage = () => {
//   const Colors = useThemeColors();
//   const [name, setName] = useState("Abdullah");
//   const [phone, setPhone] = useState("+998901234567");
//   const [originalPhone] = useState("+998901234567");
//   const [isPhoneChanged, setIsPhoneChanged] = useState(false);
//   const [rating] = useState(1);
//   const [image, setImage] = useState<string | null>(null);
//   const [fullImage, setFullImage] = useState<string | null>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const insets = useSafeAreaInsets();
//   const sheetRef = useRef<BottomSheetModal>(null);
//   const { data } = useAtomValue(authStateAtom);

//   const animatedStyle = useAnimatedStyle(() => {
//     const marginTop = withTiming(
//       editMode ? insets.top + screens.height * 0.083 : 15
//     );
//     return { marginTop };
//   });

//   const handleSave = () => {
//     setEditMode(false);
//     if (phone !== originalPhone) {
//       setIsPhoneChanged(true);
//       sheetRef.current?.present();
//     } else {
//       setIsPhoneChanged(false);
//     }
//   };

//   // 🔹 Refresh funksiyasi
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1200);
//   }, []);

//   useEffect(() => {
//     const onBackPress = () => {
//       if (editMode) {
//         setEditMode(false);
//         return true;
//       }
//       return false;
//     };
//     const subscration = BackHandler.addEventListener(
//       "hardwareBackPress",
//       onBackPress
//     );

//     return () => subscration.remove();
//   }, [editMode]);

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
//       <UserHeader handleSave={handleSave} editMode={editMode} />

//       <Pressable
//         onPress={() => router.back()}
//         style={{
//           position: "absolute",
//           top: 11 + insets.top,
//           left: 5,
//           padding: 10,
//           zIndex: 10,
//         }}
//       >
//         <ArrowIcon color={Colors.textSecondary} />
//       </Pressable>

//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{ paddingBottom: 40 }}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor={Colors.primary} // iOS uchun
//             colors={[Colors.primary]} // Android uchun
//             progressBackgroundColor={Colors.Boxbackground}
//             progressViewOffset={50} // 👈 indikatorni pastroqqa tushiradi
//           />
//         }
//       >
//         <AvatarSection
//           image={image}
//           setImage={setImage}
//           setFullImage={setFullImage}
//           editMode={editMode}
//           setEditMode={setEditMode}
//         />

//         <Animated.View
//           style={[
//             {
//               paddingHorizontal: Spacing.horizontal,
//               gap: 10,
//             },
//             animatedStyle,
//           ]}
//         >
//           <UserInfoRow
//             type={"name"}
//             label="Ism"
//             value={name}
//             onChange={setName}
//             editMode={editMode}
//           />
//           <UserInfoRow
//             label="Telefon"
//             value={phone}
//             originalValue={originalPhone}
//             onChange={setPhone}
//             onChangeDetected={setIsPhoneChanged} // 👈 shu orqali tashqaridan bilib olamiz
//             editMode={editMode}
//             type="phone"
//           />

//           {editMode && (
//             <View
//               style={[
//                 {
//                   backgroundColor: Colors.Boxbackground,
//                   justifyContent: "flex-start",
//                   borderRadius: 20,
//                   padding: 10,
//                   elevation: 10,
//                 },
//               ]}
//             >
//               <AppText
//                 style={{
//                   textAlign: "center",
//                   fontSize: 14,
//                   color: Colors.textSecondary,
//                 }}
//               >
//                 Telefon raqamingizni o‘zgartirish uchun SMS orqali tasdiqlash
//                 talab qilinadi.
//               </AppText>
//             </View>
//           )}

//           {!editMode && (
//             <>
//               <UserRatingRow rating={rating} />
//               <UserCommentRow
//                 commentsCount={12}
//                 onPress={() =>
//                   safeNavigate(() =>
//                     data.role === "Customer"
//                       ? router.push(AppRoutes.customer.profile.user.comments)
//                       : router.push(AppRoutes.driver.profile.user.comments)
//                   )
//                 }
//               />
//             </>
//           )}
//         </Animated.View>
//       </ScrollView>

//       <CustomBottomSheetModal
//         insetsTopEnabled
//         ref={sheetRef}
//         snapPoints={["100%"]}
//         topInset={insets.top}
//       >
//         <SmsVerificationModal onClose={() => sheetRef.current?.dismiss()} />
//       </CustomBottomSheetModal>

//       {fullImage && (
//         <FullscreenImage uri={fullImage} onClose={() => setFullImage(null)} />
//       )}
//     </View>
//   );
// };

// export default EditCustomerProfilePage;

import { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  RefreshControl,
  BackHandler,
} from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { Spacing, screens } from "@/shared/token";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowIcon from "@/assets/icon/arrow";
import FullscreenImage from "@/components/FullScreenImage/FullScreenImage";
import AvatarSection from "@/widget/profile/user/AvatarSection";
import UserInfoRow from "@/widget/profile/user/UserInfoRow";
import {
  UserCommentRow,
  UserRatingRow,
} from "@/widget/profile/user/UserRatingRow";
import UserHeader from "@/widget/profile/user/UserHeader";
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import AppText from "@/components/Texts/Text";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SmsVerificationModal from "@/components/SmsVerificationModal/SmsVerifivationModal";
import { useTranslation } from "react-i18next";

const EditCustomerProfilePage = () => {
  const Colors = useThemeColors();
  const [name, setName] = useState("Abdullah");
  const [phone, setPhone] = useState("+998901234567");
  const [originalPhone] = useState("+998901234567");
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);
  const [rating] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheetModal>(null);

  const animatedStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(
      editMode ? insets.top + screens.height * 0.083 : 15
    );
    return { marginTop };
  });

  const handleSave = () => {
    setEditMode(false);
    if (phone !== originalPhone) {
      setIsPhoneChanged(true);
      sheetRef.current?.present();
    } else {
      setIsPhoneChanged(false);
    }
  };

  // 🔹 Refresh funksiyasi
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (editMode) {
        setEditMode(false);
        return true;
      }
      return false;
    };
    const subscration = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscration.remove();
  }, [editMode]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <UserHeader handleSave={handleSave} editMode={editMode} />

      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 11 + insets.top,
          left: 5,
          padding: 10,
          zIndex: 10,
        }}
      >
        <ArrowIcon color={Colors.textSecondary} />
      </Pressable>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary} // iOS uchun
            colors={[Colors.primary]} // Android uchun
            progressBackgroundColor={Colors.Boxbackground}
            progressViewOffset={50} // 👈 indikatorni pastroqqa tushiradi
          />
        }
      >
        <AvatarSection
          image={image}
          setImage={setImage}
          setFullImage={setFullImage}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <Animated.View
          style={[
            {
              paddingHorizontal: Spacing.horizontal,
              gap: 10,
            },
            animatedStyle,
          ]}
        >
          <UserInfoRow
            type={"name"}
            label={t("name")}
            value={name}
            onChange={setName}
            editMode={editMode}
          />
          <UserInfoRow
            label={t("phone")}
            value={phone}
            originalValue={originalPhone}
            onChange={setPhone}
            onChangeDetected={setIsPhoneChanged} // 👈 shu orqali tashqaridan bilib olamiz
            editMode={editMode}
            type="phone"
          />

          {editMode && (
            <View
              style={[
                {
                  backgroundColor: Colors.Boxbackground,
                  justifyContent: "flex-start",
                  borderRadius: 20,
                  padding: 10,
                  elevation: 10,
                },
              ]}
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

      <CustomBottomSheetModal
        insetsTopEnabled
        ref={sheetRef}
        snapPoints={["100%"]}
        topInset={insets.top}
      >
        <SmsVerificationModal onClose={() => sheetRef.current?.dismiss()} />
      </CustomBottomSheetModal>

      {fullImage && (
        <FullscreenImage uri={fullImage} onClose={() => setFullImage(null)} />
      )}
    </View>
  );
};

export default EditCustomerProfilePage;
