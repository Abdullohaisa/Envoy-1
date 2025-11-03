// import React, { RefObject, useEffect, useRef, useState } from "react";
// import {
//   View,
//   TextInput,
//   TextInputProps,
//   StyleSheet,
//   Pressable,
//   Text,
//   FlatList,
//   ViewStyle,
//   Keyboard,
// } from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   interpolate,
//   interpolateColor,
// } from "react-native-reanimated";
// import { vibration } from "@/utils/hapticks";
// import { useThemeColors } from "@/theme/useThemeColors";
// import AnimatedErrorText from "../Texts/AnimatedErrorText";
// import { UNIT_OPTIONS, UnitType } from "@/constants/unit";
// import { useAtomValue } from "jotai";
// import { themeAtom } from "@/theme/theme";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import UnitPicker from "@/widget/customer/get-order/get-order-form/cargo";
// import { Radius } from "@/shared/token";

// type StyleInput = {
//   [key: string]: any; // agar aniq tiping bo‘lsa yozib qo‘y
// };

// type AppInputWithUnitProps = {
//   label: string;
//   error?: string;
//   focused?: boolean;
//   backColor?: string;
//   type: UnitType; // 🔥 qaysi turdagi input (weight, length...)
//   selectedUnit: string; // 🔥 hozirgi tanlangan birlik
//   onUnitChange: (unit: string) => void; // 🔥 tashqi state ga tanlangan birlikni berish
//   ref?: RefObject<TextInput | null>;
//   styleInput?: StyleInput;
//   styleView?: ViewStyle;
//   mask?: string;
// } & TextInputProps;

// const AppInputWithUnit: React.FC<AppInputWithUnitProps> = ({
//   label,
//   error,
//   focused,
//   style,
//   value = "",
//   backColor,
//   type,
//   selectedUnit,
//   onUnitChange,
//   ref,
//   styleInput,
//   styleView,
//   mask,
//   ...rest
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const labelAnim = useSharedValue(focused || value.length > 0 ? 1 : 0);
//   const inputRef = React.useRef<TextInput>(null);
//   const Colors = useThemeColors();
//   const back_color = backColor || Colors.pageBackground;
//   const theme = useAtomValue(themeAtom);
//   const modalRef = useRef<BottomSheetModal>(null);

//   useEffect(() => {
//     const show = isFocused || value.length > 0 || focused;
//     labelAnim.value = withTiming(show ? 1 : 0, { duration: 200 });
//   }, [isFocused, value, focused]);

//   // ✨ Label animatsiyasi
//   const animatedLabelStyle = useAnimatedStyle(() => ({
//     position: "absolute",
//     left: 16,
//     top: interpolate(labelAnim.value, [0, 1], [16, -9.5]),
//     fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
//     color: interpolateColor(labelAnim.value, [0, 1], ["#999", Colors.primary]),
//   }));

//   return (
//     <View>
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: back_color,
//             borderWidth: isFocused || focused ? 1 : 0,
//             borderColor: error
//               ? "red"
//               : isFocused || focused
//                 ? Colors.primary
//                 : Colors.Boxbackground,
//           },
//           styleView,
//         ]}
//       >
//         {/* Label */}
//         <Animated.Text
//           onPress={() => {
//             inputRef?.current?.focus();
//             setIsFocused(true);
//           }}
//           style={[
//             animatedLabelStyle,
//             styles.animatedLabel,
//             { backgroundColor: back_color, zIndex: 10 },
//           ]}
//         >
//           {label}
//         </Animated.Text>

//         {/* Input */}
//
//           value={value}
//           ref={ref || inputRef}
//           onChangeText={rest.onChangeText}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           placeholderTextColor={Colors.borderColor}
//           style={[
//             styles.input,
//             style,
//             { color: Colors.textPrimary },
//             styleInput,
//           ]}
//           cursorColor={Colors.borderColor}
//           {...rest}
//         />

//         {/* Birlik tugmasi */}
//         {UNIT_OPTIONS[type].length > 0 && (
//           <Pressable
//             style={[
//               styles.unitButton,
//               {
//                 backgroundColor:
//                   theme === "dark" ? Colors.Boxbackground : "#fff",
//               },
//             ]}
//             onPress={(e) => {
//               e.stopPropagation();
//               vibration.light();
//               modalRef.current?.present();
//               Keyboard.dismiss();
//             }}
//           >
//             <Text style={{ color: Colors.primary, fontSize: 15 }}>
//               {selectedUnit}
//             </Text>
//           </Pressable>
//         )}
//       </View>
//       {/* Error */}
//       <AnimatedErrorText error={error} />

