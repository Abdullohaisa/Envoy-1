import { FlatList } from "react-native";
import React from "react";
import { WelcomePages, welcomePages } from "./pages";
import { screens } from "@/shared/token";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import WelcomePageItem from "./PageRendererItem";
import { useAtom } from "jotai";
import { themeAtom } from "@/theme/theme";

interface Props {
  ref: React.RefObject<FlatList<any> | null>;
  setActivePage: (active: number) => void;
  welcomeScrollX: any;
}

const WelcomePageRenderer = ({ ref, setActivePage, welcomeScrollX }: Props) => {
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      welcomeScrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item }: { item: WelcomePages }) => {
    return <WelcomePageItem item={item} />;
  };
  return (
    <Animated.FlatList
      ref={ref}
      data={welcomePages}
      renderItem={renderItem}
      horizontal
      initialNumToRender={welcomePages.length}
      pagingEnabled
      keyExtractor={(item: WelcomePages) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={false}
      maxToRenderPerBatch={welcomePages.length}
      windowSize={welcomePages.length}
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
