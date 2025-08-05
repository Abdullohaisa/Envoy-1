import React, { useEffect, useState } from "react";
import { View, TextInputProps, StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import AnimatedErrorText from "../Texts/AnimatedErrorText";
import { useThemeColors } from "@/theme/useThemeColors";

type AppPhoneInputProps = {
  label: string;
  error?: string;
  password?: boolean;
  mask?: string;
  focused?: boolean;
} & TextInputProps;

const AppPhoneInput: React.FC<AppPhoneInputProps> = ({
  label,
  error,
  password = false,
  mask,
  focused,
  style,
  value = "",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const Colors = useThemeColors();

  const animatedLabel = useSharedValue(0);
  const prefixTranslate = useSharedValue(0);

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    animatedLabel.value = withTiming(show ? 1 : 0, { duration: 200 });
    prefixTranslate.value = withTiming(show ? 1 : 0, { duration: 200 });
  }, [isFocused, value, focused]);

  const labelStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 16,
      top: interpolate(animatedLabel.value, [0, 1], [16, -8]),
      fontSize: interpolate(animatedLabel.value, [0, 1], [16, 12]),
      color: interpolateColor(animatedLabel.value, [0, 1], ["#aaa", "#00BEFF"]),
      paddingHorizontal: 4,
    };
  });

  const prefixStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(prefixTranslate.value, [0, 1], [16, 0]),
        },
      ],
      opacity: prefixTranslate.value,
    };
  });

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
                ? "#00BEFF"
                : Colors.borderColor,
          },
        ]}
      >
        <Animated.Text
          style={[
            labelStyle,
            {
              borderRadius: 5,
              backgroundColor: Colors.pageBackground,
            },
          ]}
        >
          {label}
        </Animated.Text>

        <View style={styles.maskedInputContainer}>
          <Animated.Text
            style={[
              styles.prefix,
              {
                borderRightColor: error
                  ? "red"
                  : isFocused || focused
                    ? "#00BEFF"
                    : Colors.Boxbackground,
              },
              prefixStyle,
            ]}
          >
            +998
          </Animated.Text>
          <MaskedTextInput
            mask={mask}
            value={value}
            onChangeText={(masked, raw) => rest.onChangeText?.(masked)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor="#aaa"
            style={[styles.maskedInput, style]}
            keyboardType="number-pad"
            {...rest}
          />
        </View>
      </View>

      <AnimatedErrorText error={error} />
    </View>
  );
};

export default AppPhoneInput;

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
  maskedInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  prefix: {
    color: "#fff",
    fontSize: 16,
    position: "absolute",
    paddingLeft: 16,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  maskedInput: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
    height: 55,
    paddingLeft: 70,
  },
});
