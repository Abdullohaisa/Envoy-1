import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import { useForm, Controller } from "react-hook-form";
import { PhoneSchemaType, phoneSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useSetAtom } from "jotai";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";

export interface RegisterTempValues {
  username: string;
  phone: string;
  user_image: null;
  role: string;
}

export const registerTempValues = atom<RegisterTempValues>({
  username: "",
  phone: "",
  user_image: null,
  role: "",
});

const RegisterPhone = ({
  onSubmitRef,
}: {
  onSubmitRef: React.MutableRefObject<() => void>;
}) => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const setTempValue = useSetAtom(registerTempValues);

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
    setTempValue((p: RegisterTempValues) => ({
      ...p,
      phone: data.phone,
    }));
    router.push(AppRoutes.auth.registerSmsCode);
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
