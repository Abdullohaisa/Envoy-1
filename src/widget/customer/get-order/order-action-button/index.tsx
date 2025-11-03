// import { Pressable, View } from "react-native";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { Spacing, screens } from "@/shared/token";
// import AppText from "@/components/Texts/Text";

// type Props = {
//   onClear: () => void;
//   onSubmit: () => void;
//   anyFilled: boolean;
//   allFilled: boolean;
// };

// export const OrderActions = ({
//   onClear,
//   onSubmit,
//   anyFilled,
//   allFilled,
// }: Props) => {
//   const Colors = useThemeColors();

//   return (
//     <View>
//       {anyFilled && (
//         <Pressable
//           onPress={onClear}
//           style={{
//             backgroundColor: Colors.Boxbackground,
//             alignSelf: "baseline",
//             padding: 10,
//             borderRadius: 15,
//             borderWidth: 1,
//             borderColor: Colors.red,
//             position: "absolute",
//             bottom: screens.height * 0.11,
//             elevation: 20,
//             left: Spacing.horizontal,
//           }}
//         >
//           <AppText>Tozalash</AppText>
//         </Pressable>
//       )}
//       {allFilled && (
//         <Pressable
//           onPress={onSubmit}
//           style={{
//             backgroundColor: Colors.Boxbackground,
//             alignSelf: "baseline",
//             padding: 10,
//             borderRadius: 15,
//             borderWidth: 1,
//             borderColor: Colors.green,
//             position: "absolute",
//             bottom: screens.height * 0.11,
//             elevation: 10,
//             right: Spacing.horizontal,
//           }}
//         >
//           <AppText>Davom etish</AppText>
//         </Pressable>
//       )}
//     </View>
//   );
// };

import React, { memo } from "react";
import { Pressable, View } from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { Spacing, screens } from "@/shared/token";
import AppText from "@/components/Texts/Text";

type Props = {
  onClear: () => void;
  onSubmit: () => void;
  anyFilled: boolean;
  allFilled: boolean;
};

const OrderActionsComponent = ({
  onClear,
  onSubmit,
  anyFilled,
  allFilled,
}: Props) => {
  const Colors = useThemeColors();

  if (!anyFilled && !allFilled) return null; // 🔹 Umuman bo‘sh holatda render bo‘lmasin

  return (
    <View
      style={{
        position: "absolute",
        bottom: screens.height * 0.11,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.horizontal,
      }}
    >
      {anyFilled && (
        <Pressable
          onPress={onClear}
          style={{
            backgroundColor: Colors.Boxbackground,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.red,
            elevation: 8,
          }}
        >
          <AppText>Tozalash</AppText>
        </Pressable>
      )}

      {allFilled && (
        <Pressable
          onPress={onSubmit}
          style={{
            backgroundColor: Colors.Boxbackground,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.green,
            elevation: 8,
          }}
        >
          <AppText>Davom etish</AppText>
        </Pressable>
      )}
    </View>
  );
};

// 🔹 Faqat props o‘zgarganda qayta render bo‘ladi
export const OrderActions = memo(OrderActionsComponent);
