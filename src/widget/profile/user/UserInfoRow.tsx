// // import AppText from "@/components/Texts/Text";
// // import { useThemeColors } from "@/theme/useThemeColors";
// // import { useState } from "react";
// // import { Pressable, TextInput, View } from "react-native";
// // import Animated, {
// //   useAnimatedStyle,
// //   withTiming,
// // } from "react-native-reanimated";
// // import { styleUser as styles } from "./style";
// // import * as Clipboard from "expo-clipboard";
// // import { MaterialIcons } from "@expo/vector-icons";
// // import Feather from "@expo/vector-icons/Feather";

// // const UserInfoRow = ({ label, value, editMode, onChange, type }: any) => {
// //   const Colors = useThemeColors();
// //   const [copy, setCopy] = useState(false);

// //   const copyToClipboard = async () => {
// //     try {
// //       setCopy(true);
// //       setTimeout(() => {
// //         setCopy(false);
// //       }, 1000);
// //       await Clipboard.setStringAsync(value);
// //     } catch (error) {
// //     }
// //   };

// //   const animtedStyle = useAnimatedStyle(() => {
// //     const elevation = withTiming(editMode ? 20 : 0);
// //     return { elevation };
// //   });

// //   return (
// //     <Animated.View
// //       style={[
// //         styles.infoCard,
// //         { backgroundColor: Colors.Boxbackground },
// //         animtedStyle,
// //       ]}
// //     >
// //       <View style={styles.labelRow}>
// //         <AppText style={[styles.label, { color: Colors.textSecondary }]}>
// //           {label}
// //         </AppText>
// //         {!editMode && (
// //           <View>
// //             {copy ? (
// //               <Feather name="check" size={20} color={Colors.green} />
// //             ) : (
// //               <Pressable onPress={copyToClipboard}>
// //                 <MaterialIcons
// //                   name="content-copy"
// //                   size={20}
// //                   color={Colors.textSecondary}
// //                 />
// //               </Pressable>
// //             )}
// //           </View>
// //         )}
// //       </View>

// //       {editMode ? (
// //         <TextInput
// //           value={value}
// //           onChangeText={onChange}
// //           style={{
// //             color: Colors.textPrimary,
// //             fontSize: 18,
// //             height: 30,
// //             paddingBottom: 0,
// //             paddingLeft: 0,
// //             paddingTop: 0,
// //           }}
// //         />
// //       ) : (
// //         <AppText style={{ color: Colors.textPrimary, fontSize: 18 }}>
// //           {value}
// //         </AppText>
// //       )}
// //     </Animated.View>
// //   );
// // };

// // export default UserInfoRow;

// import AppText from "@/components/Texts/Text";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { useState } from "react";
// import { Pressable, TextInput, View } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import { styleUser as styles } from "./style";
// import * as Clipboard from "expo-clipboard";
// import { MaterialIcons } from "@expo/vector-icons";
// import Feather from "@expo/vector-icons/Feather";
// import { MaskedTextInput, mask, unMask } from "react-native-mask-text";
// import { Fonts } from "@/shared/token";

// const UserInfoRow = ({ label, value, editMode, onChange, type }: any) => {
//   const Colors = useThemeColors();
//   const [copy, setCopy] = useState(false);

//   const copyToClipboard = async () => {
//     try {
//       setCopy(true);
//       setTimeout(() => setCopy(false), 1000);
//       await Clipboard.setStringAsync(value);
//     } catch (error) {}
//   };

//   const animtedStyle = useAnimatedStyle(() => {
//     const elevation = withTiming(editMode ? 20 : 0);
//     return { elevation };
//   });

//   // 🔹 Telefon maskasi
//   let phoneMask = "+998 99 999-99-99";

//   return (
//     <Animated.View
//       style={[
//         styles.infoCard,
//         { backgroundColor: Colors.Boxbackground },
//         animtedStyle,
//       ]}
//     >
//       {/* Label va copy ikonkasi */}
//       <View style={styles.labelRow}>
//         <AppText style={[styles.label, { color: Colors.textSecondary }]}>
//           {label}
//         </AppText>
//         {!editMode && (
//           <View>
//             {copy ? (
//               <Feather name="check" size={20} color={Colors.green} />
//             ) : (
//               <Pressable onPress={copyToClipboard}>
//                 <MaterialIcons
//                   name="content-copy"
//                   size={20}
//                   color={Colors.textSecondary}
//                 />
//               </Pressable>
//             )}
//           </View>
//         )}
//       </View>

