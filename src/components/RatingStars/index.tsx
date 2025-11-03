import StarIcon from "@/assets/icon/star-icon";
import { useThemeColors } from "@/theme/useThemeColors";
import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../Texts/Text";

interface RatingStarsProps {
  rating: number; // masalan: 3.5
  max?: number; // nechta yulduz bo‘lsin, default 5
  size?: number; // yulduz o‘lchami, default 18
  activeColor?: string; // to‘liq yulduz rangi
  inactiveColor?: string; // bo‘sh yulduz rangi
}

const getRatingColor = (rating: number) => {
  const Colors = useThemeColors();
  if (rating >= 4.0) return Colors.primary;
  if (rating >= 3) return Colors.primary; // sariq
  if (rating >= 1.5) return Colors.primary; // apelsin
  return Colors.primary; // qizil
};

const RatingStars = ({
  rating,
  max = 5,
  size = 18,
  activeColor = getRatingColor(rating),
  inactiveColor = "#E0E0E0",
}: RatingStarsProps) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      // 🔹 to‘liq yulduz
      stars.push(<StarIcon key={i} size={size} color={activeColor} />);
    } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
      // 🔹 yarim yulduz
      stars.push(
        <View key={i} style={{ width: size, height: size }}>
          {/* Bo‘sh yulduz */}
          <StarIcon size={size} color={inactiveColor} />
          {/* Chap yarim to‘ldirilgan */}
          <View
            style={{
              position: "absolute",
              width: size / 2,
              overflow: "hidden",
            }}
          >
            <StarIcon size={size} color={activeColor} />
          </View>
        </View>
      );
    } else {
      // 🔹 bo‘sh yulduz
      stars.push(<StarIcon key={i} size={size} color={inactiveColor} />);
    }
  }

  return <View style={styles.row}>{stars}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});

export default RatingStars;
