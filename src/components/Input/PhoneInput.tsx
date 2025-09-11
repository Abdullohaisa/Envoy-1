import React, { useEffect, useRef, useState } from "react";
import { View, TextInputProps, StyleSheet, Pressable } from "react-native";
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
import CloseIcon from "@/assets/icon/close";
import { vibration } from "@/utils/hapticks";

type AppPhoneInputProps = {
  label: string;
  error?: string;
  password?: boolean;
  mask?: string;
  focused?: boolean;
  onClear?: () => void;
} & TextInputProps;

const AppPhoneInput: React.FC<AppPhoneInputProps> = ({
  label,
  error,
  password = false,
  mask,
  focused,
  style,
  value = "",
  onClear,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const Colors = useThemeColors();
  const inputRef = useRef<any>(null);

  const animatedLabel = useSharedValue(0);
  const prefixTranslate = useSharedValue(0);
  const clearButton = useSharedValue(0);

  const AnimatedCloseButton = Animated.createAnimatedComponent(Pressable);

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    animatedLabel.value = withTiming(show ? 1 : 0, { duration: 200 });
    prefixTranslate.value = withTiming(show ? 1 : 0, { duration: 200 });
    if (value.length > 0) {
      clearButton.value = withTiming(1);
    } else {
      clearButton.value = withTiming(0);
    }
  }, [isFocused, value, focused]);

  const labelStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 16,
      top: interpolate(animatedLabel.value, [0, 1], [16, -8]),
      fontSize: interpolate(animatedLabel.value, [0, 1], [16, 12]),
      color: interpolateColor(
        animatedLabel.value,
        [0, 1],
        [Colors.borderColor, Colors.primary]
      ),
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

  const closeButtonStyle = useAnimatedStyle(() => ({
    right: interpolate(clearButton.value, [0, 1], [-55, 0]),
  }));

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
            labelStyle,
            {
              borderRadius: 100,
              backgroundColor: Colors.pageBackground,
              color: Colors.borderColor,
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
                color: Colors.textPrimary,
                borderRightColor: error
                  ? "red"
                  : isFocused || focused
                    ? Colors.primary
                    : Colors.borderColor,
              },
              prefixStyle,
            ]}
          >
            +998
          </Animated.Text>
          <MaskedTextInput
            ref={inputRef}
            mask={mask}
            value={value}
            onChangeText={(masked, raw) => rest.onChangeText?.(masked)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.maskedInput, { color: Colors.textPrimary }, style]}
            keyboardType="number-pad"
            {...rest}
          />
        </View>

        <Pressable
          style={{
            height: 55,
            width: 55,
            overflow: "hidden",
            position: "absolute",
            right: 0,
          }}
          onPress={() => {
            inputRef?.current?.focus();
          }}
        >
          <AnimatedCloseButton
            onPress={(e) => {
              e.stopPropagation();
              vibration.medium();
              rest.onChangeText?.("");
              inputRef?.current?.focus();
            }}
            hitSlop={10} // kattaroq bosish zonasi
            style={[styles.closeButton, closeButtonStyle]}
          >
            <CloseIcon
              color={isFocused || focused ? Colors.primary : Colors.borderColor}
              size={18}
            />
          </AnimatedCloseButton>
        </Pressable>
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
    backgroundColor: "#f1f1f1",
    // overflow: "hidden",
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
    // backgroundColor: "red",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
