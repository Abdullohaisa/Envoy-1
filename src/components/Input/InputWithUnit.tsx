import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  ViewStyle,
  Keyboard,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { vibration } from "@/utils/hapticks";
import { useThemeColors } from "@/theme/useThemeColors";
import AnimatedErrorText from "../Texts/AnimatedErrorText";
import { UNIT_OPTIONS, UnitType } from "@/constants/unit";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "../BottomSheets/BottomSheetModal";

type StyleInput = {
  [key: string]: any; // agar aniq tiping bo‘lsa yozib qo‘y
};

type AppInputWithUnitProps = {
  label: string;
  error?: string;
  focused?: boolean;
  backColor?: string;
  type: UnitType; // 🔥 qaysi turdagi input (weight, length...)
  selectedUnit: string; // 🔥 hozirgi tanlangan birlik
  onUnitChange: (unit: string) => void; // 🔥 tashqi state ga tanlangan birlikni berish
  ref?: RefObject<TextInput | null>;
  styleInput?: StyleInput;
  styleView?: ViewStyle;
  mask?: string;
} & TextInputProps;

const AppInputWithUnit: React.FC<AppInputWithUnitProps> = ({
  label,
  error,
  focused,
  style,
  value = "",
  backColor,
  type,
  selectedUnit,
  onUnitChange,
  ref,
  styleInput,
  styleView,
  mask,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useSharedValue(focused || value.length > 0 ? 1 : 0);
  const inputRef = React.useRef<TextInput>(null);
  const Colors = useThemeColors();
  const back_color = backColor || Colors.pageBackground;
  const theme = useAtomValue(themeAtom);
  const modalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    labelAnim.value = withTiming(show ? 1 : 0, { duration: 200 });
  }, [isFocused, value, focused]);

  // ✨ Label animatsiyasi
  const animatedLabelStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 16,
    top: interpolate(labelAnim.value, [0, 1], [16, -9.5]),
    fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
    color: interpolateColor(labelAnim.value, [0, 1], ["#999", Colors.primary]),
  }));

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: back_color,
            borderWidth: isFocused || focused ? 1 : 0,
            borderColor: error
              ? "red"
              : isFocused || focused
                ? Colors.primary
                : Colors.Boxbackground,
          },
          styleView,
        ]}
      >
        {/* Label */}
        <Animated.Text
          onPress={() => {
            inputRef?.current?.focus();
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

        {/* Input */}
        <TextInput
          value={value}
          ref={ref || inputRef}
          onChangeText={rest.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.borderColor}
          style={[
            styles.input,
            style,
            { color: Colors.textPrimary },
            styleInput,
          ]}
          cursorColor={Colors.borderColor}
          {...rest}
        />

        {/* Birlik tugmasi */}
        {UNIT_OPTIONS[type].length > 0 && (
          <Pressable
            style={[
              styles.unitButton,
              {
                backgroundColor:
                  theme === "dark" ? Colors.Boxbackground : "#fff",
              },
            ]}
            onPress={(e) => {
              e.stopPropagation();
              vibration.light();
              modalRef.current?.present();
              Keyboard.dismiss();
            }}
          >
            <Text style={{ color: Colors.primary, fontSize: 15 }}>
              {selectedUnit}
            </Text>
          </Pressable>
        )}
      </View>
      {/* Error */}
      <AnimatedErrorText error={error} />

      <CustomBottomSheetModal ref={modalRef}>
        <View style={[styles.options]}>
          <FlatList
            data={UNIT_OPTIONS[type]}
            keyExtractor={(item) => item.short}
            renderItem={({ item, index }) => (
              <Pressable
                style={[
                  styles.unitOption,
                  {
                    borderColor: Colors.borderColor,
                    borderBottomWidth:
                      index === UNIT_OPTIONS[type].length - 1 ? 0 : 1,
                  },
                ]}
                onPress={() => {
                  onUnitChange(item.short);
                  modalRef.current?.close();
                  vibration.light();
                }}
              >
                <Text style={{ fontSize: 16, color: Colors.textPrimary }}>
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};

export default AppInputWithUnit;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 55,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    fontSize: 16,
    padding: 0,
    height: 55,
    paddingHorizontal: 16,
    flex: 1,
  },
  animatedLabel: {
    paddingHorizontal: 4,
    borderRadius: 100,
  },
  options: {
    paddingHorizontal: 20,
  },
  unitButton: {
    height: 45,
    minWidth: 45,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // 🔥 Elevation (Android)
    elevation: 2,
    marginRight: 4,
    borderRadius: 15,
  },
  unitOption: {
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
