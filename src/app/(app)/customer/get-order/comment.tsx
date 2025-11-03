// import {
//   Keyboard,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   View,
//   TextInput,
// } from "react-native";
// import React, { useRef } from "react";
// import PageHeader from "@/components/Header/PageHeader/PageHeader";
// import { Controller, useForm } from "react-hook-form";
// import AppInputWithUnit from "@/components/Input/InputWithUnit";
// import AppText from "@/components/Texts/Text";
// import { Spacing } from "@/shared/token";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { CommentSchema } from "@/shared/validation/get-order/comment-schema";
// import GetOrderNextButton from "@/widget/customer/get-order/next-button";
// import { useAtomValue, useSetAtom } from "jotai";
// import { getOrderComment } from "@/atoms/get-order/comment";
// import { themeAtom } from "@/theme/theme";

// const MAX_LENGTH = 400;

// const CommentForm = () => {
//   const Colors = useThemeColors();
//   const setComment = useSetAtom(getOrderComment);
//   const inputRef = useRef<TextInput>(null);
//   const theme = useAtomValue(themeAtom);
//   const commentValueAtom = useAtomValue(getOrderComment);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<CommentSchema>({
//     defaultValues: {
//       comment: commentValueAtom || "",
//     },
//   });

//   const onSubmit = (data: any) => {
//     setComment(data);
//   };

//   const commentValue = watch("comment") || "";

//   const inputBackColor = Colors.pageBackground;
//   const darkModeInputStyle =
//     theme === "dark"
//       ? {
//           elevation: 0,
//           backgroundColor: inputBackColor,
//           borderWidth: 1,
//           minHeight: 250,
//           justifyContent: "flex-start",
//           alignItems: "flex-start",
//           paddingVertical: 10,
//         }
//       : {
//           minHeight: 250,
//           justifyContent: "flex-start",
//           alignItems: "flex-start",
//           paddingVertical: 10,
//         };

//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <View style={{ flex: 1 }}>
//         <PageHeader title="Izoh" enableBack />
//         <View style={{ padding: 16, height: 270 }}>
//           <Controller
//             control={control}
//             name="comment"
//             render={({ field: { onChange, value } }) => (
//               <AppInputWithUnit
//                 maxLength={400}
//                 label="Qo'shimcha ma'lumot kiriting"
//                 value={value}
//                 onChangeText={(text) => {
//                   onChange(text); // react-hook-form uchun
//                   setValue("comment", text); // state update
//                   setComment(text); // 🟢 Har yozishda atomga saqlaydi
//                   // inputRef.current?.setNativeProps({ text }); // inputga ko‘rsatish
//                 }}
//                 type="comment"
//                 selectedUnit="" // commentda birlik yo‘q
//                 onUnitChange={() => {}} // commentda birlik o‘zgarmaydi
//                 keyboardType="default"
//                 multiline={true} // 🔹 ko‘p qatorli
//                 numberOfLines={10} // 🔹 boshlang‘ich 6 qator balandlik
//                 ref={inputRef}
//                 styleView={darkModeInputStyle}
//                 styleInput={{
//                   textAlignVertical: "top",
//                   minHeight: "100%",
//                 }} // 🔹 yozuv yuqoridan boshlanishi
//               />
//             )}
//           />
//         </View>
//         <View
//           style={{
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             paddingHorizontal: Spacing.horizontal + 10,
//             flexDirection: "row",
//           }}
//         >
//           <AppText
//             onPress={() => {
//               if (commentValue?.length > 0) {
//                 setValue("comment", ""); // forma ichidagi qiymatni tozalaydi
//                 setComment(""); // atomni ham tozalaydi
//               }
//             }}
//             style={{
//               color:
//                 commentValue?.length > 0
//                   ? "red" // qizil (agar danger mavjud bo‘lsa undan oladi)
//                   : Colors.textSecondary, // kulrang
//               fontWeight: "400",
//             }}
//           >
//             Tozalash
//           </AppText>
//           <AppText
//             style={{
//               color:
//                 commentValue?.length > 0
//                   ? Colors.primary
//                   : Colors.textSecondary,
//             }}
//           >
//             {commentValue?.length} / {MAX_LENGTH}
//           </AppText>
//         </View>
//         <View
//           style={{
//             alignItems: "flex-end",
//             paddingHorizontal: Spacing.horizontal,
//             marginTop: 10,
//           }}
//         >
//           <GetOrderNextButton
//             title="Asosoy sahifa"
//             onPress={handleSubmit(onSubmit)}
//           />
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default CommentForm;

// const styles = StyleSheet.create({});

import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useRef } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import AppText from "@/components/Texts/Text";
import { Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { useAtomValue, useSetAtom } from "jotai";
import { getOrderComment } from "@/atoms/get-order/comment";
import { themeAtom } from "@/theme/theme";
import { useRouter } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";

const MAX_LENGTH = 400;

const CommentForm = () => {
  const Colors = useThemeColors();
  const setComment = useSetAtom(getOrderComment);
  const savedComment = useAtomValue(getOrderComment);
  const inputRef = useRef<TextInput>(null);
  const theme = useAtomValue(themeAtom);
  const router = useRouter();

  const { control, watch, setValue } = useForm({
    defaultValues: {
      comment: savedComment || "",
    },
  });

  const commentValue = watch("comment") || "";

  // 🔹 Har yozganda atomga 400 ms kechikish bilan saqlaydi
  useEffect(() => {
    const timeout = setTimeout(() => {
      setComment(commentValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [commentValue]);

  const inputBackColor = Colors.pageBackground;
  const darkModeInputStyle =
    theme === "dark"
      ? {
          elevation: 0,
          backgroundColor: inputBackColor,
          borderWidth: 1,
          minHeight: 250,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingVertical: 10,
        }
      : {
          minHeight: 250,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingVertical: 10,
        };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader
          title="Izoh"
          enableBack
          routePath={AppRoutes.customer.getOrder.index}
        />

        <View style={{ padding: 16, height: 270 }}>
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <AppInputWithUnit
                maxLength={MAX_LENGTH}
                label="Qo'shimcha ma'lumot kiriting"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setValue("comment", text);
                }}
                type="comment"
                selectedUnit=""
                onUnitChange={() => {}}
                keyboardType="default"
                multiline
                numberOfLines={10}
                ref={inputRef}
                styleView={darkModeInputStyle}
                styleInput={{
                  textAlignVertical: "top",
                  minHeight: "100%",
                }}
              />
            )}
          />
        </View>

        {/* Tozalash va hisobchi qismi */}
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: Spacing.horizontal + 10,
            flexDirection: "row",
          }}
        >
          <AppText
            onPress={() => {
              if (commentValue.length > 0) {
                setValue("comment", "");
                setComment("");
              }
            }}
            style={{
              color: commentValue.length > 0 ? "red" : Colors.textSecondary,
              fontWeight: "400",
            }}
          >
            Tozalash
          </AppText>

          <AppText
            style={{
              color:
                commentValue.length > 0 ? Colors.primary : Colors.textSecondary,
            }}
          >
            {commentValue.length} / {MAX_LENGTH}
          </AppText>
        </View>

        {/* Tugma */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: Spacing.horizontal,
            marginTop: 10,
          }}
        >
          <GetOrderBackButton
            title="Vaqt"
            onPress={() =>
              safeNavigate(() => router.push(AppRoutes.customer.getOrder.time))
            }
          />
          <GetOrderNextButton
            title="Asosiy sahifa"
            onPress={() =>
              safeNavigate(() => router.push(AppRoutes.customer.getOrder.index))
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentForm;

const styles = StyleSheet.create({});
