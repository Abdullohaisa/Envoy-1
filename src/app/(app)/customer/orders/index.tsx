import { Radius, screens } from "@/shared/token";
import { themeAtom } from "@/theme/theme";
import { useThemeColors } from "@/theme/useThemeColors";
import ActiveOrder from "@/widget/order/customer/active-order";
import { useAtomValue } from "jotai";
import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const dataActive = ["Yuk 1", "Yuk 2", "Yuk 3"];
const dataCompleted = ["Yuk A", "Yuk B"];

const pages = [
  { key: "active", title: "Faol", data: dataActive },
  { key: "completed", title: "Tugatilgan", data: dataCompleted },
];

const Order = () => {
  const scrollX = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);
  const insetTop = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // button bosilganda shu funksiya ishlaydi
  const handlePress = (index: number) => {
    flatRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground, gap: 5 }}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            height: 55 + insetTop,
            backgroundColor:
              theme === "light" ? Colors.primary08 : Colors.Boxbackground,
          },
        ]}
      >
        {pages.map((p, i) => {
          return (
            <TabButton
              key={p.key}
              title={p.title}
              index={i}
              scrollX={scrollX}
              onPress={() => handlePress(i)} // button bosilganda shu pagega o'tadi
              dataLength={p.data.length}
            />
          );
        })}
        <TabIndicator scrollX={scrollX} />
      </View>

      {/* Pages */}
      <Animated.FlatList
        ref={flatRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1, paddingHorizontal: 5 }}>
            <FlatList
              style={{ borderRadius: Radius.primary, overflow: "hidden" }}
              showsHorizontalScrollIndicator={true}
              indicatorStyle="black"
              data={item.key === "active" ? dataActive : dataCompleted}
              keyExtractor={(d, i) => i.toString()}
              contentContainerStyle={{ flexGrow: 1, gap: 5 }} // 🔥 scrollni ekranga cho‘zadi
              renderItem={({ item, index }) => (
                <>
                  <ActiveOrder index={index} />
                </>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

// Tab Button
const TabButton = ({ title, index, scrollX, onPress, dataLength }: any) => {
  const Colors = useThemeColors();
  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollX.value / width,
      [0, 1],
      index === 0 ? ["#ffffff", "#bababa"] : ["#bababa", "#ffffff"]
    );
    return { color };
  });

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Animated.Text style={[styles.tabText, animatedStyle]}>
        {title}
      </Animated.Text>
      <Animated.Text style={[styles.tabTextLength, animatedStyle]}>
        {dataLength}
      </Animated.Text>
    </Pressable>
  );
};

// Tab Indicator (underline)
// Tab Indicator (underline)
const TabIndicator = ({ scrollX }: any) => {
  const theme = useAtomValue(themeAtom);
  const Colors = useThemeColors();

  const indicatorWidth = width / pages.length - screens.width * 0.1; // 🔥 30px qisqartiramiz

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = (scrollX.value / width) * (width / pages.length) + 15;
    // +15 => chapdan markazga surish uchun (30px ni yarmi)

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          width: indicatorWidth, // 🔥 yangi kenglik
          backgroundColor: theme === "light" ? "#ffffff" : Colors.primary,
        },
        animatedStyle,
      ]}
    />
  );
};

export default Order;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    alignItems: "flex-end",
    paddingBottom: 5,
    borderRadius: Radius.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
  },
  tabTextLength: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 5,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 4,
    width: width / pages.length, // 2 ta page uchun teng bo‘lib turadi
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  item: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginVertical: 6,
    borderRadius: 8,
  },
});
