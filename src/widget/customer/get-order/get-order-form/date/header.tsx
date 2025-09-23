// import { View, StyleSheet } from "react-native";
// import AppText from "@/components/Texts/Text";
// import { useThemeColors } from "@/theme/useThemeColors";

// export default function DateHeader({
//   selectedYear,
//   monthNames,
//   selectedMonth,
// }: {
//   selectedYear: number;
//   monthNames: string[];
//   selectedMonth: number;
// }) {
//   const Colors = useThemeColors();

//   console.log(typeof monthNames);
//   console.log(typeof selectedMonth);
//   return (
//     <View style={[styles.header]}>
//       <AppText style={[styles.yearText, { color: Colors.primary }]}>
//         {selectedYear} - {""}
//       </AppText>
//       <AppText
//         style={{ fontSize: 20, fontWeight: "600", color: Colors.primary }}
//       >
//         {monthNames[selectedMonth]}
//       </AppText>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginVertical: 10,
//   },
//   yearText: { fontSize: 25, fontWeight: "600" },
// });

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface DateHeaderProps {
  selectedYear: number;
  monthNames: string[];
  selectedMonth: number;
}

export default function DateHeader({
  selectedYear,
  monthNames,
  selectedMonth,
}: DateHeaderProps) {
  const Colors = useThemeColors();

  // shared values
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const translateY1 = useSharedValue(-10);
  const translateY2 = useSharedValue(-10);

  // har safar month yoki year o'zgarganda
  useEffect(() => {
    opacity1.value = 0;
    translateY1.value = -10;

    opacity1.value = withTiming(1, { duration: 300 });
    translateY1.value = withTiming(0, { duration: 300 });
  }, [selectedYear]);

  useEffect(() => {
    opacity2.value = 0;
    translateY2.value = -10;

    opacity2.value = withTiming(1, { duration: 300 });
    translateY2.value = withTiming(0, { duration: 300 });
  }, [selectedMonth]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    transform: [{ translateY: translateY1.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
    transform: [{ translateY: translateY2.value }],
  }));

  return (
    <View style={styles.header}>
      <Animated.Text
        style={[styles.yearText, { color: Colors.primary }, animatedStyle1]}
      >
        {selectedYear} -{" "}
      </Animated.Text>
      <Animated.Text
        style={[styles.monthText, { color: Colors.primary }, animatedStyle2]}
      >
        {monthNames[selectedMonth]}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  yearText: { fontSize: 25, fontWeight: "600" },
  monthText: { fontSize: 20, fontWeight: "600" },
});
