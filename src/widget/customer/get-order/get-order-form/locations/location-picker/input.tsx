import React, { forwardRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInputProps,
  Pressable,
  TextInput,
} from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MapIcon from "@/assets/icon/map";
import CloseIcon from "@/assets/icon/close";
import { Fonts, Radius, Spacing } from "@/shared/token";

const LocationPickerInput = forwardRef<any, TextInputProps | any>(
  ({ openMap, ...props }, ref) => {
    const Colors = useThemeColors();
    const theme = useAtomValue(themeAtom);
    const [text, setText] = useState("");

    const clearX = useSharedValue(40);

    useEffect(() => {
      clearX.value = withTiming(text ? 0 : 41, { duration: 300 });
    }, [text]);

    const animatedClearBtn = useAnimatedStyle(() => ({
      transform: [{ translateX: clearX.value }],
    }));

    const AnimatedBox = Animated.createAnimatedComponent(View);

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors.Boxbackground,
            elevation: theme === "light" ? 2 : 0,
            borderColor: Colors.textSecondary,
          },
        ]}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable onPress={() => ref?.current?.focus()}>
            <Ionicons name="search" size={20} color={Colors.textPrimary06} />
          </Pressable>

          <TextInput
            ref={ref}
            style={[styles.input, { color: Colors.textPrimary }]}
            placeholderTextColor={Colors.textPrimary06}
            {...props}
            onChangeText={(t) => {
              setText(t);
              props.onChangeText?.(t);
            }}
          />
        </View>

        {/* Clear + Map Buttons */}
        <AnimatedBox
          style={[styles.clearWrapper, animatedClearBtn]}
          pointerEvents="box-none"
        >
          <Pressable onPress={openMap} style={styles.iconBtn}>
            <MapIcon color={Colors.textPrimary06} size={20} />
          </Pressable>

          <View
            style={[styles.divider, { backgroundColor: Colors.textSecondary }]}
          />

          <Pressable
            onPress={() => {
              setText("");
              props.onChangeText?.("");
            }}
            style={styles.iconBtn}
          >
            <CloseIcon color={Colors.textPrimary06} size={20} />
          </Pressable>
        </AnimatedBox>
      </View>
    );
  }
);

export default LocationPickerInput;

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 18,
    paddingHorizontal: Spacing.horizontal,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    margin: 4,
    position: "relative",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  clearWrapper: {
    position: "absolute",
    right: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: 20,
  },
});
