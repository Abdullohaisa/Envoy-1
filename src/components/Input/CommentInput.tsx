import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TextInput as RNTextInput,
  ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { useThemeColors } from "@/theme/useThemeColors";
import { Fonts, Radius } from "@/shared/token";
import AnimatedErrorText from "../Texts/AnimatedErrorText";
import AppText from "../Texts/Text";

type AppCommentInputProps = {
  label: string;
  error?: string;
  focused?: boolean;
  backColor?: string;
  styleInput?: object;
  styleView?: ViewStyle;
} & TextInputProps;

const AppCommentInput: React.FC<AppCommentInputProps> = ({
  label,
  error,
  focused = false,
  value = "",
  backColor,
  styleInput,
  styleView,
  ...rest
}) => {
  const Colors = useThemeColors();
  const inputRef = useRef<RNTextInput>(null);

  const [isFocused, setIsFocused] = useState(false);

  // 🔥 Label animatsiyasi (oldingi kabi)
  const labelAnim = useSharedValue(focused || value.length > 0 ? 1 : 0);

  // 🔥 Height animatsiyasi — qaltiramaydi
  const animatedHeight = useSharedValue(55);

  const bg = backColor || Colors.pageBackground;

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    labelAnim.value = withTiming(show ? 1 : 0, { duration: 200 });
  }, [isFocused, value, focused]);

  // Label animatsiyasi
  const animatedLabelStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 12,
    top: interpolate(labelAnim.value, [0, 1], [14, -9.5]),
    fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
    color: interpolateColor(
      labelAnim.value,
      [0, 1],
      [Colors.textSecondary, Colors.primary]
    ),
    backgroundColor: bg,
    paddingHorizontal: 7,
    borderRadius: 5,
    zIndex: 10,
    fontFamily: Fonts.regular,
  }));

  // Height animatsiyasi (asosiy qismi)
  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  // Height auto-o'sishi
  const handleContentSizeChange = (e: any) => {
    let h = e.nativeEvent.contentSize.height + 7;

    if (h < 55) h = 55;
    if (h > 250) h = 250;

    animatedHeight.value = withTiming(h, { duration: 180 });
  };

  return (
    <View>
      {/* Animated Container */}
      <Animated.View
        style={[
          styles.container,
          animatedContainerStyle,
          {
            backgroundColor: bg,
            borderWidth: 1,
            borderColor: error
              ? "red"
              : isFocused || focused
                ? Colors.primary
                : Colors.borderColor,
          },
          styleView,
        ]}
      >
        {/* Label */}
        <Animated.Text
          style={animatedLabelStyle}
          onPress={() => {
            inputRef.current?.focus();
            setIsFocused(true);
          }}
        >
          {label}
        </Animated.Text>

        {/* Input */}
        <RNTextInput
          ref={inputRef}
          value={value}
          onChangeText={rest.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline
          onContentSizeChange={handleContentSizeChange}
          placeholderTextColor={Colors.borderColor}
          cursorColor={Colors.borderColor}
          style={[styles.input, { color: Colors.textPrimary }, styleInput]}
          {...rest}
        />
      </Animated.View>

      {/* Bottom info row */}
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "row",
          marginTop: 7,
        }}
      >
        <View
          style={{
            padding: 7,
            paddingHorizontal: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.borderColor,
          }}
        >
          <AppText
            onPress={() => {
              if (value.length > 0) {
                rest.onChangeText?.("");
              }
            }}
            style={{
              color: value.length > 0 ? "red" : Colors.textSecondary,
            }}
          >
            Tozalash
          </AppText>
        </View>

        <View
          style={{
            padding: 7,
            paddingHorizontal: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.borderColor,
          }}
        >
          <AppText
            style={{
              color: value.length > 0 ? Colors.primary : Colors.textSecondary,
            }}
          >
            {value.length} / 400
          </AppText>
        </View>
      </View>

      {/* Error */}
      {error && <AnimatedErrorText error={error} />}
    </View>
  );
};

export default AppCommentInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.input,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    textAlignVertical: "top",
    fontFamily: Fonts.regular,
  },
});
