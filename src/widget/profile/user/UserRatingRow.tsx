// import RatingStars from "@/components/RatingStars";
// import AppText from "@/components/Texts/Text";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { View } from "react-native";
// import Animated, { FadeIn } from "react-native-reanimated";
// import { styleUser as styles } from "./style";

// const UserRatingRow = ({ rating }: any) => {
//   const Colors = useThemeColors();

//   // 🔸 Reytingga qarab rangni aniqlash funksiyasi
//   const getRatingColor = (r: number) => {
//     if (r <= 2) return Colors.red; // yomon
//     if (r <= 3.5) return Colors.yellow; // o‘rtacha
//     return Colors.green; // yaxshi
//   };

//   // 🔸 Matnni ham reyting bo‘yicha o‘zgartiramiz
//   const getRatingText = (r: number) => {
//     if (r <= 2) return "yomon";
//     if (r <= 3.5) return "o'rtacha";
//     if (r <= 4.5) return "yaxshi";
//     return "a’lo";
//   };

//   const color = getRatingColor(rating);
//   const text = getRatingText(rating);

//   return (
//     <View style={[styles.infoCard, { backgroundColor: Colors.Boxbackground }]}>
//       {/* Yuqori qator */}
//       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//         <AppText style={[styles.label, { color: Colors.textSecondary }]}>
//           Reyting
//         </AppText>
//         <AppText style={[styles.label, { color: Colors.textSecondary }]}>
//           24 kishi belgilagan
//         </AppText>
//       </View>

//       {/* Yulduzlar va reyting badge */}
//       <View style={styles.ratingContainer}>
//         <RatingStars rating={rating} />

//         <Animated.View
//           entering={FadeIn.duration(300)}
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             backgroundColor: color + "22", // fon shaffof
//             paddingHorizontal: 8,
//             paddingVertical: 3,
//             borderRadius: 8,
//             marginLeft: 8,
//           }}
//         >
//           <AppText
//             style={{
//               color: color,
//               fontWeight: "600",
//               fontSize: 16,
//             }}
//           >
//             {rating.toFixed(1)}
//           </AppText>
//           <AppText
//             style={{
//               color: Colors.textPrimary,
//               fontSize: 14,
//               marginLeft: 4,
//               textTransform: "capitalize",
//             }}
//           >
//             {text}
//           </AppText>
//         </Animated.View>
//       </View>
//     </View>
//   );
// };

// export default UserRatingRow;

import { View, Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import RatingStars from "@/components/RatingStars";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { Feather } from "@expo/vector-icons";
import { styleUser as styles } from "./style";
import { useTranslation } from "react-i18next";

/* =============================
   🔸 1. REYTING KOMPONENTI
============================= */
export const UserRatingRow = ({ rating }: any) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();

  // Reyting bo‘yicha rang va matn
  const getRatingColor = (r: number) => {
    if (r <= 2) return Colors.red;
    if (r <= 3.5) return Colors.yellow;
    return Colors.green;
  };
  const getRatingText = (r: number) => {
    if (r <= 2) return "yomon";
    if (r <= 3.5) return "o‘rtacha";
    if (r <= 4.5) return "yaxshi";
    return "a’lo";
  };

  const color = getRatingColor(rating);
  const text = getRatingText(rating);

  return (
    <View style={[styles.infoCard, { backgroundColor: Colors.Boxbackground }]}>
      {/* Yuqori qator */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText style={[styles.label, { color: Colors.textSecondary }]}>
          {t("rating")}
        </AppText>
        <AppText style={[styles.label, { color: Colors.textSecondary }]}>
          {t("rated_by", { count: 24 })}
        </AppText>
      </View>

      {/* Yulduzlar va badge */}
      <View style={styles.ratingContainer}>
        <RatingStars rating={rating} />
        <Animated.View
          entering={FadeIn.duration(300)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: color + "22",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 8,
            marginLeft: 8,
          }}
        >
          <AppText
            style={{
              color,
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {rating.toFixed(1)}
          </AppText>
          <AppText
            style={{
              color: Colors.textPrimary,
              fontSize: 14,
              marginLeft: 4,
              textTransform: "capitalize",
            }}
          >
            {text}
          </AppText>
        </Animated.View>
      </View>
    </View>
  );
};

/* =============================
   🔸 2. KOMMENT KOMPONENTI
============================= */
export const UserCommentRow = ({
  commentsCount = 0,
  onPress,
}: {
  commentsCount?: number;
  onPress?: () => void;
}) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.infoCard,
        {
          backgroundColor: Colors.Boxbackground,
          paddingVertical: 10,
          gap: 6,
        },
      ]}
    >
      {/* Yuqori qator */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppText style={[styles.label, { color: Colors.textSecondary }]}>
          {t("comments")}
        </AppText>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <AppText
            style={{
              color: Colors.textSecondary,
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {commentsCount}
          </AppText>
          <Feather
            name="message-circle"
            size={14}
            color={Colors.textSecondary}
          />
        </View>
      </View>

      {/* Taglavha */}
      <AppText
        style={{
          color: Colors.textPrimary,
          fontSize: 15,
        }}
      >
        {t("notifications_for_you")}
      </AppText>
    </Pressable>
  );
};
