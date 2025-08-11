import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import { useForm, Controller } from "react-hook-form";
import { PhoneSchemaType, phoneSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import AnimatedErrorText from "@/components/Texts/AnimatedErrorText";
import { vibration } from "@/utils/hapticks";
import { RegisterTempValues, registerTempValues } from "./tempValues";
import useCheckRegister from "@/service/check-register/controller";
import { smsAtom } from "@/service/sms/controller";
import { isValidRegAtom } from "@/app/(auth)/auth";

const RegisterPhone = ({
  onSubmitRef,
}: {
  onSubmitRef: React.MutableRefObject<() => void>;
}) => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const setTempValue = useSetAtom(registerTempValues);
  const setIsValidAtom = useSetAtom(isValidRegAtom);

  // useCheckRegister hook
  const { checkPhone, cancel, state } = useCheckRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema()),
    defaultValues: {
      phone: "",
    },
  });

  console.log("reg ", isValid);

  useEffect(() => {
    setIsValidAtom(isValid);
  }, [isValid]);

  const onSubmit = async (data: PhoneSchemaType) => {
    // register tempga telefonni saqlaymiz
    setTempValue((p: RegisterTempValues) => ({
      ...p,
      phone_email: data.phone,
    }));

    const formattedPhone = "+998" + data.phone.replace(/[^0-9]/g, "");

    // Agar oldingi so‘rov bor bo‘lsa bekor qilish (hook ichidagi cancel)
    cancel();

    // Tekshirish: submit orqali odatda debounce=0 ishlatamiz (instant)
    const exists = await checkPhone(formattedPhone, { debounceMs: 0 });

    // checkPhone resolvedidan keyin state ham yangilanadi, lekin biz natijani ham oldik
    if (exists === false) {
      // ro'yxatdan o'tmagan — SMS kod sahifasiga o'tamiz
      router.push(AppRoutes.auth.registerSmsCode);
    } else if (exists === true) {
      // ro'yxatdan o'tgan — foydalanuvchiga signal beramiz
      vibration.notification.error();
    } else {
      // exists === null (xato yoki bekor qilingan) — kerak bo'lsa xabar ko'rsatish
      // state.error dan foydalanish mumkin
    }
  };

  // Parent komponentdan formni submit qilish uchun referenceni set qilamiz
  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit);
  }, [handleSubmit, onSubmit]);

  // Komponent unmount bo'lganda ishlayotgan so'rovni bekor qilamiz
  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <AppPhoneInput
            label={"Telefon raqam"}
            value={value}
            onChangeText={onChange}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            error={errors.phone?.message}
            keyboardType="number-pad"
            mask="99 999-99-99"
            focused={phoneFocused}
          />
        )}
      />

      <AnimatedErrorText
        style={{ textAlign: "center", fontSize: 16 }}
        error={
          state.status === true
            ? "Bu telefon raqam oldin ro'yxatdan o'tgan"
            : (state.error ?? "")
        }
      />
    </View>
  );
};

export default RegisterPhone;

const styles = StyleSheet.create({
  container: {
    width: screens.width,
    height: screens.height,
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    paddingHorizontal: screens.width * 0.04,
  },
});