//       <UnitPicker
//         modalRef={modalRef}
//         onUnitChange={onUnitChange}
//         selectedUnit={selectedUnit}
//         type={type}
//       />
//     </View>
//   );
// };

// export default AppInputWithUnit;

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: Radius.input,
//     height: 55,
//     justifyContent: "center",
//     flexDirection: "row",
//     alignItems: "center",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   input: {
//     fontSize: 16,
//     padding: 0,
//     height: 55,
//     paddingHorizontal: 16,
//     flex: 1,
//   },
//   animatedLabel: {
//     paddingHorizontal: 4,
//     borderRadius: 100,
//   },
//   options: {
//     paddingHorizontal: 20,
//   },
//   unitButton: {
//     height: 45,
//     minWidth: 45,
//     paddingHorizontal: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,

//     // 🔥 Elevation (Android)
//     elevation: 2,
//     marginRight: 4,
//     borderRadius: 15,
//   },
//   unitOption: {
//     padding: 12,
//     alignItems: "center",
//     borderBottomWidth: 1,
//   },
// });

import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  Text,
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
import UnitPicker from "@/widget/customer/get-order/get-order-form/cargo";
import { Fonts, Radius } from "@/shared/token";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppText from "../Texts/Text";

type AppInputWithUnitProps = {
  label: string;
  error?: string;
  focused?: boolean;
  backColor?: string;
  type: UnitType;
  selectedUnit: string | null;
  onUnitChange: (unit: string) => void;
  ref?: RefObject<TextInput | null>;
  styleInput?: object;
  styleView?: object;
} & TextInputProps;

const AppInputWithUnit: React.FC<AppInputWithUnitProps> = ({
  label,
  error,
  focused = false,
  value = "",
  backColor,
  type,
  selectedUnit,
  onUnitChange,
  ref,
  styleInput,
  styleView,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useSharedValue(focused || value.length > 0 ? 1 : 0);
  const inputRef = useRef<TextInput>(null);
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const modalRef = useRef<BottomSheetModalMethods>(null);

  const back_color = backColor || Colors.pageBackground;

  useEffect(() => {
    const show = isFocused || value.length > 0 || focused;
    labelAnim.value = withTiming(show ? 1 : 0, { duration: 200 });
  }, [isFocused, value, focused]);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 16,
    top: interpolate(labelAnim.value, [0, 1], [16, -9.5]),
    fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
    color: interpolateColor(labelAnim.value, [0, 1], ["#999", Colors.primary]),
    backgroundColor: back_color,
    paddingHorizontal: 4,
    borderRadius: 100,
    zIndex: 10,
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
        {/* Animated Label */}
        <Animated.Text
          onPress={() => {
            inputRef?.current?.focus();
            setIsFocused(true);
          }}
          style={animatedLabelStyle}
        >
          {label}
        </Animated.Text>

        {/* TextInput */}
        <TextInput
          ref={ref || inputRef}
          value={value}
          onChangeText={rest.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.borderColor}
          style={[styles.input, styleInput, { color: Colors.textPrimary }]}
          cursorColor={Colors.borderColor}
          {...rest}
        />

        {/* Unit Button */}
        {UNIT_OPTIONS[type]?.length > 0 && (
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
              modalRef.current?.present?.();
              Keyboard.dismiss();
            }}
          >
            <AppText style={{ color: Colors.primary, fontSize: 15 }}>
              {selectedUnit ?? ""}
            </AppText>
          </Pressable>
        )}
      </View>

      {/* Error Text */}
      {error && <AnimatedErrorText error={error} />}

      {/* Unit Picker */}
      <UnitPicker
        modalRef={modalRef}
        onUnitChange={onUnitChange}
        selectedUnit={selectedUnit}
        type={type}
      />
    </View>
  );
};

export default AppInputWithUnit;

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.input,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    height: "100%",
    fontFamily: Fonts.regular,
  },
  unitButton: {
    height: 45,
    minWidth: 45,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
