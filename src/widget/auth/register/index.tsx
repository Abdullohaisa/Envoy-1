import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Spacing, screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import { useForm, Controller } from "react-hook-form";
import { PhoneSchemaType, phoneSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom, useSetAtom } from "jotai";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import AnimatedErrorText from "@/components/Texts/AnimatedErrorText";
import { vibration } from "@/utils/hapticks";
import { RegisterTempValues, registerTempValues } from "./tempValues";
import useCheckRegister from "@/service/check-register/controller";
import { smsAtom } from "@/service/sms/controller";
import { isValidRegAtom } from "@/atoms/reg.login.valid";

export const checkRegLoading = atom<boolean>(false);

const RegisterPhone = ({
  onSubmitRef,
}: {
  onSubmitRef: React.MutableRefObject<() => void>;
}) => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const setTempValue = useSetAtom(registerTempValues);
  const setIsValidAtom = useSetAtom(isValidRegAtom);
  const { checkPhone, cancel, state } = useCheckRegister();
  const setSms = useSetAtom(smsAtom);
  const setLoading = useSetAtom(checkRegLoading);

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

  useEffect(() => {
    setIsValidAtom(isValid);
  }, [isValid]);

  const onSubmit = async (data: PhoneSchemaType) => {
    setTempValue((p: RegisterTempValues) => ({
      ...p,
      phone_email: data.phone,
    }));
    const formattedPhone = "+998" + data.phone.replace(/[^0-9]/g, "");
    cancel();
    const exists = await checkPhone(formattedPhone, { debounceMs: 0 });
    if (exists === false) {
      setSms(formattedPhone);
      router.push(AppRoutes.auth.registerSmsCode);
    } else if (exists === true) {
      vibration.notification.error();
    }
  };

  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit);
  }, [handleSubmit, onSubmit]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  useEffect(() => {
    setLoading(state.isLoading);
  }, [state.isLoading]);

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
    paddingHorizontal: Spacing.horizontal,
  },
});
