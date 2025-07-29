import { FlatList, Text, View } from "react-native";
import React from "react";
import { WelcomePages, welcomePages } from "./pages";
import { screens } from "@/shared/token";
import { WelcomePageStyles as styles } from "./style";
import { useThemeColors } from "@/theme/useThemeColors";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import AppImage from "@/components/Image/Image";
import AppText from "@/components/Texts/AppText";
import AppDesc from "@/components/Texts/AppDesc";
import AppTitle from "@/components/Texts/AppTitle";

interface Props {
  ref: React.RefObject<FlatList<any> | null>;
  setActivePage: (active: number) => void;
  welcomeScrollX: any;
}

const WelcomePageRenderer = ({ ref, setActivePage, welcomeScrollX }: Props) => {
  const Colors = useThemeColors();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      welcomeScrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item }: { item: WelcomePages }) => {
    return (
      <View style={styles.page}>
        <AppImage style={styles.img} source={item.img} contentFit="cover" />
        <View style={styles.contentBox}>
          <AppTitle style={{ color: Colors.primary }}>{item.title}</AppTitle>
          <AppDesc>{item.desc}</AppDesc>
        </View>
      </View>
    );
  };
  return (
    <Animated.FlatList
      ref={ref}
      data={welcomePages}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      keyExtractor={(item: WelcomePages) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(e) => {
        const offset = e.nativeEvent.contentOffset.x;
        const index = Math.round(offset / screens.width);
        setActivePage(index);
      }}
      getItemLayout={(_, index) => ({
        length: screens.width,
        offset: screens.width * index,
        index,
      })}
      onScroll={scrollHandler} // ✅ endi to‘g‘ri ishlaydi
      scrollEventThrottle={16}
    />
  );
};

export default WelcomePageRenderer;
