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
import {
  authAtom,
  authStateAtom,
  authTempStateAtom,
} from "@/service/auth/controller";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import AnimatedErrorText from "@/components/Texts/AnimatedErrorText";
import { isValidLoginAtom } from "@/atoms/reg.login.valid";
import { safeNavigate } from "@/utils/safe-navigation";

interface LoginProps {
  onSubmitRef: React.MutableRefObject<() => void>;
}

const Login: React.FC<LoginProps> = ({ onSubmitRef }) => {
  const Colors = useThemeColors();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginState, setLogin] = useAtom(authStateAtom);
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
      phone: "+998" + data.phone.replace(/[^0-9]/g, ""),
      password: data.password,
    };

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
        onPress={() =>
          safeNavigate(() => router.push(AppRoutes.auth.resetPassword.phone))
        }
        style={{
          fontSize: 14,
          color: Colors.primary,
          marginHorizontal: Spacing.horizontal,
          marginTop: Spacing.horizontal,
          alignSelf: "flex-end",
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
