import {
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { vibration } from "@/utils/hapticks";
import NumberKeyboard from "@/components/Keyboard/Keyboard";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import SmsCodeBox from "@/components/SmsCodeBox/SmsCodeBox";
import { useAtom, useAtomValue } from "jotai";
import { smsAtom } from "@/service/sms/controller";
import AppText from "@/components/Texts/Text";
import { useTimer } from "@/hooks/useTimer";
import { registerTempValues } from "@/widget/auth/register/tempValues";

const RegisterSmsCodePage = () => {
  const [code, setCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState<null | boolean>(null);
  const Colors = useThemeColors();
  const [sms, setSms] = useAtom(smsAtom);
  const { phone } = useAtomValue(registerTempValues);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const formattedPhone = "+998" + phone.replace(/[^0-9]/g, "");
  const { count, startTimer, scale, opacity } = useTimer(60);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const resend = () => {
    if (count === 0) {
      startTimer();
      setSms(formattedPhone);
    }
  };

  const animValues = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ];

  const handlePress = (value: string) => {
    if (value === "del" && code.length > 0) {
      const index = code.length - 1;
      animValues[index].value = withTiming(0, { duration: 100 }, () => {});
      setTimeout(() => {
        setCode((codes) => codes.slice(0, -1));
      }, 100);
    } else if (code.length < 4 && value !== "del") {
      const index = code.length;
      setCode((prev) => prev + value);
      animValues[index].value = withTiming(1, { duration: 100 });
    }

    vibration.light();
  };

  const clearinput = () => {
    setCode("");
  };

  useEffect(() => {
    setTimeout(() => {
      if (code.length === 4) {
        if (sms.sms == code) {
          setIsCodeCorrect(true);
          setTimeout(() => {
            router.push(AppRoutes.auth.registerUserInfo);
          }, 200);
        } else {
          setIsCodeCorrect(false);
          clearinput();
          vibration.heavy();
        }
      } else {
        setIsCodeCorrect(null);
      }
    }, 50);
  }, [code]);

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Sms kod" />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <AppText style={{ textAlign: "center", marginTop: 10 }}>
          +998 {phone}
        </AppText>
        <SmsCodeBox
          code={code}
          animValues={animValues}
          isCodeCorrect={isCodeCorrect}
        />
        <NumberKeyboard
          count={count}
          resend={resend}
          onKeyPress={handlePress}
          codeLength={code.length}
          clearinput={clearinput}
        />
      </View>
    </View>
  );
};

export default RegisterSmsCodePage;
