import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import AppInput from "@/components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthRequestLogin } from "@/service/auth/types";
import { useAtom } from "jotai";
import { authAtom } from "@/service/auth/controller";
import Toast from "react-native-toast-message";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";

interface LoginProps {
  onSubmitRef: React.MutableRefObject<() => void>;
}

const Login: React.FC<LoginProps> = ({ onSubmitRef }) => {
  const Colors = useThemeColors();
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginState, setLogin] = useAtom(authAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema()),
    // mode: "onChange", // bu juda muhim!
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    const formattedPhone = "+998" + data.phone.replace(/\D/g, "");
    const payload: AuthRequestLogin = {
      phone: formattedPhone,
      password: data.password,
    };
    setLogin(payload, "login");
  };

  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit);
  }, [handleSubmit]);

  useEffect(() => {
    if (loginState.error?.error) {
      Toast.show({
        type: "error",
        text1: loginState.error?.error,
        position: "top",
        visibilityTime: 3000, // 3 sekund
        autoHide: true,
        topOffset: 50,
      });
    }
  }, [loginState.error]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <AppPhoneInput
            label="Telefon raqam"
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
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
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
        )}
      />
      <AppText
        onPress={() => router.push(AppRoutes.auth.resetPassword.phone)}
        style={{
          textAlign: "right",
          fontSize: 14,
          color: Colors.primary,
          textDecorationLine: "underline",
        }}
      >
        Parol esdan chiqdimi
      </AppText>
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
    paddingHorizontal: screens.width * 0.04,
  },
});
