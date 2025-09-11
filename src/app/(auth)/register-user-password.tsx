import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import {
  RegisterSchemaStep2,
  registerSchemaStep2,
} from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spacing, screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import AppInput from "@/components/Input/Input";
import { useAtom, useAtomValue } from "jotai";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { authAtom, authStateAtom } from "@/service/auth/controller";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import { registerTempValues } from "@/widget/auth/register/tempValues";
import PasswordRequirements from "@/components/PasswordRequirements/PasswordRequirements";

const RegisterUserPasswordPage = () => {
  const [focus, setFocus] = useState({
    pass: false,
    confirm: false,
  });
  const translateY = useSharedValue(0);
  const marginTop = useSharedValue(80);
  const [state, setRegister] = useAtom(authAtom);
  const tempRegisterValue = useAtomValue(registerTempValues);

  const {
    control,
    handleSubmit,
    watch,
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
    setRegister(finishingValue, "register");
    console.log(finishingValue);
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

  const passwordValue = watch("password");

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
          <PageHeader title="Ro'yxatdan o'tish" />
        </Animated.View>

        <Animated.View
          style={[
            {
              flex: 1,
              paddingHorizontal: Spacing.horizontal,
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
              <PasswordRequirements password={passwordValue} />
            </View>
          </ScrollView>

          <KeyboardResponsiveView
            style={{ paddingHorizontal: Spacing.horizontal }}
          >
            <AppButton
              text="Davom etish"
              onPress={handleSubmit(onSubmit)}
              loading={state.isLoading}
            />
          </KeyboardResponsiveView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterUserPasswordPage;
