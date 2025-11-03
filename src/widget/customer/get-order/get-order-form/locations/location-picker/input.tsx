import React, { forwardRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInputProps,
  Pressable,
  TextInput,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Fonts, Radius, Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";
import Ionicons from "@expo/vector-icons/Ionicons";
import CloseIcon from "@/assets/icon/close";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const LocationPickerInput = forwardRef<any, TextInputProps>((props, ref) => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const [focused, setFocused] = useState(false);
  const translateXClearButton = useSharedValue(40);
  const [text, setText] = useState(""); // input qiymati

  useEffect(() => {
    if (text) {
      translateXClearButton.value = withTiming(-5, { duration: 300 });
    } else {
      translateXClearButton.value = withTiming(40, { duration: 300 });
    }
  }, [text]);

  const clearAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXClearButton.value }],
  }));

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View
      style={[
        styles.inputBox,
        {
          backgroundColor: Colors.Boxbackground,
          elevation: theme === "light" ? 2 : 0,
          borderTopWidth: 0,
          borderColor: "silver",
          gap: 15,
        },
      ]}
    >
      <Pressable onPress={() => ref?.current?.focus()}>
        <Ionicons name="search" size={20} color={Colors.textPrimary06} />
      </Pressable>
      <TextInput
        ref={ref}
        style={[styles.input, { color: Colors.textPrimary }]}
        placeholderTextColor={Colors.textPrimary06}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
        onChangeText={(t) => {
          setText(t); // qiymatni saqlab qo‘yamiz
          props.onChangeText?.(t); // tashqariga ham yuboramiz
        }}
      />
      <AnimatedPressable
        hitSlop={10} // bosish maydonini kengaytiradi
        pointerEvents="box-none" // gesturelarni bloklamaydi
        onPress={() => {
          setText(""); // input ichini bo‘shatamiz
          props.onChangeText?.(""); // tashqariga ham yuboramiz
        }}
        style={[
          {
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
          },
          clearAnimation,
        ]}
      >
        <CloseIcon color={Colors.textPrimary06} size={20} />
      </AnimatedPressable>
    </View>
  );
});

export default LocationPickerInput;

const styles = StyleSheet.create({
  inputBox: {
    elevation: 2,
    borderRadius: Radius.input,
    height: 60,
    paddingHorizontal: Spacing.horizontal,
    alignItems: "center",
    margin: 4,
    flexDirection: "row",
    overflow: "hidden",
    paddingRight: 50,
  },
  input: {
    fontSize: 16,
    borderColor: "silver",
    height: "100%",
    flex: 1,
    fontFamily: Fonts.regular,
  },
});
