import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthHedaer from "@/components/Header/AuthHeader/AuthHedaer";
import { Controller, useForm } from "react-hook-form";
import {
  RegisterSchemaStep2,
  RegisterSchemaType,
  registerSchema,
  registerSchemaStep2,
} from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import AppInput from "@/components/Input/Input";
import { useAtom, useAtomValue } from "jotai";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { authStateAtom } from "@/service/auth/controller";
import { registerTempValues } from "@/widget/auth/register";

const RegisterUserPasswordPage = () => {
  const [focus, setFocus] = useState({
    pass: false,
    confirm: false,
  });
  const translateY = useSharedValue(0);
  const marginTop = useSharedValue(80);
  const [, setRegister] = useAtom(authStateAtom);
  const tempRegisterValue = useAtomValue(registerTempValues);

  console.log(tempRegisterValue);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaStep2>({
    resolver: zodResolver(registerSchemaStep2()),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterSchemaStep2) => {
    const finishingValue = {
      ...tempRegisterValue,
      password: data.password,
    };
  };

  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const formStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value,
    };
  });

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      translateY.value = withTiming(-100, { duration: 400 }); // tepaga chiqadi
      marginTop.value = withTiming(20, { duration: 400 });
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      translateY.value = withTiming(0, { duration: 400 }); // pastga tushadi
      marginTop.value = withTiming(80, { duration: 400 });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            },
            headerStyle,
          ]}
        >
          <AuthHedaer title="Ro'yxatdan o'tish" />
        </Animated.View>

        <Animated.View
          style={[
            {
              flex: 1,
              paddingHorizontal: screens.width * 0.04,
            },
            formStyle,
          ]}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginTop: 20, flex: 1 }}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <AppInput
                    label={"Parol"}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() =>
                      setFocus((prev) => ({ ...prev, pass: true }))
                    }
                    onBlur={() =>
                      setFocus((prev) => ({ ...prev, pass: false }))
                    }
                    error={errors.password?.message}
                    password={true}
                    focused={focus.pass}
                    textContentType="none"
                    autoComplete="off"
                    importantForAutofill="no"
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value, onBlur } }) => (
                  <AppInput
                    label={"Parolni qayta kiriting"}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() =>
                      setFocus((prev) => ({ ...prev, confirm: true }))
                    }
                    onBlur={() =>
                      setFocus((prev) => ({ ...prev, confirm: false }))
                    }
                    error={errors.confirmPassword?.message}
                    password={true}
                    focused={focus.confirm}
                    textContentType="none"
                    autoComplete="off"
                    importantForAutofill="no"
                  />
                )}
              />
            </View>
          </ScrollView>

          <View
            style={{
              paddingHorizontal: screens.width * 0.04,
              marginBottom: 10,
            }}
          >
            <AppButton text="Davom etish" onPress={handleSubmit(onSubmit)} />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterUserPasswordPage;
