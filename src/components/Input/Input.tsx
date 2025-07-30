import EyeCloseIcon from "@/assets/icon/close-eye";
import EyeOpenIcon from "@/assets/icon/eye";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import AnimatedErrorText from "../Texts/AnimatedErrorText";
import { useThemeColors } from "@/theme/useThemeColors";

type AppInputProps = {
  label: string;
  error?: string;
  password?: boolean;
  focused?: boolean;
} & TextInputProps;

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  password = false,
  focused,
  style,
  value = "",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hidePassword = useState(password)[0];
  const [secure, setSecure] = useState(password);
  const Colors = useThemeColors();

  // Reanimated values
  const labelAnim = useSharedValue(focused || value.length > 0 ? 1 : 0);

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    labelAnim.value = withTiming(show ? 1 : 0, { duration: 200 });
  }, [isFocused, value, focused]);

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 16,
      top: interpolate(labelAnim.value, [0, 1], [16, -8]),
      fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
      color: labelAnim.value === 1 ? "#00BEFF" : "#aaa",
    };
  });

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors.background,
            borderColor: error
              ? "red"
              : isFocused || focused
                ? "#00BEFF"
                : "#333",
          },
        ]}
      >
        <Animated.Text
          style={[
            animatedLabelStyle,
            {
              backgroundColor: Colors.background,
              paddingHorizontal: 4,
              borderRadius: 5,
            },
          ]}
        >
          {label}
        </Animated.Text>

        <TextInput
          {...rest}
          value={value}
          onChangeText={rest.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secure}
          placeholderTextColor="#aaa"
          style={[styles.input, style]}
        />

        {password && (
          <Pressable onPress={() => setSecure(!secure)} style={styles.toggle}>
            {!secure ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </Pressable>
        )}
      </View>

      <AnimatedErrorText error={error} />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  container: {
    borderWidth: 1,
    borderRadius: 20,
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
  toggle: {
    position: "absolute",
    right: 0,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
});
