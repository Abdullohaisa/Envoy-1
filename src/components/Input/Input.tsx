import React, { RefObject, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import EyeCloseIcon from "@/assets/icon/close-eye";
import EyeIcon from "@/assets/icon/eye";
import CloseIcon from "@/assets/icon/close";
import { vibration } from "@/utils/hapticks";
import { useThemeColors } from "@/theme/useThemeColors";
import AnimatedErrorText from "../Texts/AnimatedErrorText";
import { Radius } from "@/shared/token";

// 🔑 Props type: input label, error matn, parol rejimi, fokus, fon rangi va clear tugmasi
// `ref` tashqi tomondan ham yuborilishi mumkin

type AppInputProps = {
  label: string;
  error?: string;
  password?: boolean;
  focused?: boolean;
  backColor?: string;
  showClear?: boolean; // 🔥 Clear tugmasini ko‘rsatish boshqaruvi
  ref?: RefObject<TextInput | null>;
  styleView?: ViewStyle;
} & TextInputProps;

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  password = false,
  focused,
  style,
  value = "",
  backColor,
  showClear = true, // 🔥 default bo‘yicha true
  ref,
  styleView,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secure, setSecure] = useState(password); // 🔐 password rejimi
  const clearButton = useSharedValue(0); // ❌ clear tugmasi animatsiyasi
  const inputRef = React.useRef<TextInput>(null);
  const Colors = useThemeColors();
  const back_color = backColor || Colors.pageBackground;

  // 🔄 Label animatsiyasi boshqaruvi
  const labelAnim = useSharedValue(focused || value.length > 0 ? 1 : 0);

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    labelAnim.value = withTiming(show ? 1 : 0, { duration: 200 });

    // 🔥 Clear tugmasi faqat `showClear` true bo‘lsa ishlaydi
    clearButton.value =
      showClear && value.length > 0 ? withTiming(1) : withTiming(0);
  }, [isFocused, value, focused, showClear]);

  // ✨ Label animatsiyasi (yukoriga chiqish, rang o‘zgarishi)
  const animatedLabelStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 16,
    top: interpolate(labelAnim.value, [0, 1], [16, -8]),
    fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
    color: interpolateColor(labelAnim.value, [0, 1], ["#999", Colors.primary]),
  }));

  // ❌ Clear tugmasi chiqish animatsiyasi
  const closeButtonStyle = useAnimatedStyle(() => ({
    right: interpolate(clearButton.value, [0, 1], [-56, 0]),
  }));

  // 🔐 Parol ko‘rsatish/tashlash
  const handleSecure = () => {
    setSecure(!secure);
    vibration.light();
  };

  return (
    <View style={styles.wrapper}>
      {/* Input container */}
      <View
        style={[
          styles.container,
          styleView,
          {
            backgroundColor: back_color,
            borderColor: error
              ? "red"
              : isFocused || focused
                ? Colors.primary
                : Colors.borderColor,
          },
        ]}
      >
        {/* Label animatsiyasi */}
        <Animated.Text
          onPress={() => {
            inputRef?.current?.focus(); // 🔥 Label bosilganda input fokus
            setIsFocused(true);
          }}
          style={[
            animatedLabelStyle,
            styles.animatedLabel,
            { backgroundColor: back_color, zIndex: 10 },
          ]}
        >
          {label}
        </Animated.Text>

        {/* Asosiy input */}
        <TextInput
          {...rest}
          value={value}
          ref={ref || inputRef}
          onChangeText={rest.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secure}
          placeholderTextColor={Colors.borderColor}
          style={[styles.input, style, { color: Colors.textPrimary }]}
          cursorColor={Colors.borderColor}
        />

        {/* Fokus va tugmalar qismi */}
        <Pressable
          style={[styles.focusArea, { width: password ? 110 : 55 }]}
          onPress={() => {
            inputRef?.current?.focus();
          }}
        >
          <Animated.View
            style={[
              styles.buttonsBox,
              { width: password ? 110 : 55 },
              closeButtonStyle,
            ]}
          >
            {/* 🔐 Eye icon (parol ko‘rsatish/tashlash) */}
            {password && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleSecure();
                }}
                style={styles.toggle}
              >
                {secure ? (
                  <EyeCloseIcon
                    size={23}
                    color={
                      isFocused || focused ? Colors.primary : Colors.borderColor
                    }
                  />
                ) : (
                  <EyeIcon
                    size={20}
                    color={
                      isFocused || focused ? Colors.primary : Colors.borderColor
                    }
                  />
                )}
              </Pressable>
            )}

            {/* 🔲 Vertical ajratgich */}
            {password && (
              <View
                style={{
                  width: 1,
                  height: 30,
                  backgroundColor:
                    isFocused || focused ? Colors.primary : Colors.borderColor,
                }}
              />
            )}

            {/* ❌ Clear tugmasi */}
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                vibration.medium();
                rest.onChangeText?.("");
                inputRef?.current?.focus(); // 🔥 Tozalagandan keyin ham fokus qoladi
              }}
              style={[styles.closeButton, { backgroundColor: "transparent" }]}
            >
              <CloseIcon
                color={
                  isFocused || focused ? Colors.primary : Colors.borderColor
                }
                size={18}
              />
            </Pressable>
          </Animated.View>
        </Pressable>
      </View>

      {/* ❗ Error matni */}
      <AnimatedErrorText error={error} />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    borderWidth: 1,
    borderRadius: Radius.input,
    height: 55,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    color: "#fff",
    padding: 0,
    height: 55,
    paddingHorizontal: 16,
    flex: 1,
  },
  animatedLabel: {
    paddingHorizontal: 4,
    borderRadius: 100,
  },
  focusArea: {
    height: 55,
    overflow: "hidden",
    position: "absolute",
    right: 0,
  },
  toggle: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsBox: {
    overflow: "hidden",
    width: 110,
    padding: 10,
    position: "absolute",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  closeButton: {
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
