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
  interpolateColor,
} from "react-native-reanimated";
import AnimatedErrorText from "../Texts/AnimatedErrorText";
import { useThemeColors } from "@/theme/useThemeColors";
import { vibration } from "@/utils/hapticks";

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
      color: interpolateColor(
        labelAnim.value,
        [0, 1],
        [Colors.borderColor, Colors.primary]
      ),
    };
  });

  const handleSecure = () => {
    setSecure(!secure);
    vibration.light();
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors.pageBackground,
            borderColor: error
              ? "red"
              : isFocused || focused
                ? Colors.primary
                : Colors.borderColor,
          },
        ]}
      >
        <Animated.Text
          style={[
            animatedLabelStyle,
            {
              backgroundColor: Colors.pageBackground,
              paddingHorizontal: 4,
              borderRadius: 100,
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
          placeholderTextColor={Colors.borderColor}
          style={[styles.input, style, { color: Colors.textPrimary }]}
        />

        {password && (
          <Pressable onPress={handleSecure} style={styles.toggle}>
            <EyeOpenIcon isSecure={secure} color={Colors.borderColor} />
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
