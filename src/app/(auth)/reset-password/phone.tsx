import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import { PhoneSchemaType, phoneSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import AppPhoneInput from "@/components/Input/PhoneInput";
import { Spacing, screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import { atom, useAtom, useSetAtom } from "jotai";
import { vibration } from "@/utils/hapticks";
import AnimatedErrorText from "@/components/Texts/AnimatedErrorText";
import useCheckRegister from "@/service/user/check-register/controller";
import { smsAtom } from "@/service/user/sms/controller";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { safeNavigate } from "@/utils/safe-navigation";

export const phoneForSmsAtom = atom("");

const ResetPasswordPhonePage = () => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const setPhone = useSetAtom(phoneForSmsAtom);
  const { checkPhone, cancel, state } = useCheckRegister();
  const setSms = useSetAtom(smsAtom);

  const {
    control,
    handleSubmit,

    formState: { errors, isValid, isReady },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema()),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: PhoneSchemaType) => {
    setPhone(data.phone);
    const formattedPhone = "+998" + data.phone.replace(/[^0-9]/g, "");
    cancel();

    const exists = await checkPhone(formattedPhone, { debounceMs: 0 });

    if (exists === true) {
      safeNavigate(() => router.push(AppRoutes.auth.resetPassword.smsCode));
      setSms(formattedPhone);
    } else if (exists === false) {
      vibration.notification.error();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Parolni tiklash" />
        <View style={{ flex: 1, paddingHorizontal: Spacing.horizontal }}>
          <View style={{ marginTop: 20, flex: 1 }}>
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
                state.status === false
                  ? "Bu telefon raqam ro'yxatdan o'tmagan"
                  : ""
              }
            />
          </View>
          <KeyboardResponsiveView
            style={{ paddingHorizontal: Spacing.horizontal }}
          >
            <AppButton
              text="Yuborish"
              onPress={handleSubmit(onSubmit)}
              isLoading={state.isLoading}
              disabled={!isValid}
            />
          </KeyboardResponsiveView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPasswordPhonePage;

const styles = StyleSheet.create({});
