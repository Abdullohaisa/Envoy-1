import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import SmsCodeBox from "../SmsCodeBox/SmsCodeBox";
import NumberKeyboard from "../Keyboard/Keyboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SmsVerificationModal = ({ onClose }: { onClose: () => void }) => {
  const Colors = useThemeColors();

  const [code, setCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);

  // 🔹 Timer va resend count
  const [count, setCount] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const animValues = [0, 1, 2, 3].map(() => useSharedValue(1));

  // 🔹 Kod animatsiyasi
  useEffect(() => {
    animValues.forEach((anim, i) => {
      anim.value = code[i] ? 1 : 0;
    });
  }, [code]);

  useEffect(() => {
    if (code.length === 4) {
      setTimeout(() => {
        if (code === "1234") {
          setIsCodeCorrect(true);
          setTimeout(() => {
            onClose(); // ✅ sheet 0.8s keyin yopiladi
          }, 800);
        } else {
          setIsCodeCorrect(false);
          setTimeout(() => {
            setCode("");
            setIsCodeCorrect(null);
          }, 800);
        }
      }, 0); // darhol boshlanadi, ammo ichki setTimeout 0.8s
    }
  }, [code]);
  // 🔹 Resend taymeri
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [count]);

  const handleKeyPress = (key: string) => {
    if (key === "del") {
      setCode((prev) => prev.slice(0, -1));
    } else if (code.length < 4) {
      setCode((prev) => prev + key);
    }
  };

  const clearinput = () => {
    setCode("");
    setIsCodeCorrect(null);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCount(30);
    setCanResend(false);
    // 🔹 Shu yerda API orqali yangi SMS yuboriladi
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <AppText style={{ fontSize: 22, fontWeight: "bold" }}>
          SMS kodni kiriting
        </AppText>
        <AppText style={{ color: Colors.textSecondary, fontSize: 15 }}>
          Sizning yangi telefon raqamingizga SMS yuborildi
        </AppText>
      </View>

      <View style={{ flexDirection: "column", gap: 20, alignItems: "center" }}>
        <SmsCodeBox
          code={code}
          isCodeCorrect={isCodeCorrect}
          animValues={animValues}
        />
      </View>

      <View style={{ width: "100%" }}>
        <NumberKeyboard
          onKeyPress={handleKeyPress}
          codeLength={code.length}
          clearinput={clearinput}
          resend={handleResend}
          count={count}
        />
      </View>
    </View>
  );
};

export default SmsVerificationModal;
