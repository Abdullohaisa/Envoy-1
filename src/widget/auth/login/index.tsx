import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Spacing, screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import AppInput from "@/components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import {
  PhoneLoginSchemaType,
  phoneLoginSchema,
} from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { authAtom } from "@/service/auth/controller";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import AnimatedErrorText from "@/components/Texts/AnimatedErrorText";
import { isValidLoginAtom } from "@/atoms/reg.login.valid";

interface LoginProps {
  onSubmitRef: React.MutableRefObject<() => void>;
}

const Login: React.FC<LoginProps> = ({ onSubmitRef }) => {
  const Colors = useThemeColors();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginState, setLogin] = useAtom(authAtom);
  const setIsValidAtom = useSetAtom(isValidLoginAtom);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneLoginSchemaType>({
    resolver: zodResolver(phoneLoginSchema),
  });

  useEffect(() => {
    setIsValidAtom(isValid);
  }, [isValid]);

  const onSubmit = (data: PhoneLoginSchemaType) => {
    const payload = {
      phone_email: "+998" + data.phone.replace(/[^0-9]/g, ""),
      password: data.password,
    };

    console.log(payload);
    setLogin(payload, "login");
  };

  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit);
  }, [handleSubmit]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              width: screens.width,
              paddingHorizontal: Spacing.horizontal,
              overflow: "visible",
            }}
          >
            <AppPhoneInput
              label="Telefon raqam"
              value={value}
              onChangeText={onChange}
              onClear={() => onChange("")}
              error={errors?.phone?.message || ""}
              mask="99 999-99-99"
              keyboardType="number-pad"
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              width: screens.width,
              paddingHorizontal: Spacing.horizontal,
            }}
          >
            <AppInput
              label="Parol"
              value={value}
              onChangeText={onChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              error={errors.password?.message}
              password={true}
              focused={passwordFocused}
            />
          </View>
        )}
      />
      <AppText
        onPress={() => router.push(AppRoutes.auth.resetPassword.phone)}
        style={{
          textAlign: "right",
          fontSize: 14,
          color: Colors.primary,
          paddingHorizontal: screens.width * 0.04,
          backgroundColor: Colors.Boxbackground,
          padding: 3,
          alignSelf: "flex-end",
          borderRadius: 10,
          borderTopRightRadius: 3,
          borderBottomRightRadius: 3,
          marginRight: 3,
        }}
      >
        Parol esdan chiqdimi
      </AppText>
      <AnimatedErrorText
        error={loginState.error?.error}
        style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: screens.width,
    height: screens.height,
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
});

// import { ScrollView, StyleSheet, View } from "react-native";
// import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
// import { screens } from "@/shared/token";
// import AppPhoneInput from "@/components/Input/PhoneInput";
// import AppInput from "@/components/Input/Input";
// import { useForm, Controller } from "react-hook-form";
// import {
//   EmailLoginSchemaType,
//   PhoneLoginSchemaType,
//   emailLoginSchema,
//   phoneLoginSchema,
// } from "@/shared/validation.scheme";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AuthRequestLogin } from "@/service/auth/types";
// import { useAtom, useAtomValue, useSetAtom } from "jotai";
// import { authAtom } from "@/service/auth/controller";
// import Toast from "react-native-toast-message";
// import AppText from "@/components/Texts/Text";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { router } from "expo-router";
// import { AppRoutes } from "@/constants/routes";
// import { vibration } from "@/utils/hapticks";
// import AnimatedErrorText from "@/components/Texts/AnimatedErrorText";
// import { isValidLoginAtom } from "@/app/(auth)/auth";

// interface LoginProps {
//   onSubmitRef: React.MutableRefObject<() => void>;
// }

// const Login: React.FC<LoginProps> = ({ onSubmitRef }) => {
//   const Colors = useThemeColors();
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [loginState, setLogin] = useAtom(authAtom);
//   const [isEmailLogin, setIsEmailLogin] = useState(false);
//   const scrollRef = useRef<ScrollView>(null);
//   const schema = isEmailLogin ? emailLoginSchema : phoneLoginSchema;
//   const setIsValidAtom = useSetAtom(isValidLoginAtom);

//   const {
//     control,
//     handleSubmit,
//     clearErrors,
//     reset,
//     formState: { errors, isValid },
//   } = useForm<PhoneLoginSchemaType>({
//     resolver: zodResolver(phoneLoginSchema),
//   });

//   useEffect(() => {
//     setIsValidAtom(isValid);
//   }, [isValid]);

//   console.log("login ", isValid);

//   const onSubmit = (data: PhoneLoginSchemaType) => {
//     // const formattedPhone = "+998" + phone_email.replace(/[^0-9]/g, "");
//     const payload = {
//       phone_email:
//         //  isEmailLogin
//         // ? (data as EmailLoginSchemaType).email + ""
//         // :
//         "+998" + data.phone.replace(/[^0-9]/g, ""),
//       password: data.password,
//     };

//     console.log(payload);
//     setLogin(payload, "login");
//   };

