import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AuthHedaer from "@/components/Header/AuthHeader/AuthHedaer";
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
import { phoneForSmsAtom } from "./phone";
import AppText from "@/components/Texts/Text";
import { useTimer } from "@/hooks/useTimer";

const RPSmsCodePage = () => {
  const [code, setCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState<null | boolean>(null);
  const Colors = useThemeColors();
  const [sms, setSms] = useAtom(smsAtom);
  const phone = useAtomValue(phoneForSmsAtom);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const formattedPhone = "+998" + phone.replace(/[^0-9]/g, "");
  const { count, startTimer, scale, opacity } = useTimer(30);

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

      // Avval animatsiyani ishga tushuramiz
      animValues[index].value = withTiming(0, { duration: 100 }, () => {
        // Animatsiyadan keyin kodni o'chiramiz
        // runOnJS(setCode)(code.slice(0, -1));
      });
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
            router.push(AppRoutes.auth.resetPassword.newPassword);
          }, 200);
        } else {
          setIsCodeCorrect(false);
          vibration.heavy();
        }
      } else {
        setIsCodeCorrect(null);
      }
    }, 200);
  }, [code]);

  useEffect(() => {
    if (phone) {
      setSms(formattedPhone);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <AuthHedaer title="Sms kod" />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <AppText style={{ textAlign: "center", marginTop: 10 }}>
            +998 {phone}
          </AppText>
          <SmsCodeBox
            code={code}
            animValues={animValues}
            isCodeCorrect={isCodeCorrect}
          />
          <View
            style={{
              height: 40,
              backgroundColor: Colors.Boxbackground,
              borderBottomWidth: 0.5,
              borderColor: Colors.pageBackground,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={[
                {
                  height: 40,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 1,
                  left: 2.5,
                },
                animatedStyle,
              ]}
            >
              <AppText
                style={{
                  color: Colors.primary,
                  textAlign: "center",
                }}
              >
                {count}
              </AppText>
            </Animated.View>
            <Pressable
              disabled={count !== 0}
              onPress={resend}
              style={{ flex: 1 }}
            >
              <AppText
                style={{
                  color: !count ? Colors.primary : Colors.textSecondary,
                  textAlign: "center",
                }}
              >
                Qayta sms yuboring
              </AppText>
            </Pressable>
          </View>
          <NumberKeyboard
            onKeyPress={handlePress}
            codeLength={code.length}
            clearinput={clearinput}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RPSmsCodePage;

const styles = StyleSheet.create({});
