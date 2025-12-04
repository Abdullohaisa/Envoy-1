import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import RatingStars from "@/components/RatingStars";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

const comments = [
  {
    id: 1,
    name: "Sardor Abduqodirov",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment: "Xizmat juda yoqdi, juda e’tiborli yondashuv!",
    date: "2 kun oldin",
  },
  {
    id: 2,
    name: "Malika Karimova",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    comment: "Umuman yomon emas, lekin biroz kechikish bo‘ldi.",
    date: "5 kun oldin",
  },
  {
    id: 3,
    name: "Javlon Raxmatov",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 3,
    comment: "O‘rtacha xizmat, yana yaxshilanish kerak deb o‘ylayman.",
    date: "1 hafta oldin",
  },
];

const UserComments = () => {
  const Colors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 🔄 Simulyatsiya uchun 1.5 soniya kutamiz
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem = ({ item }: any) => (
    <Animated.View
      entering={FadeInUp.duration(400)}
      style={[
        styles.commentCard,
        {
          backgroundColor: Colors.Boxbackground,
          shadowColor: Colors.textPrimary,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <AppText style={[styles.name, { color: Colors.textPrimary }]}>
            {item.name}
          </AppText>
          <View style={styles.ratingRow}>
            <RatingStars rating={item.rating} size={14} />
            <AppText style={[styles.date, { color: Colors.textSecondary }]}>
              {item.date}
            </AppText>
          </View>
        </View>
      </View>

      <AppText
        style={[styles.comment, { color: Colors.textPrimary }]}
        numberOfLines={4}
      >
        {item.comment}
      </AppText>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <PageHeader title={t("comments")} enableBack />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserComments;

const styles = StyleSheet.create({
  commentCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 6,
  },
  comment: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 6,
  },
  date: {
    fontSize: 13,
  },
});