//   useEffect(() => {
//     onSubmitRef.current = handleSubmit(onSubmit);
//   }, [handleSubmit]);

//   // useEffect(() => {
//   //   if (loginState.error?.error) {
//   //     Toast.show({
//   //       type: "error",
//   //       text1: "Telefon raqam yoki parol noto'gri",
//   //       position: "top",
//   //       visibilityTime: 3000, // 3 sekund
//   //       autoHide: true,
//   //       topOffset: 50,
//   //     });
//   //   }
//   // }, [loginState.error]);

//   // const toggleLoginType = () => {
//   //   vibration.selection();
//   //   clearErrors(); // Errorlarni tozalaydi
//   //   reset({
//   //     phone: "",
//   //     email: "",
//   //     password: "",
//   //   }); // formani tozalaydi
//   //   setIsEmailLogin((prev) => {
//   //     const nextPage = !prev ? 1 : 0;
//   //     scrollRef.current?.scrollTo({
//   //       x: nextPage * screens.width,
//   //       animated: true,
//   //     });
//   //     return !prev;
//   //   });
//   //   clearErrors(); // barcha errorlarni tozalaydi
//   //   // resetField(""); // inputni ham tozalab yuboradi (optional)
//   // };

//   // const onScrollEnd = (event: any) => {
//   //   const x = event.nativeEvent.contentOffset.x;
//   //   setIsEmailLogin(x >= screens.width / 2); // avtomatik holatni yangilash
//   //   vibration.light();
//   // };

//   return (
//     <View style={styles.container}>
//       {/* <ScrollView
//         ref={scrollRef}
//         horizontal
//         nestedScrollEnabled
//         pagingEnabled
//         scrollEnabled={false} // foydalanuvchi o‘zi scroll qilmasligi uchun
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={onScrollEnd}
//         style={{
//           width: screens.width,
//           flexGrow: 0,
//           overflow: "visible",
//         }}
//       > */}
//       <Controller
//         control={control}
//         name="phone"
//         render={({ field: { onChange, value } }) => (
//           <View
//             style={{
//               width: screens.width,
//               paddingHorizontal: screens.width * 0.04,
//               overflow: "visible",
//             }}
//           >
//             <AppPhoneInput
//               label="Telefon raqam"
//               value={value}
//               onChangeText={onChange}
//               onClear={() => onChange("")}
//               error={errors?.phone?.message || ""}
//               mask="99 999-99-99"
//               keyboardType="number-pad"
//             />
//           </View>
//         )}
//       />

//       {/* <Controller
//           control={control}
//           name="email"
//           render={({ field: { onChange, value } }) => (
//             <View
//               style={{
//                 width: screens.width,
//                 paddingHorizontal: screens.width * 0.04,
//               }}
//             >
//               <AppInput
//                 label="Email"
//                 value={value}
//                 onChangeText={onChange}
//                 error={isEmailLogin ? errors?.email?.message : ""}
//                 keyboardType="email-address"
//               />
//             </View>
//           )}
//         /> */}
//       {/* </ScrollView> */}

//       <Controller
//         control={control}
//         name="password"
//         render={({ field: { onChange, value } }) => (
//           <View
//             style={{
//               width: screens.width,
//               paddingHorizontal: screens.width * 0.04,
//             }}
//           >
//             <AppInput
//               label="Parol"
//               value={value}
//               onChangeText={onChange}
//               onFocus={() => setPasswordFocused(true)}
//               onBlur={() => setPasswordFocused(false)}
//               error={errors.password?.message}
//               password={true}
//               focused={passwordFocused}
//             />
//           </View>
//         )}
//       />
//       <AppText
//         onPress={() => router.push(AppRoutes.auth.resetPassword.phone)}
//         style={{
//           textAlign: "right",
//           fontSize: 14,
//           color: Colors.primary,
//           // textDecorationLine: "underline",
//           paddingHorizontal: screens.width * 0.04,
//           backgroundColor: Colors.Boxbackground,
//           padding: 3,
//           alignSelf: "flex-end",
//           borderRadius: 10,
//           borderTopRightRadius: 3,
//           borderBottomRightRadius: 3,
//           marginRight: 3,
//         }}
//       >
//         Parol esdan chiqdimi
//       </AppText>
//       <AnimatedErrorText
//         error={loginState.error?.error}
//         style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}
//       />
//       {/* <AppText
//         onPress={toggleLoginType}
//         style={{
//           top: screens.height * 0.65,
//           textAlign: "center",
//           color: Colors.primary,
//           backgroundColor: Colors.Boxbackground,
//           alignSelf: "center",
//           paddingVertical: 10,
//           paddingHorizontal: 20,
//           borderRadius: 20,
//           position: "absolute",
//         }}
//       >
//         {isEmailLogin
//           ? "📞 Telefon raqam orqali kirish"
//           : "@ Email orqali kirish"}
//       </AppText> */}
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     width: screens.width,
//     height: screens.height,
//     flex: 1,
//     paddingTop: 20,
//     justifyContent: "flex-start",
//   },
// });
