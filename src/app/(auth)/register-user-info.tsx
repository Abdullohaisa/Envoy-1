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
  RegisterSchemaStep1,
  RegisterSchemaType,
  registerSchema,
  registerSchemaStep1,
} from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { screens } from "@/shared/token";
import AppButton from "@/components/Buttons/Button";
import AppInput from "@/components/Input/Input";
import { phoneForSmsAtom } from "./reset-password/phone";
import ChangeRoleButton from "@/widget/auth/register/changeRoleButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AppPhoneInput from "@/components/Input/PhoneInput";
import KeyboardResponsiveView from "@/components/KeyboardResponsiveView/KeyboardResponsiveView";
import { RegisterTempValues, registerTempValues } from "@/widget/auth/register";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RegisterUserInfoPage = () => {
  const topinsets = useSafeAreaInsets().top;
  const [focus, setFocus] = useState({
    name: false,
    phone: false,
  });

  const [tempValue, setTempValue] = useAtom(registerTempValues);
  const formattedPhone = "+998" + tempValue.phone.replace(/[^0-9]/g, "");
  const [role, setRole] = useState<"Customer" | "Driver">("Customer");
  const translateY = useSharedValue(0);
  const marginTop = useSharedValue(topinsets + 55 + 10);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaStep1>({
    resolver: zodResolver(registerSchemaStep1()),
    defaultValues: {
      name: "",
      phone: tempValue.phone,
    },
  });

  const onSubmit = (data: RegisterSchemaStep1) => {
    setTempValue((p: RegisterTempValues) => ({
      ...p,
      username: data.name,
      phone: formattedPhone,
      user_image: null,
      role: role,
    }));
    router.push(AppRoutes.auth.registerUserPassword);
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
      translateY.value = withTiming(-(topinsets + 55), { duration: 400 }); // tepaga chiqadi
      marginTop.value = withTiming(topinsets + 5, { duration: 400 });
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      translateY.value = withTiming(0, { duration: 400 }); // pastga tushadi
      marginTop.value = withTiming(topinsets + 55 + 10, { duration: 400 });
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
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <AppPhoneInput
                    label={"Telefon raqam"}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() =>
                      setFocus((prev) => ({ ...prev, phone: true }))
                    }
                    onBlur={() =>
                      setFocus((prev) => ({ ...prev, phone: false }))
                    }
                    error={errors.phone?.message}
                    keyboardType="number-pad"
                    mask="99 999-99-99"
                    focused={focus.phone}
                  />
                )}
              />
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value, onBlur } }) => (
                  <AppInput
                    label={"Ism"}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() =>
                      setFocus((prev) => ({ ...prev, name: true }))
                    }
                    onBlur={() =>
                      setFocus((prev) => ({ ...prev, name: false }))
                    }
                    error={errors.name?.message}
                    focused={focus.name}
                  />
                )}
              />

              <ChangeRoleButton setRole={setRole} role={role} />
            </View>
          </ScrollView>

          <KeyboardResponsiveView
            style={{ paddingHorizontal: screens.width * 0.04 }}
          >
            <AppButton text="Davom etish" onPress={handleSubmit(onSubmit)} />
          </KeyboardResponsiveView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterUserInfoPage;
