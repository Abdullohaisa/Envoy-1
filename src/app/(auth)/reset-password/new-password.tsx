import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuthHedaer from "@/components/Header/AuthHeader/AuthHedaer";
import { Controller, useForm } from "react-hook-form";
import {
  NewPasswordSchemaType,
  newPasswordSchema,
} from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import AppInput from "@/components/Input/Input";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { newPasswordAtom } from "@/service/new-password/controller";
import { phoneForSmsAtom } from "./phone";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PasswordRequirements from "@/components/PasswordRequirements/PasswordRequirements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RSNewPasswordPage = () => {
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const topInsets = useSafeAreaInsets().top;
  const [state, setNewRequest] = useAtom(newPasswordAtom);
  const phone = useAtomValue(phoneForSmsAtom);
  const formattedPhone = "+998" + phone.replace(/[^0-9]/g, "");
  const Colors = useThemeColors();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const marginTop = useSharedValue(topInsets + 55 + 10);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (state?.detail) {
      scale.value = withSpring(1, { damping: 10 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [state?.detail]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema()),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: NewPasswordSchemaType) => {
    const payload = {
      phone: formattedPhone,
      new_password: data.password,
    };
    setNewRequest(payload);
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
      translateY.value = withTiming(-(topInsets + 55), { duration: 400 }); // tepaga chiqadi
      marginTop.value = withTiming(topInsets + 5, { duration: 400 });
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      translateY.value = withTiming(0, { duration: 400 }); // pastga tushadi
      marginTop.value = withTiming(topInsets + 55 + 10, { duration: 400 });
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
          <AuthHedaer title="Ro'yxatdan o'tish" />
        </Animated.View>
        {!state?.detail ? (
          <Animated.View style={[{ marginTop: 20 }, animatedStyle, formStyle]}>
            <AppText
              style={{
                textAlign: "center",
                fontSize: 22,
                color: Colors.green,
              }}
            >
              Parol muvaffaqiyatli yangilandi
            </AppText>
          </Animated.View>
        ) : (
          <>
            <Animated.View
              style={[
                { flex: 1, paddingHorizontal: screens.width * 0.04 },
                formStyle,
              ]}
            >
              <View style={{ marginTop: 20, flex: 1 }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label={"Yangi parol"}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocus1(true)}
                      onBlur={() => setFocus1(false)}
                      error={errors.password?.message}
                      password={true}
                      focused={focus1}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label={"Yangi parolni qayta kiriting"}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocus2(true)}
                      onBlur={() => setFocus2(false)}
                      error={errors.confirmPassword?.message}
                      password={true}
                      focused={focus2}
                    />
                  )}
                />
                <PasswordRequirements password={passwordValue} />
              </View>

              <KeyboardResponsiveView
                style={{ paddingHorizontal: screens.width * 0.04 }}
              >
                <AppButton
                  text="Yuborish"
                  onPress={handleSubmit(onSubmit)}
                  loading={state.isLoading}
                />
              </KeyboardResponsiveView>
            </Animated.View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RSNewPasswordPage;