//       {/* EditMode bo‘yicha input / text */}
//       {editMode ? (
//         type === "phone" ? (
//           <MaskedTextInput
//             mask={phoneMask}
//             value={mask(value, phoneMask)} // formatlangan holda ko‘rsatish
//             keyboardType="phone-pad"
//             onChangeText={(masked, unmasked) => {
//               onChange("+998" + unmasked.replace(/^998/, "")); // ortiqcha +998 qo‘shilmasin
//             }}
//             style={{
//               color: Colors.textPrimary,
//               fontSize: 18,
//               height: 30,
//               paddingBottom: 0,
//               paddingLeft: 0,
//               paddingTop: 0,
//               fontFamily: Fonts.regular,
//             }}
//           />
//         ) : (
//           <TextInput
//             value={value}
//             onChangeText={onChange}
//             style={{
//               color: Colors.textPrimary,
//               fontSize: 18,
//               height: 30,
//               paddingBottom: 0,
//               paddingLeft: 0,
//               paddingTop: 0,
//               fontFamily: Fonts.regular,
//             }}
//           />
//         )
//       ) : (
//         <AppText style={{ color: Colors.textPrimary, fontSize: 18 }}>
//           {type === "phone" ? mask(value, phoneMask) : value}
//         </AppText>
//       )}
//     </Animated.View>
//   );
// };

// export default UserInfoRow;

import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styleUser as styles } from "./style";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { MaskedTextInput, mask } from "react-native-mask-text";
import { Fonts } from "@/shared/token";

const UserInfoRow = ({
  label,
  value,
  editMode,
  onChange,
  type,
  originalValue, // 🔹 Tashqaridan yuboriladi (asl qiymat)
  onChangeDetected, // 🔹 Tashqariga signal yuboruvchi callback
}: any) => {
  const Colors = useThemeColors();
  const [copy, setCopy] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const phoneMask = "+998 99 999-99-99";

  // 🔹 Clipboard funksiyasi
  const copyToClipboard = async () => {
    try {
      setCopy(true);
      setTimeout(() => setCopy(false), 1000);
      await Clipboard.setStringAsync(value);
    } catch (error) {}
  };

  // 🔹 Animatsiya
  const animtedStyle = useAnimatedStyle(() => {
    const elevation = withTiming(editMode ? 20 : 0);
    return { elevation };
  });

  // 🔹 Har safar localValue o‘zgarsa, tashqariga signal yubor
  useEffect(() => {
    if (!originalValue || !onChangeDetected) return;

    // faqat textlarni normalizatsiya qilamiz
    const normalize = (v: string) => v.replace(/\s|[-+]/g, "").trim(); // +998 90 392-36-25 -> 998903923625

    const changed =
      normalize(localValue || "") !== normalize(originalValue || "");

    onChangeDetected(changed);
  }, [localValue]);

  return (
    <Animated.View
      style={[
        styles.infoCard,
        { backgroundColor: Colors.Boxbackground },
        animtedStyle,
      ]}
    >
      {/* Label */}
      <View style={styles.labelRow}>
        <AppText style={[styles.label, { color: Colors.textSecondary }]}>
          {label}
        </AppText>

        {!editMode && (
          <View>
            {copy ? (
              <Feather name="check" size={20} color={Colors.green} />
            ) : (
              <Pressable onPress={copyToClipboard}>
                <MaterialIcons
                  name="content-copy"
                  size={20}
                  color={Colors.textSecondary}
                />
              </Pressable>
            )}
          </View>
        )}
      </View>

      {/* 🔹 EditMode holati */}
      {editMode ? (
        type === "phone" ? (
          <MaskedTextInput
            mask={phoneMask}
            value={mask(localValue, phoneMask)}
            keyboardType="phone-pad"
            onChangeText={(masked, unmasked) => {
              const normalized = "+998" + unmasked.replace(/^998/, "");
              setLocalValue(normalized);
              onChange(normalized);
            }}
            style={{
              color: Colors.textPrimary,
              fontSize: 18,
              height: 30,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              fontFamily: Fonts.regular,
            }}
          />
        ) : (
          <TextInput
            value={localValue}
            onChangeText={(txt) => {
              setLocalValue(txt);
              onChange(txt);
            }}
            style={{
              color: Colors.textPrimary,
              fontSize: 18,
              height: 30,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingTop: 0,
              fontFamily: Fonts.regular,
            }}
          />
        )
      ) : (
        <AppText style={{ color: Colors.textPrimary, fontSize: 18 }}>
          {type === "phone" ? mask(value, phoneMask) : value}
        </AppText>
      )}
    </Animated.View>
  );
};

export default UserInfoRow;
