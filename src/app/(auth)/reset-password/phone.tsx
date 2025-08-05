import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import AuthHedaer from "@/components/Header/AuthHeader/AuthHedaer";
import { Controller, useForm } from "react-hook-form";
import { PhoneSchemaType, phoneSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import AppPhoneInput from "@/components/Input/PhoneInput";
import { screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { atom, useSetAtom } from "jotai";

export const phoneForSmsAtom = atom("");

const ResetPasswordPhonePage = () => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const setPhone = useSetAtom(phoneForSmsAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema()),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (data: PhoneSchemaType) => {
    setPhone(data.phone);
    router.push(AppRoutes.auth.resetPassword.smsCode);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <AuthHedaer title="Parolni tiklash" />
        <View style={{ flex: 1, paddingHorizontal: screens.width * 0.04 }}>
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
          </View>
          <KeyboardResponsiveView
            style={{ paddingHorizontal: screens.width * 0.04 }}
          >
            <AppButton text="Yuborish" onPress={handleSubmit(onSubmit)} />
          </KeyboardResponsiveView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPasswordPhonePage;

const styles = StyleSheet.create({});
