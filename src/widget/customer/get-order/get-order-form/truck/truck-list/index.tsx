import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { RefObject, useState } from "react";
import { TruckItem, truckData } from "../data";
import { Spacing, screens } from "@/shared/token";
import { Image } from "expo-image";
import { useThemeColors } from "@/theme/useThemeColors";
import ArrowIcon from "@/assets/icon/arrow";
import { useAtom } from "jotai";
import AppText from "@/components/Texts/Text";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInUp,
  Layout,
  FadeOutDown,
} from "react-native-reanimated";
import { getOrderTruckAtom } from "@/atoms/get-order/truck";
import GetOrderNextButton from "../../../next-button";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import GetOrderBackButton from "../../../back-button";
import { safeNavigate } from "@/utils/safe-navigation";
import { useTranslation } from "react-i18next";

interface Props {
  flatListRef: RefObject<FlatList<TruckItem> | null>;
}

const CustomerGetOrderTruckList = ({ flatListRef }: Props) => {
  const Colors = useThemeColors();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [truck, setTruck] = useAtom(getOrderTruckAtom);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
  const { t } = useTranslation();

  // ✅ Truck tanlash faqat raqam sifatida saqlanadi
  const selectTruck = (truckId: string) => {
    const numericId = Number(truckId);
    if (truck === numericId) {
      setTruck(null);
    } else {
      setTruck(numericId);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, truckData.length - 1);
    flatListRef.current?.scrollToIndex({ index: nextIndex });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    flatListRef.current?.scrollToIndex({ index: prevIndex });
    setCurrentIndex(prevIndex);
  };

  const scrollToTruck = (truckId: number) => {
    const index = truckData.findIndex((t) => Number(t.id) === truckId);
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }: { item: TruckItem }) => {
    const isSelected = truck === Number(item.id);

    return (
      <View style={styles.item}>
        <Image style={styles.image} source={item.image} contentFit="cover" />
        <AppText style={[styles.title, { color: Colors.textPrimary }]}>
          {t(item.title)}
        </AppText>

        <View style={{ marginTop: 10, width: "100%", alignItems: "center" }}>
          <AnimatedButton
            onPress={() => selectTruck(item.id)}
            entering={FadeIn.duration(100)}
            exiting={FadeOut.duration(100)}
            style={[
              styles.chooseButton,
              {
                backgroundColor: Colors.Boxbackground,
              },
            ]}
          >
            <AppText
              variant="semiBold"
              style={[
                styles.chooseButtonText,
                { color: isSelected ? Colors.red : Colors.textPrimary },
              ]}
            >
              {isSelected ? t("cancel") : t("select")}
            </AppText>
          </AnimatedButton>
        </View>
      </View>
    );
  };

  const TruckListItem = React.memo(({ truck, onPress }: any) => {
    const Colors = useThemeColors();

    if (!truck) return null;

    return (
      <AnimatedPressable
        onPress={onPress}
        style={{
          borderBottomWidth: 1,
          borderColor: Colors.Boxbackground,
          paddingVertical: 15,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <AppText style={{ color: Colors.textPrimary, fontSize: 18 }}>
          {t("selected")}:
        </AppText>
        <AppText
          variant="semiBold"
          style={{ color: Colors.green, fontSize: 18 }}
        >
          {t(truck.title)}
        </AppText>
      </AnimatedPressable>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Trucks carousel */}
      <FlatList
        style={{ maxHeight: screens.height * 0.4 }}
        ref={flatListRef}
        data={truckData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: TruckItem) => item.id}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: screens.width,
          offset: screens.width * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / screens.width
          );
          setCurrentIndex(index);
        }}
      />

      {/* Navigation buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handlePrev}
          style={[styles.button, { backgroundColor: Colors.Boxbackground }]}
        >
          <ArrowIcon direction={"left"} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          {truckData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? Colors.primary
                      : Colors.textSecondary,
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, { backgroundColor: Colors.Boxbackground }]}
        >
          <ArrowIcon direction={"right"} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={{ flexGrow: 0 }}>
        <ScrollView
          contentContainerStyle={{
            marginTop: 15,
            paddingHorizontal: 15,
          }}
        >
          {truck && (
            <TruckListItem
              truck={truckData.find((t) => Number(t.id) === truck)}
              onPress={() => scrollToTruck(truck)}
            />
          )}
        </ScrollView>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: Spacing.horizontal,
          marginTop: 10,
        }}
      >
        <GetOrderBackButton
          title={t("address")}
          onPress={() =>
            safeNavigate(() =>
              router.push(AppRoutes.customer.getOrder.locations.index)
            )
          }
        />
        <GetOrderNextButton
          title={t("price")}
          onPress={() =>
            safeNavigate(() => router.push(AppRoutes.customer.getOrder.price))
          }
        />
      </View>
    </View>
  );
};

export default CustomerGetOrderTruckList;

const styles = StyleSheet.create({
  item: {
    width: screens.width,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: Spacing.horizontal,
    height: screens.height * 0.4,
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  chooseButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    width: "100%",
  },
  chooseButtonText: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: screens.width,
    paddingHorizontal: Spacing.horizontal,
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 12,
  },
  dotsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
