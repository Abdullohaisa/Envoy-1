import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import AppInput from "@/components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    const formattedPhone = "+998" + data.phone.replace(/[^0-9]/g, "");
    const payload = {
      phone: formattedPhone,
      password: data.password,
    };
  };

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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: screens.width,
    height: screens.height,
    flex: 1,
    paddingTop: 30,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});
