import { useThemeColors } from "@/theme/useThemeColors";
import { View, StyleSheet } from "react-native";
import StarFillIcon from "@/assets/icon/star-fill";
import StarOutlineIcon from "@/assets/icon/star-outline";

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
  inactiveColor = getRatingColor(rating),
}: RatingStarsProps) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      // 🔹 to‘liq yulduz
      stars.push(<StarFillIcon key={i} size={size} color={activeColor} />);
    } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
      // 🔹 yarim yulduz
      stars.push(
        <View key={i} style={{ width: size, height: size }}>
          {/* Bo‘sh yulduz */}
          <StarOutlineIcon size={size} color={inactiveColor} />
          {/* Chap yarim to‘ldirilgan */}
          <View
            style={{
              position: "absolute",
              width: size / 2,
              overflow: "hidden",
            }}
          >
            <StarFillIcon size={size} color={activeColor} />
          </View>
        </View>
      );
    } else {
      // 🔹 bo‘sh yulduz
      stars.push(<StarOutlineIcon key={i} size={size} color={inactiveColor} />);
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
