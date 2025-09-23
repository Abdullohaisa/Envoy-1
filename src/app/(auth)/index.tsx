import WelcomePageDotes from "@/widget/welcome/dotes";
import { welcomePages } from "@/widget/welcome/pages";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import { WelcomePageStyles as styles } from "@/widget/welcome/style";
import WelcomeButton from "@/widget/welcome/button";
import WelcomePageRenderer from "@/widget/welcome/PageRenderer";
import WelcomeBackgroundImage from "@/widget/welcome/backgroundImage";
import { useSharedValue } from "react-native-reanimated";
import WelcomeLanguageButton from "@/widget/welcome/languageButton";
import { useSetAtom } from "jotai";

export default function Welcome() {
  const ref = useRef<FlatList>(null);
  const [activePage, setActivePage] = useState<number>(0);
  const welcomeScrollX = useSharedValue(0);

  const handleNext = () => {
    if (activePage < welcomePages.length - 1) {
      ref.current?.scrollToIndex({
        index: activePage + 1,
        animated: true,
      });
      setActivePage((active) => active + 1);
    } else {
      router.push("(auth)/auth");
    }
  };

  const handlePrev = () => {
    if (activePage > 0) {
      ref.current?.scrollToIndex({
        index: activePage - 1,
        animated: true,
      });
      setActivePage((active) => active - 1);
    }
  };

  return (
    <View style={styles.container}>
      <WelcomeBackgroundImage
        activePage={activePage}
        welcomeScrollX={welcomeScrollX}
      />

      <WelcomePageRenderer
        ref={ref}
        setActivePage={setActivePage}
        welcomeScrollX={welcomeScrollX}
      />

      <WelcomePageDotes welcomeScrollX={welcomeScrollX} />
      {/* 
      <WelcomeButton
        handleNext={handleNext}
        handlePrev={handlePrev}
        activePage={activePage}
      /> */}

      <WelcomeLanguageButton welcomeScrollX={welcomeScrollX} />
    </View>
  );
}
